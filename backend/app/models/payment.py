from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, TIMESTAMP
from sqlalchemy.sql.expression import CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base
import time

class Payment(Base):
    __tablename__ = "payment"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    amount = Column(Integer, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="payment")
    
    account_id = Column(UUID(as_uuid=True), ForeignKey("account.id"), nullable=False)
    account = relationship("Account", back_populates="payment")
    
    created_at = Column(TIMESTAMP, default=int(time.time()))
    updated_at = Column(TIMESTAMP, default=int(time.time()))
    date = Column(TIMESTAMP, default=int(time.time()))
    
    __table_args__ = (CheckConstraint(amount > 0, name = "check_amount_positive"),)