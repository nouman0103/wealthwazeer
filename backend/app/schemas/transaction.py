from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from pydantic import BaseModel,Field,ConfigDict
from typing import List, Optional,Annotated,Literal
import uuid
from datetime import datetime
from ..schemas.meta import MetaResponse

class TransactionBase(BaseModel):
    amount: float = Field(..., title="Amount", description="Amount of the transaction")
    date: datetime = Field(..., title="Date", description="Date of the transaction")
    description: str = Field(..., title="Description", description="Description of the transaction")
    
class ExpenseTransaction(TransactionBase):
    partner_id: uuid.UUID
    expense_account_id: uuid.UUID
    payment_account_id: uuid.UUID

class IncomeTransaction(TransactionBase):
    partner_id: uuid.UUID
    income_account_id: uuid.UUID
    payment_account_id: uuid.UUID


class Transaction(TransactionBase):
    id: uuid.UUID
    user_id: uuid.UUID
    partner_id: uuid.UUID
    status: Literal["pending", "accepted", "rejected"]

class TransactionDetail(TransactionBase):
    id: uuid.UUID
    partner:str
    type:Literal["income","expense"]
    model_config = ConfigDict(arbitrary_types_allowed=True)
    model_config["title"] = "Transaction Detail"
    model_config['from_attributes'] = True

class TransactionList(BaseModel):
    transactions:List[TransactionDetail]
    meta:MetaResponse
    
class LoanTransaction(TransactionBase):
    partner_id: uuid.UUID
    bank_account_id: uuid.UUID
    