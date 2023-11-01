from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime, timedelta


class Routine(db.Model, UserMixin):
    __tablename__ = 'routines'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    rname = db.Column(db.String(50), nullable=False)
    cover_image = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, default=False)
    reminder = db.Column(db.String(50), default=False)
    topic = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    habits = db.relationship(
        "Habit", cascade="all, delete-orphan", lazy="joined", backref='routine')

    def past_week(self):
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=7)
        yes_past_week = 0
        checkins_past_week = 0

        for habit in self.habits:
            for checkin in habit.checkins:
                if checkin.created_at >= start_date and checkin.created_at <= end_date:
                    checkins_past_week += 1
                    if checkin.completed:
                        yes_past_week += 1

        percent = (yes_past_week / checkins_past_week) * \
            100 if checkins_past_week else 0
        return round(percent)

    def all_time(self):
        yes = 0
        checkins_ever = 0

        for habit in self.habits:
            for checkin in habit.checkins:
                checkins_ever += 1
                if checkin.completed:
                    yes += 1
        percent = (yes / checkins_ever) * 100 if checkins_ever else 0
        return round(percent)

    def today(self):
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=1)
        yes_today = 0
        checkins_today = 0

        for habit in self.habits:
            for checkin in habit.checkins:
                if checkin.created_at >= start_date and checkin.created_at <= end_date:
                    checkins_today += 1
                    if checkin.completed:
                        yes_today += 1

        percent = (yes_today / checkins_today) * 100 if checkins_today else 0
        return round(percent)

    def to_dict(self):
        # user = self.user.to_dict()
        return {
            'id': self.id,
            'userId': self.user_id,
            # 'username': user.username,
            'name': self.rname,
            'coverImage': self.cover_image,
            'habits': [habit.to_dict() for habit in self.habits],
            'averagePastWeek': self.past_week(),
            'averageCompletionAllTime': self.all_time(),
            'averageToday': self.today(),
            'mainTopic': self.topic
        }

    def to_simple_dict(self):
        # user = self.user.to_dict()
        return {
            'id': self.id,
            'userId': self.user_id,
            # 'username': user.username,
            'name': self.rname,
            'mainTopic': self.topic
        }
