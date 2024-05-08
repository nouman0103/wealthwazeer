import os
import google.generativeai as genai
from .. import crud
from sqlalchemy.orm import Session
from .. import models, schemas, security, crud
from fastapi import HTTPException
import sqlalchemy as sa
from datetime import datetime, timedelta
from calendar import monthrange
import json
GEMINI_KEY=os.getenv("GEMINI_KEY")
genai.configure(api_key=GEMINI_KEY)

model = genai.GenerativeModel('gemini-pro')

def get_tip_of_the_day(user_id:int,db:Session):
    personal = crud.get_detail_income_expense_data(db,user_id)
    result = model.generate_content(f"Give me a financing tip based on the data below. Mention specific account name for recommendation. Keep it short. \n\n {json.dumps(personal.model_dump_json())}")
    try:
        return result.text
    except Exception as e:
        raise HTTPException(status_code=500,detail="AI model failed to generate response")
