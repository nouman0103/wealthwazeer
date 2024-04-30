from typing import Union,Optional,Annotated ,List
from sqlalchemy.orm import Session
from fastapi import FastAPI, HTTPException,Depends
from . import crud, models, schemas,security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .db import SessionLocal, engine,get_db
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

@app.post("/token", response_model=schemas.Token)
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    token = crud.authenticate_user(db, email=form_data.username, password=form_data.password)
    if token:
        return token 
    raise HTTPException(status_code=400, detail="Incorrect email or password")
@app.get("/users/me/", response_model=schemas.User)
def get_current_user(current_user= Depends(security.get_current_user), db: Session = Depends(get_db)):
    return current_user

@app.get("/accounts/", response_model=schemas.AccountDetail)
def get_account_detail(current_user= Depends(security.get_current_user), db: Session = Depends(get_db)):
    return crud.get_account_detail(db=db, user_id=current_user.id)

@app.post("/accounts/", response_model=schemas.Account)
def create_account(account: schemas.AccountCreate, current_user= Depends(security.get_current_user), db: Session = Depends(get_db)):
    return crud.create_account(db=db, account=account, user_id=current_user.id)

@app.get("/accounts/income/", response_model=List[schemas.AccountWithID])
def get_income_accounts(current_user= Depends(security.get_current_user), db: Session = Depends(get_db)):
    return crud.get_income_accounts(db=db, user_id=current_user.id)

@app.get("/accounts/expense/", response_model=List[schemas.AccountWithID])
def get_expense_accounts(current_user= Depends(security.get_current_user), db: Session = Depends(get_db)):
    return crud.get_expense_accounts(db=db, user_id=current_user.id)

@app.get("/accounts/bank/", response_model=List[schemas.AccountWithID])
def get_bank_accounts(current_user= Depends(security.get_current_user), db: Session = Depends(get_db)):
    return crud.get_bank_accounts(db=db, user_id=current_user.id)