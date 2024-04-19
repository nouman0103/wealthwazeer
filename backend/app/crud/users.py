from sqlalchemy.orm import Session
from .. import models, schemas,security
import hashlib
from fastapi import HTTPException
import re


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate) -> schemas.User:
    
    hashed_password = security.get_password_hash(user.password)
    if re.match(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b', user.email) is None:
        raise HTTPException(status_code=400, detail="Invalid email")
    if re.match(r"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$", user.password) is None:
        raise HTTPException(status_code=400, detail="Invalid password")
    db_user = models.User(email=user.email, hashed_password=hashed_password, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return schemas.User(id=db_user.id, email=db_user.email, is_active=db_user.is_active, name=db_user.name)

def authenticate_user(db: Session, email: str, password: str):
    user = security.authenticate_user(db, email, password)
    if user:
        return schemas.Token(access_token=security.create_access_token(user), token_type="bearer")
    raise HTTPException(status_code=400, detail="Incorrect email or password")