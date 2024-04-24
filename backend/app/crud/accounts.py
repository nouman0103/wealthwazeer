from sqlalchemy.orm import Session
from .. import models, schemas,security,crud
from fastapi import HTTPException


def get_account_detail(db: Session, user_id: int) -> schemas.AccountDetail:
    db_accounts = db.query(models.Account).filter(models.Account.user_id == user_id).filter(models.Account.account_type.in_(("Income","Expenses","Bank and Cash"))).all()
    accounts = []
    for account in db_accounts:
        balance = crud.get_account_balance(db, account.id)
        print(balance)
        accounts.append(schemas.Account(name=account.name, account_type=account.account_type, balance=balance))
        
    return schemas.AccountDetail(accounts=accounts)
    
    