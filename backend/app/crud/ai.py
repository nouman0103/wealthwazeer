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

async def get_tip_of_the_day(user_id:int,db:Session):
    personal = crud.get_detail_income_expense_data(db,user_id)
    result = await model.generate_content_async(f"Give me a financing tip based on the data below. Mention specific account name for recommendation. Keep it short. Currency: RS. Income accounts are the current amount received from the bank account. Expense accounts contains the account's name with the amount spent. Bank and Cash accounts are the current balance in bank or cash. \n\n {json.dumps(personal.model_dump_json())}")
    try:
        return "AI Recommendation: " + result.text
    except Exception as e:
        raise HTTPException(status_code=500,detail="AI model failed to generate response")
