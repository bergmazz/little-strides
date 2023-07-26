from flask_wtf import FlaskForm
from wtforms import StringField  # , FileField
from wtforms.validators import DataRequired, URL, Length


class PostForm(FlaskForm):
    content = StringField('content', validators=[
        DataRequired(), Length(max=750)])
    image = StringField('image', validators=[URL()])
