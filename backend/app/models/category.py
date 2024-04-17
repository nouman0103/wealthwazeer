from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, TIMESTAMP  
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base
import time

class Category(Base):
    __tablename__ = "category"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=True)

    created_at = Column(TIMESTAMP, default=int(time.time()))
    updated_at = Column(TIMESTAMP, default=int(time.time()))