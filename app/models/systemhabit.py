from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Systemhabit(db.Model, UserMixin):
    __tablename__ = 'systemhabits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    descr = db.Column(db.String(75), nullable=False)
    categ = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            "description": self.descr,
            'category': self.categ,
        }
