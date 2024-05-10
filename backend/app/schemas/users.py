from pydantic import BaseModel
import uuid

class UserBase(BaseModel):
    name: str
    email: str
    
class UserCreate(UserBase):
    password: str
    
class User(UserBase):
    id: uuid.UUID
    is_active: bool
    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    name:str