from sqlalchemy.orm import Session
from .. import models, schemas, security, crud
from fastapi import HTTPException
from sqlalchemy import or_


def expense_transaction(db: Session, transaction: schemas.ExpenseTransaction, user_id: int) -> schemas.Transaction:
    expense_line = models.AccountLine(credit=0, debit=transaction.amount, user_id=user_id, balance=-
                                      transaction.amount, partner_id=transaction.partner_id,
                                      account_id=transaction.expense_account_id, is_visible=True)
    bank_line = models.AccountLine(credit=transaction.amount, debit=0, user_id=user_id, balance=transaction.amount,
                                   partner_id=transaction.partner_id, account_id=transaction.payment_account_id, is_visible=False)
    db_transaction = models.Transaction(user_id=user_id, partner_id=transaction.partner_id,
                                        status="accepted", date=transaction.date, description=transaction.description)
    db_transaction.accountline.append(expense_line)
    db_transaction.accountline.append(bank_line)

    db.add(db_transaction)
    db.commit()
    return schemas.Transaction(id=db_transaction.id, date=db_transaction.date,
                               description=db_transaction.description, status=db_transaction.status,
                               amount=transaction.amount, user_id=db_transaction.user_id, partner_id=db_transaction.partner_id)


def income_transaction(db: Session, transaction: schemas.IncomeTransaction, user_id: int) -> schemas.Transaction:
    income_line = models.AccountLine(credit=transaction.amount, debit=0, user_id=user_id, balance=transaction.amount,
                                     partner_id=transaction.partner_id, account_id=transaction.income_account_id, is_visible=True)
    bank_line = models.AccountLine(credit=0, debit=transaction.amount, user_id=user_id, balance=-
                                   transaction.amount, partner_id=transaction.partner_id, account_id=transaction.payment_account_id, is_visible=False)
    db_transaction = models.Transaction(user_id=user_id, partner_id=transaction.partner_id,
                                        status="accepted", date=transaction.date, description=transaction.description)
    db_transaction.accountline.append(income_line)
    db_transaction.accountline.append(bank_line)

    db.add(db_transaction)
    db.commit()
    return schemas.Transaction(id=db_transaction.id, date=db_transaction.date,
                               description=db_transaction.description, status=db_transaction.status,
                               amount=transaction.amount, user_id=db_transaction.user_id, partner_id=db_transaction.partner_id)


def get_all_transactions(db: Session, user_id: int, metadata: schemas.MetaRequest, search: str = None) -> schemas.TransactionList:
    db_transactions = db.query(models.Transaction).filter(
        models.Transaction.user_id == user_id).order_by(models.Transaction.date.desc())
    if search:
        db_transactions = db_transactions.filter(or_(
            models.Transaction.description.ilike(f"%{search}%"),
            models.Transaction.date.ilike(f"%{search}%")
        )
        )
    if metadata.limit != 0:
        db_transactions = db_transactions.limit(metadata.limit)
    if metadata.page:
        db_transactions = db_transactions.offset(
            metadata.page * metadata.limit)

    total = db.query(models.Transaction).filter(
        models.Transaction.user_id == user_id).count()
    next = None
    if total > (metadata.page+1)*metadata.limit and metadata.limit != 0:
        next = metadata.page+1
    #Expense and Income Account Type 
    debit_credit_sign_lookup = {
        "Income": 1,
        "Expenses": 1,
        "Bank and Cash" : -1,
        "Payable": 1,
        "Receivable": 1

    }


    return schemas.TransactionList(
        transactions=[schemas.TransactionDetail(
            id=transaction.id, date=transaction.date, description=transaction.description,
            amount=abs(
                sum([line.balance for line in transaction.accountline if line.is_visible])),
            partner=transaction.partner.name, type="income" if sum(
                [line.balance*debit_credit_sign_lookup[line.account.account_type] for line in transaction.accountline if line.is_visible]) > 0 else "expense"
        ) for transaction in db_transactions],
        meta=schemas.MetaResponse(
            page=metadata.page, total=total, limit=metadata.limit, next=next)
    )


