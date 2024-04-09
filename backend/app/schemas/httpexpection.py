from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from pydantic import BaseModel


class HTTPERROR(BaseModel):
    detail:str 
    
    class Config:
        schema_extra = {
            "example" : {
                "detail" : "HTTPException raised"
            }
        }