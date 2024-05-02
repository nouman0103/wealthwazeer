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

def get_partner(db: Session, partner_id: int) -> schemas.Partner:
    db_partner = db.query(models.Partner).filter(models.Partner.id == partner_id).first()
    if db_partner is None:
        raise HTTPException(status_code=404, detail="Partner not found")
    return schemas.Partner.model_validate(db_partner)

def     get_partners(db: Session, user_id:str,meta:schemas.MetaRequest) -> schemas.PartnerList:
    db_partners = db.query(models.Partner).filter(models.Partner.user_id == user_id).limit(meta.limit).offset(meta.page*meta.limit).all()
    total = db.query(models.Partner).filter(models.Partner.user_id == user_id).count()
    next = None
    if total > (meta.page+1)*meta.limit:
        next = meta.page+1
    return schemas.PartnerList(
        partners=[schemas.Partner.model_validate(partner) for partner in db_partners],
        meta=schemas.MetaResponse(page=meta.page, total=total, limit=meta.limit, next=next)
    )