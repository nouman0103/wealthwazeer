from sqlalchemy import Table, MetaData, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from ..db import Base

TransactionPayment = Table(
    'transaction_payment', Base.metadata,
    Column('transaction_id', UUID(as_uuid=True), ForeignKey('transaction.id',ondelete='CASCADE')),
    Column('payment_id', UUID(as_uuid=True), ForeignKey('payment.id',ondelete='CASCADE'))
)