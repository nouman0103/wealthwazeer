from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, TIMESTAMP,ForeignKeyConstraint,PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base
import time


class Friend(Base):
    __tablename__ = "friend"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True),ForeignKey("users.id"),nullable=False)
    friend_id = Column(UUID(as_uuid=True),ForeignKey("users.id"),nullable=False)
    
    

    friend = relationship("User", back_populates="friend", foreign_keys=[friend_id], overlaps="friend")
    
    
    
    created_at = Column(TIMESTAMP, default=int(time.time()))
    updated_at = Column(TIMESTAMP, default=int(time.time()))
    
    