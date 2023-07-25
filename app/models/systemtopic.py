from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Systemtopic(db.Model, UserMixin):
    __tablename__ = 'systemtopics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cat = db.Column(db.String(255), nullable=False, unique=True)

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.cat,
        }
