from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from pydantic import BaseModel,validator
from typing import Optional, Annotated, List, Union


class MetaResponse(BaseModel):
    page: int
    total: int
    limit: int
    next: Union[int, None]

class MetaRequest(BaseModel):
    page: int = 0
    limit: int = 10
    @validator('page')
    def page_must_be_positive(cls, v):
        if v < 0:
            raise HTTPException(status_code=400, detail="Page must be positive")
        return v
    @validator('limit')
    def limit_must_be_positive(cls, v):
        if v < 0:
            raise HTTPException(status_code=400, detail="Page must be positive")
        return v