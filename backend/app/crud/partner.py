from sqlalchemy.orm import Session
from .. import models, schemas, security, crud
from fastapi import HTTPException
from sqlalchemy import or_


def create_partner(db: Session, partner: schemas.PartnerCreate, user_id: int) -> schemas.Partner:
    partner = partner.model_dump()
    db_partner = models.Partner(
        **partner, user_id=user_id
    )
    db.add(db_partner)
    db.commit()

    return schemas.Partner(name=db_partner.name, id=db_partner.id)


def get_partner(db: Session, partner_id: int) -> schemas.Partner:
    db_partner = db.query(models.Partner).filter(
        models.Partner.id == partner_id).first()
    if db_partner is None:
        raise HTTPException(status_code=404, detail="Partner not found")
    return schemas.Partner.model_validate(db_partner)


def get_partners(db: Session, user_id: str, meta: schemas.MetaRequest, search: str = None) -> schemas.PartnerList:
    db_partners = db.query(models.Partner).filter(
        models.Partner.user_id == user_id)
    if search:
        db_partners = db_partners.filter(or_(
            models.Partner.name.ilike(f"%{search}%"),
            models.Partner.email.ilike(f"%{search}%"),
            models.Partner.phone.ilike(f"%{search}%"),
            models.Partner.city.ilike(f"%{search}%"),
            models.Partner.country.ilike(f"%{search}%")
        )
        )
    if meta.limit != 0:
        print(meta.limit)
        db_partners = db_partners.limit(meta.limit)
    if meta.page:
        db_partners = db_partners.offset(meta.page * meta.limit)

    total = db.query(models.Partner).filter(
        models.Partner.user_id == user_id).count()
    next = None
    if total > (meta.page+1)*meta.limit:
        next = meta.page+1
    
    return schemas.PartnerList(
        partners=[schemas.Partner.model_validate(
            partner) for partner in db_partners],
        meta=schemas.MetaResponse(
            page=meta.page, total=total, limit=meta.limit, next=next)
    )
