from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base
import time


class Friend(Base):
    __tablename__ = "friend"
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    friend_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    
    
    user = relationship("User", back_populates="friend")
    friend = relationship("User", back_populates="friend")
    
    created_at = Column(TIMESTAMP, default=int(time.time()))
    updated_at = Column(TIMESTAMP, default=int(time.time()))
    
    