from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.sql import func
import time
from ..db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True,
                index=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    name = Column(String, nullable=False)

    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())
    updated_at = Column(TIMESTAMP, onupdate=func.current_timestamp())

    transaction = relationship("Transaction", back_populates="user")
    partner = relationship("Partner", back_populates="user")
    account = relationship("Account", back_populates="user")
    accountline = relationship("AccountLine", back_populates="user")
    saving = relationship("Saving", back_populates="user")
    payment = relationship("Payment", back_populates="user")
    friend = relationship("Friend", foreign_keys="Friend.friend_id")
