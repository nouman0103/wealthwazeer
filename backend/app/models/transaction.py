from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base
import time

class Transaction(Base):
    __tablename__ = "transaction"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False,index=True)
    partner_id = Column(UUID(as_uuid=True), ForeignKey("partner.id"), nullable=False)
    status = Column(Enum("pending", "accepted", "rejected",name="type_of_status"), nullable=False)
    
    user = relationship("User", back_populates="transaction")
    partner = relationship("Partner", back_populates="transaction")
    accountline = relationship("AccountLine", back_populates="transaction")
    
    created_at = Column(TIMESTAMP, default=int(time.time()))
    updated_at = Column(TIMESTAMP, default=int(time.time()))
    
    date = Column(TIMESTAMP, default=int(time.time()))