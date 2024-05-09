from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, TIMESTAMP,CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from ..db import Base
import time

class Payment(Base):
    __tablename__ = "payment"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    amount = Column(Integer, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    date = Column(TIMESTAMP,nullable=False)
    transaction_id = Column(UUID(as_uuid=True), ForeignKey("transaction.id"), nullable=False)
    account_id = Column(UUID(as_uuid=True), ForeignKey("account.id"), nullable=False)


    
    account = relationship("Account", back_populates="payment")
    transaction_payment = relationship("TransactionPayment", back_populates="payment")
    transaction = relationship("Transaction", back_populates="payment")
    user = relationship("User", back_populates="payment")

    
    created_at = Column(TIMESTAMP, default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, default=func.current_timestamp())

    __table_args__ = (CheckConstraint(amount > 0, name = "check_amount_positive"),)