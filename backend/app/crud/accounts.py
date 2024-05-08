from sqlalchemy.orm import Session
from .. import models, schemas, security, crud
from fastapi import HTTPException
import sqlalchemy as sa
from datetime import datetime, timedelta
from calendar import monthrange



def get_account_detail(db: Session, user_id: int) -> schemas.AccountDetail:
    db_accounts = db.query(models.Account).filter(models.Account.user_id == user_id).filter(
        models.Account.account_type.in_(("Income", "Expenses", "Bank and Cash"))).all()
    accounts = []
    for account in db_accounts:
        balance = crud.get_account_balance(db, account.id)
        if account.account_type == "Income":
            balance = balance
        elif account.account_type == "Expenses" or account.account_type == "Bank and Cash":
            balance = -balance

        accounts.append(schemas.Account(name=account.name,
                        account_type=account.account_type, balance=balance))

    return schemas.AccountDetail(accounts=accounts)


def create_account(db: Session, account: schemas.AccountCreate, user_id: int) -> schemas.Account:
    db_account = models.Account(
        name=account.name, account_type=account.account_type, user_id=user_id)
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return schemas.Account(name=db_account.name, account_type=db_account.account_type, balance=0.0)


def get_expense_accounts(db: Session, user_id: int) -> schemas.AccountDetail:
    db_accounts = db.query(models.Account).filter(models.Account.user_id == user_id).filter(
        models.Account.account_type == "Expenses").all()
    accounts = []
    for account in db_accounts:
        accounts.append(schemas.AccountWithID(
            name=account.name, account_type=account.account_type, account_id=account.id))

    return accounts


def get_income_accounts(db: Session, user_id: int) -> schemas.AccountDetail:
    db_accounts = db.query(models.Account).filter(models.Account.user_id == user_id).filter(
        models.Account.account_type == "Income").all()
    accounts = []
    for account in db_accounts:
        accounts.append(schemas.AccountWithID(
            name=account.name, account_type=account.account_type, account_id=account.id))

    return accounts


def get_bank_accounts(db: Session, user_id: int) -> schemas.AccountDetail:
    db_accounts = db.query(models.Account).filter(models.Account.user_id == user_id).filter(
        models.Account.account_type == "Bank and Cash").all()
    accounts = []
    for account in db_accounts:
        accounts.append(schemas.AccountWithID(
            name=account.name, account_type=account.account_type, account_id=account.id))

    return accounts


def get_detail_income_expense_data(db: Session, user_id: int) -> schemas.AccountData:

    income_accounts = []
    expense_accounts = []
    bank_accounts = []
    db_accounts = db.query(models.Account).filter(models.Account.user_id == user_id).filter(
        models.Account.account_type.in_(("Income", "Expenses", "Bank and Cash"))).all()
    for account in db_accounts:
        balance = crud.get_account_balance(db, account.id)
        if account.account_type == "Income":
            income_accounts.append(schemas.Account(
                name=account.name, balance=balance, account_type="Income"))
        elif account.account_type == "Expenses":
            expense_accounts.append(schemas.Account(
                name=account.name, balance=-balance, account_type="Expenses"))
        elif account.account_type == "Bank and Cash":
            bank_accounts.append(schemas.Account(
                name=account.name, balance=-balance, account_type="Bank and Cash"))
    return schemas.AccountData(
        income_accounts=income_accounts,
        bank_accounts=bank_accounts, expense_accounts=expense_accounts
    )


def get_income_expense_data_by_date(db: Session, user_id: int) -> schemas.DashboardDayReport:
    # Get date for last 30 days from today grouped by date
    
    
    today = datetime.now()
    start_of_month = today.replace(day=1)
    end_of_month = today.replace(day=monthrange(today.year, today.month)[1])
    
    db_data = db.query(models.Transaction).filter(models.Transaction.user_id == user_id).filter(
        models.Transaction.date >= start_of_month, models.Transaction.date <= end_of_month).all()
    data = {}
    for i in range(today.day+1):
        date = start_of_month + timedelta(days=i)
        data[date.strftime("%Y/%m/%d")] = {"income":0,"expense":0}
    for transaction in db_data:
        account_line = transaction.accountline
        for line in account_line:
            if line.balance > 0 and line.is_visible: 
                data[transaction.date.strftime("%Y/%m/%d")]["income"] += line.credit
            elif line.balance < 0 and line.is_visible:
                data[transaction.date.strftime("%Y/%m/%d")]["expense"] += line.debit
    income = []
    expenses = []
    dates = []
    for date in data:
        dates.append(date)
        income.append(data[date]["income"])
        expenses.append(data[date]["expense"])
    return schemas.DashboardDayReport(income=income,expenses=expenses,dates=dates)
