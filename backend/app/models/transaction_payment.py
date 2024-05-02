from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, TIMESTAMP,CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base
import time

class TransactionPayment(Base):
    __tablename__ = "transaction_payment"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    transaction_id = Column(UUID(as_uuid=True), ForeignKey("transaction.id"), primary_key=True)
    transaction = relationship("Transaction", back_populates="transaction_payment")

    payment_id = Column(UUID(as_uuid=True), ForeignKey("payment.id"), primary_key=True)    
    payment = relationship("Payment", back_populates="transaction_payment")
    
    