"""modify payment table

Revision ID: dfb77b0d4527
Revises: 92d40e24a5f4
Create Date: 2024-05-09 18:23:51.981619

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'dfb77b0d4527'
down_revision: Union[str, None] = '92d40e24a5f4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('payment', sa.Column('transaction_id', sa.UUID(), nullable=False))
    op.alter_column('payment', 'date',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.create_foreign_key(None, 'payment', 'transaction', ['transaction_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'payment', type_='foreignkey')
    op.alter_column('payment', 'date',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.drop_column('payment', 'transaction_id')
    # ### end Alembic commands ###