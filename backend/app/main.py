from typing import Union,Optional
from sqlalchemy.orm import Session
from fastapi import FastAPI, HTTPException,Depends
from . import crud, models, schemas
from .db import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
origins = [
    "http://localhost:3000",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@app.get("/")
def read_root():
    return {"Hello": "World"}
@app.post("/users/", response_model=schemas.User,
          responses={400: {"description": "Email already registered or invalid email or password","model": schemas.HTTPERROR,}})
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

