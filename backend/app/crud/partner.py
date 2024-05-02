from sqlalchemy.orm import Session
from .. import models, schemas, security, crud
from fastapi import HTTPException


def create_partner(db: Session, partner: schemas.PartnerCreate, user_id: int) -> schemas.Partner:
    partner = partner.model_dump()
    db_partner = models.Partner(
        **partner, user_id=user_id
    )
    db.add(db_partner)
    db.commit()
    db.refresh(db_partner)
    return schemas.Partner(name=db_partner.name, id=db_partner.id)
