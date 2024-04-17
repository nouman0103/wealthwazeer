from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base
import time

class Saving(Base):
    __tablename__ = "saving"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    goal = Column(Integer, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="saving")
    
    created_at = Column(TIMESTAMP, default=int(time.time()))
    updated_at = Column(TIMESTAMP, default=int(time.time()))
    
    