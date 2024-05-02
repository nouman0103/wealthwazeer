from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from ..db import Base
import time

class Partner(Base):
    __tablename__ = "partner"
    
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, nullable= True)
    phone = Column(String, nullable= True)
    city = Column(String, nullable= True)
    country = Column(String, nullable= True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    user = relationship("User", back_populates="partner")
    transaction = relationship("Transaction", back_populates="partner")
    accountline = relationship("AccountLine", back_populates="partner")
    
    created_at = Column(TIMESTAMP, default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, default=func.current_timestamp())
    
    
    
    
    
    