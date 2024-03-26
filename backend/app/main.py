from typing import Union,Optional
from sqlalchemy.orm import Session
from fastapi import FastAPI, HTTPException
from . import crud, models, schemas
from .db import SessionLocal, engine
app = FastAPI()
models.Base.metadata.create_all(bind=engine)

@app.post("/users/", response_model=schemas.User,responses={
    400: {
        "description": "Email already registered",
        "model": schemas.HTTPERROR,
        
    }
})
def create_user(user: schemas.UserCreate):
    db = SessionLocal()
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)