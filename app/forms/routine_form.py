from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField
from wtforms.validators import DataRequired, URL
# from flask_wtf.file import FileField, FileAllowed, FileRequired


class RoutineForm(FlaskForm):
    rname = StringField('rname', validators=[DataRequired()])
    cover_image = StringField('cover_image', validators=[
                              DataRequired(), URL()])
    # profile_pic = FileField(
    #     "Upload Image", validators=[FileAllowed(["jpg", "png"])]
    # )
    private = BooleanField('private')
    reminder = StringField('reminder')
    # topic = StringField('topic', validators=[DataRequired()])
    topic_choices = [
        ('anxiety', 'Anxiety'),
        ('relationships', 'Relationships'),
        ('exercise', 'Exercise'),
        ('stress', 'Stress'),
        ('wellness', 'Wellness'),
        ('sleep', 'Sleep'),
        ('depression', 'Depression'),
        ('productivity', 'Productivity'),
    ]
    topic = SelectField('topic', choices=topic_choices,
                        validators=[DataRequired()])