def give_loan_transcation(db: Session, user_id: int, loan: schemas.LoanTransaction) -> schemas.Transaction:
    bank_line = models.AccountLine(credit=loan.amount, debit=0, user_id=user_id, balance=loan.amount, partner_id=loan.partner_id,
                                   account_id=loan.bank_account_id, is_visible=False)
    recievable_account = db.query(models.Account).filter(
        models.Account.user_id == user_id).where(models.Account.account_type == "Receivable").all()
    recievable_account_id = recievable_account[0].id

    recievable_line = models.AccountLine(credit=0, debit=loan.amount, user_id=user_id, balance=-loan.amount, partner_id=loan.partner_id,
                                         account_id=recievable_account_id, is_visible=True)

    db_transaction = models.Transaction(user_id=user_id, partner_id=loan.partner_id, status="accepted",
                                        date=loan.date, description=loan.description)

    db_transaction.accountline.append(recievable_line)
    db_transaction.accountline.append(bank_line)

    db.add(db_transaction)
    db.commit()
    return schemas.Transaction(id=db_transaction.id, date=db_transaction.date,
                               description=db_transaction.description, status=db_transaction.status,
                               amount=loan.amount, user_id=db_transaction.user_id, partner_id=db_transaction.partner_id)


def recieve_loan_transaction(db: Session, user_id: int, loan: schemas.LoanTransaction) -> schemas.Transaction:
    bank_line = models.AccountLine(credit=0, debit=loan.amount, user_id=user_id, balance=-loan.amount, partner_id=loan.partner_id,
                                   account_id=loan.bank_account_id, is_visible=False)
    payable_account = db.query(models.Account).filter(
        models.Account.user_id == user_id).where(models.Account.account_type == "Payable").all()
    payable_account_id = payable_account[0].id

    payable_line = models.AccountLine(credit=loan.amount, debit=0, user_id=user_id, balance=loan.amount, partner_id=loan.partner_id,
                                      account_id=payable_account_id, is_visible=True)

    db_transaction = models.Transaction(user_id=user_id, partner_id=loan.partner_id, status="accepted",
                                        date=loan.date, description=loan.description)

    db_transaction.accountline.append(payable_line)
    db_transaction.accountline.append(bank_line)

    db.add(db_transaction)
    db.commit()
    return schemas.Transaction(id=db_transaction.id, date=db_transaction.date,
                               description=db_transaction.description, status=db_transaction.status,
                               amount=loan.amount, user_id=db_transaction.user_id, partner_id=db_transaction.partner_id)


def get_all_loan_transaction(db: Session, user_id: int, meta: schemas.MetaRequest, search: str = None):

    loan_account_ids = db.query(models.Account.id).filter(
        models.Account.user_id == user_id, models.Account.account_type.in_(("Payable", "Receivable"))).all()
    loan_account_ids = [id[0] for id in loan_account_ids]
    transactions = []
    db_accountline = db.query(models.AccountLine).filter(models.AccountLine.account_id.in_(
        loan_account_ids), models.AccountLine.is_visible == True)
    if meta.limit != 0:
        db_accountline = db_accountline.limit(meta.limit)
    if meta.page:
        db_accountline = db_accountline.offset(meta.page * meta.limit)
    total = db_accountline.count()
    db_accountline = db_accountline.all()
    next = None
    if total > (meta.page+1)*meta.limit and meta.limit != 0:
        next = meta.page+1
    for line in db_accountline:
        transaction = line.transaction
        remaining_payment =  abs(line.balance)
        for payment_Obj in transaction.payment:
            remaining_payment -=payment_Obj.amount

        transactions.append(schemas.LoanDetail(
            id=transaction.id, date=transaction.date, description=transaction.description,
            amount=abs(line.balance),
            partner=transaction.partner.name,
            type="receivable" if line.balance < 0 else "payable",
            remaining_payment=remaining_payment
        ))
    return schemas.LoanTransactionList(
        transactions=transactions,
        meta=schemas.MetaResponse(
            page=meta.page, total=total, limit=meta.limit, next=next)
    )


