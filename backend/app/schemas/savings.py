from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Annotated, Literal
import uuid
from datetime import datetime
from ..schemas.meta import MetaResponse


class GoalBase(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime


class GoalCreate(GoalBase):
    goal: str = Field(..., title="Goal", description="Goal of the saving")
    target: int = Field(..., title="Target",
                        description="Target amount of the saving")

    date: datetime = Field(..., title="Date",
                           description="Date of the saving added")


class savingBase(GoalBase):
    goal: str = Field(..., title="Goal", description="Goal of the saving")
    amount: int = Field(..., title="Amount",
                        description="Amount of the saving")
    target: int = Field(..., title="Target",
                        description="Target amount of the saving")

    date: datetime = Field(..., title="Date",
                           description="Date of the saving added")
