from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from typing import List, Optional,Annotated


class AccountBase(BaseModel):
    name: str
    account_type: str

class Account(AccountBase):
    balance: Annotated[float, 0.0]

class AccountDetail(BaseModel):
    accounts : List[Account]
    