def get_loan_report(db: Session, user_id: int) -> schemas.LoansReport:
    # loan_account_ids = db.query(models.Account.id).filter(
    #     models.Account.user_id == user_id, models.Account.account_type.in_(("Payable", "Receivable"))).all()
    # loan_account_ids = [id[0] for id in loan_account_ids]
    # db_accountline = db.query(models.AccountLine).filter(models.AccountLine.account_id.in_(
    #     loan_account_ids), models.AccountLine.is_visible == True)
    # payableAmount = 0
    # receivableAmount = 0
    # for line in db_accountline:
    #     if line.balance > 0:
    #         payableAmount += abs(line.balance)
    #     else:
    #         receivableAmount += line.balance
    # return schemas.LoansReport(payableAmount=payableAmount, receivableAmount=receivableAmount)
    payable_id= db.query(models.Account.id).filter(
        models.Account.user_id==user_id,models.Account.account_type == "Payable").first()
    receivable_id = db.query(models.Account.id).filter(
        models.Account.user_id==user_id,models.Account.account_type == "Receivable").first()
    db_accountline = db.query(models.AccountLine).filter(models.AccountLine.account_id.in_(
        (payable_id[0],receivable_id[0])))
    payableAmount = 0
    receivableAmount = 0
    for line in db_accountline:
        if line.account_id==payable_id[0]:
            payableAmount+=line.balance
        else:
            receivableAmount+=line.balance
    return schemas.LoansReport(payableAmount=abs(payableAmount), receivableAmount=abs(receivableAmount))
    
    


def payment_against_loan(db: Session, user_id: int, loan: schemas.LoanPayment) -> schemas.Transaction:
    loan_transaction = db.query(models.Transaction).filter(
        models.Transaction.id == loan.loan_id, models.Transaction.user_id == user_id).first()
    if not loan_transaction:
        raise HTTPException(400, "Loan Dont Exist")
    
    payment_transaction = models.Transaction(user_id=user_id, partner_id=loan_transaction.partner_id,
                                             status="accepted", date=loan.date, description="Payemnt against:" + loan_transaction.description)
    if loan.payment_type == "pay":
        payable_account_id = db.query(models.Account.id).filter(
            models.Account.user_id == user_id, models.Account.account_type == "Payable").first()
        payable_line = models.AccountLine(credit=0, debit=loan.amount, user_id=user_id, balance=-
                                          loan.amount, partner_id=loan_transaction.partner_id,
                                          account_id=payable_account_id[0], is_visible=False)
        bank_line = models.AccountLine(credit=loan.amount, debit=0, user_id=user_id, balance=loan.amount,
                                       partner_id=loan_transaction.partner_id, account_id=loan.bank_account_id, is_visible=True)
        payment_transaction.accountline.append(payable_line)
        payment_transaction.accountline.append(bank_line)
        db.add(payment_transaction)
    else:
        receivable_account_id = db.query(models.Account.id).filter(
            models.Account.user_id == user_id, models.Account.account_type == "Receivable").first()
        receivable_line = models.AccountLine(credit=loan.amount, debit=0, user_id=user_id, balance=loan.amount, partner_id=loan_transaction.partner_id,
                                             account_id=receivable_account_id[0], is_visible=False)
        bank_line = models.AccountLine(credit=0, debit=loan.amount, user_id=user_id, balance=-loan.amount,
                                       partner_id=loan_transaction.partner_id, account_id=loan.bank_account_id, is_visible=True)
        payment_transaction.accountline.append(receivable_line)
        payment_transaction.accountline.append(bank_line)
        db.add(payment_transaction)
    db.commit()
    payment = models.Payment(
        amount=loan.amount, user_id=user_id, account_id=loan.bank_account_id,transaction_id=payment_transaction.id,date=loan.date
    )
    db.add(payment)
    loan_transaction.payment.append(payment)
    db.commit()
    return schemas.Transaction(id=payment_transaction.id, date=payment_transaction.date,
                                 description=payment_transaction.description, status=payment_transaction.status,
                                 amount=loan.amount, user_id=payment_transaction.user_id, partner_id=payment_transaction.partner_id)
