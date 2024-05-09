from sqlalchemy.orm import Session
from .. import models, schemas, security, crud
from fastapi import HTTPException
from sqlalchemy import or_


def create_goal(db: Session, user_id: int, saving: schemas.GoalCreate) -> schemas.GoalCreate:
    db_saving = models.Saving(
        goal=saving.goal, user_id=user_id, amount=0, target=saving.target)
    db.add(db_saving)
    db.commit()
    db.refresh(db_saving)
    return db_saving


def get_savings(db: Session, user_id: int) -> schemas.GoalBase:
    db_savings = db.query(models.Saving).filter(
        models.Saving.user_id == user_id).all()
    savings = []
    for saving in db_savings:
        savings.append(schemas.Saving(
            id=saving.id, goal=saving.goal, amount=saving.amount, date=saving.date, user_id=saving.user_id, created_at=saving.created_at, updated_at=saving.updated_at))
    return schemas.Savings(savings=savings)
