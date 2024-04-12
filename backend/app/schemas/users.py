from pydantic import BaseModel
import uuid

class UserBase(BaseModel):
    email: str
    
class UserCreate(UserBase):
    password: str
    
class User(UserBase):
    id: uuid.UUID
    is_active: bool
    class Config:
        orm_mode = True