from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime
import re


class Checkin(db.Model, UserMixin):
    __tablename__ = 'checkins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey(
    #     add_prefix_for_prod('users.id')), nullable=False)
    habit_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('habits.id')), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'habitId': self.habit_id,
            "completed": self.completed,
            "date": self.created_at
        }
