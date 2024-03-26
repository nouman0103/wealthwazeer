from sqlalchemy.orm import Session
import crypt
from .. import models, schemas
import hashlib

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate) -> schemas.User:
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return schemas.User(id=db_user.id, email=db_user.email, is_active=db_user.is_active)