from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from typing import List, Optional,Annotated,Literal


class AccountBase(BaseModel):
    name: str
    account_type: str

class Account(AccountBase):
    balance: Annotated[float, 0.0]

class AccountDetail(BaseModel):
    accounts : List[Account]

class AccountCreate(AccountBase):
    account_type: Literal["Income" , "Expenses" , "Bank and Cash"]
    
