"""Add ID to Friend Taable

Revision ID: f6b8a65803b7
Revises: dacb010c50ca
Create Date: 2024-05-02 21:08:42.461075

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f6b8a65803b7'
down_revision: Union[str, None] = 'dacb010c50ca'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('friend', sa.Column('id', sa.UUID(), nullable=False))
    op.create_index(op.f('ix_friend_id'), 'friend', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_friend_id'), table_name='friend')
    op.drop_column('friend', 'id')
    # ### end Alembic commands ###
