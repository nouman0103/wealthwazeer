from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from pydantic import BaseModel,Field
from typing import List, Optional,Annotated,Literal


class AccountBase(BaseModel):
    name: str = Field(..., title="Account Name", description="Name of the account",min_length=3)
    account_type: str

class Account(AccountBase):
    balance: Annotated[float, 0.0]

class AccountDetail(BaseModel):
    accounts : List[Account]

class AccountCreate(AccountBase):
    account_type: Literal["Income" , "Expenses" , "Bank and Cash"]
    
    
    
