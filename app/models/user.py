from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)

    routines = db.relationship(
        "Routine", cascade="all, delete-orphan", lazy="joined", backref='user')
    posts = db.relationship(
        "Post", cascade="all, delete-orphan", lazy="joined", backref='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_topics(self):
        topics = [routine.topic for routine in self.routines]
        return topics

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'profilePic': self.profile_pic,
            'email': self.email,
        }
    def to_simple_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'profilePic': self.profile_pic,
        }

    def to_dict_w_routines(self):
        return {
            'id': self.id,
            'username': self.username,
            'profilePic': self.profile_pic,
            'email': self.email,
            'routines': [routine.to_dict() for routine in self.routines],
        }
