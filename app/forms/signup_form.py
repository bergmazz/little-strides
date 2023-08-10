from flask_wtf import FlaskForm
# from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField  # , FileField
from wtforms.validators import DataRequired, Email, ValidationError, URL, url
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[
                        DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    profile_pic = StringField('profile_pic')
        # profile_pic = StringField('profile_pic', validators=[URL()])
    # profile_pic = FileField(
    #     "Upload Image", validators=[FileAllowed(["jpg", "png"])]
    # )
