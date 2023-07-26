from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired


class HabitForm(FlaskForm):
    routine_id = StringField('routine_id', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])

    category_choices = [
        ('anxiety', 'Anxiety'),
        ('relationships', 'Relationships'),
        ('exercise', 'Exercise'),
        ('stress', 'Stress'),
        ('wellness', 'Wellness'),
        ('sleep', 'Sleep'),
        ('depression', 'Depression'),
        ('productivity', 'Productivity'),
    ]

    category = SelectField(
        'category', choices=category_choices, validators=[DataRequired()])
