from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,DateTime,TIMESTAMP,Enum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base
from sqlalchemy.sql import func
import time
class Account(Base):
    __tablename__ = "account"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    account_type = Column(Enum(
        'Receivable', 'Bank and Cash', 'Current Assets', 'Non-current Assets', 'Prepayments', 'Fixed Assets', 'Payable', 'Credit Card', 'Current Liabilities', 
        'Non-current Liabilities', 'Equity', 'Current Year Earnings', 'Income', 'Other Income', 'Expenses',
        'Depreciation', 'Cost of Revenue', 'Off-Balance Sheet',name="type_of_account"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="account")
    accountline = relationship("AccountLine", back_populates="account")
    
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, onupdate=func.current_timestamp())
    
    