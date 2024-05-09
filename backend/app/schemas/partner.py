from pydantic import BaseModel,Field,ConfigDict
from typing import Annotated, Union,Optional
from ..schemas.meta import MetaResponse
from uuid import UUID


class PartnerCreate(BaseModel):
    name:str = Field(...,min_length=3,max_length=100, title="Partner Name", description="Name of the partner")
    phone: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    email: Optional[str] = None


class Partner(BaseModel):
    id: UUID
    name: str
    model_config = ConfigDict(arbitrary_types_allowed=True)
    model_config["title"] = "Partner Detail"
    model_config['from_attributes'] = True  

class PartnerDetail(BaseModel):
    id: UUID
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    model_config = ConfigDict(arbitrary_types_allowed=True)
    model_config["title"] = "List of Partners"
    model_config['from_attributes'] = True
class PartnerList(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    model_config["title"] = "List of Partners"
    model_config['from_attributes'] = True
    partners: list[PartnerDetail]
    meta: MetaResponse