from flask import Blueprint, jsonify, session, request
from app.models import User, Routine, db
from .auth_routes import validation_errors_to_error_messages
from app.forms import routine_form
from flask_login import current_user, login_required

routines = Blueprint('routines', __name__)

# POST /api/routines
# """Create a new routine
# on frontend does not submit until after three habits have been entered in multi page form """

# GET /api/routines


@login_required
@routines.route('/', methods=['GET'])
def get_reservations():
    """
    Get a list of routines owned by the user
    """
    routines = [routine.to_dict(
    ) for routine in Routine.query.filter_by(user_id=current_user.id).all()]

    return jsonify({'Routines': routines}), 200

# PUT /api/routines/<routine_id>
# """Update a routine (including adding, editing, or removing habits)"""

# DELETE /api/routines/<routine_id>
# """Delete a routine and related habits"""

# HABITS

# POST /api/routines/<routine_id>/habits
# """Create a new habit or edit suggested habits"""

# GET /api/habits?topic=<topic>&topic=<topic>&topic=<topic>
# """Get a list of suggested habits by topic(up to three topics)"""

# PUT /api/routines/<routine_id>/habits/<habit_id>
# """Update a habit (description and issue/topic)"""

# DELETE /api/routines/<routine_id>/habits/<habit_id>
# """Delete a habit from the user's routine"""
