from sqlalchemy.orm import Session
from .. import models, schemas,security
from fastapi import HTTPException
from sqlalchemy.sql import func


def get_account_balance(db:Session,account_id:int) -> float:
    return abs(db.query(func.sum(models.AccountLine.balance)).filter(models.AccountLine.account_id == account_id).scalar() or 0.0) 