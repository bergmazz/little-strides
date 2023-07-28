from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime


class Habit(db.Model, UserMixin):
    __tablename__ = 'habits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey(
    #     add_prefix_for_prod('users.id')), nullable=False)
    routine_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('routines.id')), nullable=False)
    description = db.Column(db.String(75), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    checkins = db.relationship(
        "Checkin", cascade="all, delete-orphan", lazy="joined", backref='habit')

    def streak(self):
        streak = 0
        reverse_sorted_checkins = sorted(
            self.checkins, key=lambda c: c.created_at, reverse=True)

        for checkin in reverse_sorted_checkins:
            if checkin.completed:
                streak += 1
            else:
                break
        return streak

    def percent(self):
        progress = sum(checkin.completed for checkin in self.checkins)
        total_checkins = len(self.checkins)
        percent = (progress / total_checkins) * 100 if total_checkins else 0
        return round(percent)

    def to_dict(self):
        return {
            'id': self.id,
            'routineId': self.routine_id,
            "description": self.description,
            'category': self.category,
            'streak': self.streak(),
            'percent': self.percent()
        }

    def to_simple_dict(self):
        return {
            "description": self.description,
            'category': self.category,
        }

    # def progress_to_dict(self):
    #     return {
    #         'id': self.id,
    #         'routineId': self.routine_id,
    #         'username': self.user.to_dict(),
    #         "description": self.description,
    #         'category': self.category,
    #         'streak': self.streak(),
    #         'percent': self.percent()
    #     }
