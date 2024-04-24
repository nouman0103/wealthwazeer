from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, TIMESTAMP
from sqlalchemy import CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from ..db import Base
import time

class AccountLine(Base):
    __tablename__ = "accountline"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    debit = Column(Integer, nullable=False)
    credit = Column(Integer, nullable=False)
    is_visible = Column(Boolean, nullable=False)
    balance = Column(Integer, nullable=False)
    
    
    transaction_id = Column(UUID(as_uuid=True), ForeignKey("transaction.id"), nullable=False)
    transaction = relationship("Transaction", back_populates="accountline")
    
    partner_id = Column(UUID(as_uuid=True), ForeignKey("partner.id"), nullable=True)
    partner = relationship("Partner", back_populates="accountline")
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="accountline")
    
    account_id = Column(UUID(as_uuid=True), ForeignKey("account.id"), nullable=False)
    account = relationship("Account", back_populates="accountline")
    
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, onupdate=func.current_timestamp())
    
    __table_args__ = (
        CheckConstraint('debit*credit = 0', name='check_debit_credit'),
    )
    
    
    
    