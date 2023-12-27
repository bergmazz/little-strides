from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime, timedelta


class Post(db.Model, UserMixin):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    content = db.Column(db.String(750), nullable=False)
    image = db.Column(db.String())
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    likes = db.relationship(
        "Like", cascade="all, delete-orphan", lazy="joined", backref='post')


    def to_dict(self):

        return {
            'id': self.id,
            'user': self.user.to_simple_dict(),
            'image': self.image,
            'content': self.content,
            'topics': self.user.get_topics()
        }
