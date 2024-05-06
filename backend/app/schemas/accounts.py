from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from pydantic import BaseModel,Field,ConfigDict
from typing import List, Optional,Annotated,Literal
import uuid


class AccountBase(BaseModel):
    name: str = Field(..., title="Account Name", description="Name of the account",min_length=3)
    account_type: str

class Account(AccountBase):
    balance: Annotated[float, 0.0]

class AccountDetail(BaseModel):
    accounts : List[Account]

class AccountCreate(AccountBase):
    account_type: Literal["Income" , "Expenses" , "Bank and Cash"]
    

class AccountWithID(AccountBase):
    account_id : uuid.UUID

class AccountData(BaseModel):
    income_accounts : List[Account]
    expense_accounts : List[Account]
    bank_accounts : List[Account]
    model_config = ConfigDict(arbitrary_types_allowed=True)
    model_config["title"] = "Account Data"
    model_config['from_attributes'] = True

    
