from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from ..db import Base
import time
class TypeOfAccount(Base):
    __tablename__ = "type_of_account"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    type = Column(Enum('other', 'receivable', 'payable', 'liquidity',name="type"), nullable=False)
    account = relationship("Account", back_populates="type_of_account")
    
    created_at = Column(TIMESTAMP, default=(time.time()))
    updated_at = Column(TIMESTAMP, default=(time.time()))