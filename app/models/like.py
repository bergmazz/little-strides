from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime, timedelta
import re


class Like(db.Model, UserMixin):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('posts.id')), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        user = self.user.to_dict()

        return {
            'id': self.id,
            'userId': self.user_id,
            'postId': self.post_id,
            'image': self.image,
            'content': self.content
        }
