from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired

class CheckinForm(FlaskForm):
    completed = BooleanField('Completed', validators=[DataRequired()])
    # mood_rating = IntegerField('Mood Rating', validators=[Optional()])
    # submit = SubmitField('Submit Check-in')
