from pydantic import BaseModel,Field
from typing import Annotated, Union,Optional


class PartnerCreate(BaseModel):
    name:str = Field(...,min_length=3,max_length=100, title="Partner Name", description="Name of the partner")
    phone: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    email: Optional[str] = None


class Partner(BaseModel):
    id: str
    name: str

class PartnerDetail(BaseModel):
    id: str
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    user_id: str
    created_at: int
    updated_at: int
