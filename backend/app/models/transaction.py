from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base
import time

class Transaction(Base):
    __tablename__ = "transaction"
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    partner_id = Column(UUID(as_uuid=True), ForeignKey("partner.id"), nullable=False)
    category_id = Column(UUID(as_uuid=True), ForeignKey("category.id"), nullable=False)
    accountline_id = Column(UUID(as_uuid=True), ForeignKey("accountline.id"), nullable=False)
    status = Column(Enum("pending", "accepted", "rejected"), nullable=False)
    
    user = relationship("User", back_populates="transaction")
    partner = relationship("Partner", back_populates="transaction")
    category = relationship("Category", back_populates="transaction")
    accountline = relationship("Accountline", back_populates="transaction")
    
    created_at = Column(TIMESTAMP, default=int(time.time()))
    updated_at = Column(TIMESTAMP, default=int(time.time()))
    
    date = Column(TIMESTAMP, default=int(time.time()))