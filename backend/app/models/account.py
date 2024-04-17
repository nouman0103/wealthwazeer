from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,DateTime,TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base
import time
class Account(Base):
    __tablename__ = "account"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    type_of_account_id = Column(UUID(as_uuid=True), ForeignKey("type_of_account.id"), nullable=False)
    type_of_account = relationship("TypeOfAccount", back_populates="account")
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="account")
    
    created_at = Column(TIMESTAMP, default=int(time.time()))
    updated_at = Column(TIMESTAMP, default=int(time.time()))
    
    