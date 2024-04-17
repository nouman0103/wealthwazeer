from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
import time
from ..db import Base

class TypeOfTransaction(Base):
    __tablename__ = "type_of_transaction"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    
    
    created_at = Column(TIMESTAMP, default=int(time.time()))
    updated_at = Column(TIMESTAMP, default=int(time.time()))
    
    