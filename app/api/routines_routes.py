from flask import Blueprint, jsonify, session, request
from flask_wtf import FlaskForm
from app.models import User, Routine, db
from .auth_routes import validation_errors_to_error_messages
from app.forms import RoutineForm
from flask_login import current_user, login_required

routines = Blueprint('routines', __name__)

# POST /api/routines


@routines.route('/', methods=['POST'])
@login_required
def create_routine():
    """Create a new routine
    -on frontend, this does not submit until after three habits have been entered in multi page form """
    if len(current_user.routines) >= 3:
        return jsonify(['error : You cannot have more than 3 routines']), 400

    form = RoutineForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        rname = form.data['rname']
        cover_image = form.data['cover_image']
        private = form.data['private']
        reminder = form.data['reminder']
        topic = form.data['topic']

        new_routine = Routine(
            user_id=current_user.id,
            rname=rname,
            cover_image=cover_image,
            private=private,
            reminder=reminder,
            topic=topic
        )

        db.session.add(new_routine)
        db.session.commit()

        return jsonify(new_routine.to_dict()), 201

    errors = validation_errors_to_error_messages(form.errors)
    return jsonify(errors), 400

# GET /api/routines
@routines.route('/', methods=['GET'])
@login_required
def get_reservations():
    """
    Get a list of routines owned by the user
    """
    routines = [routine.to_dict(
    ) for routine in Routine.query.filter_by(user_id=current_user.id).all()]

    return jsonify({'Routines': routines}), 200


@routines.route('/<int:routine_id>', methods=['PUT'])
@login_required
def edit_routine(routine_id):
    """Update a routine (including adding, editing, or removing habits on frontend)"""

    # Check if the routine exists
    routine = Routine.query.get(routine_id)
    if not routine:
        return jsonify({'error': 'Routine not found.'}), 404

    # Check if the routine belongs to the current user
    if routine.user_id != current_user.id:
        return jsonify({'error': 'Routine does not belong to the current user.'}), 403

    form = RoutineForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Update routine fields with form data
        routine.rname = form.data['rname']
        routine.cover_image = form.data['cover_image']
        routine.private = form.data['private']
        routine.reminder = form.data['reminder']
        routine.topic = form.data['topic']

        db.session.commit()

        return jsonify(routine.to_dict()), 200

    errors = validation_errors_to_error_messages(form.errors)
    return jsonify(errors), 400
# DELETE /api/routines/<routine_id>


@routines.route('/<int:routine_id>', methods=['DELETE'])
@login_required
def delete_routine(routine_id):
    """Delete a routine and related habits"""

    routine = Routine.query.get(routine_id)
    if not routine:
        return jsonify({'error': 'Routine not found.'}), 404

    if routine.user_id != current_user.id:
        return jsonify({'error': 'Routine does not belong to the current user.'}), 403

    db.session.delete(routine)
    db.session.commit()

    return jsonify({'message': 'Routine deleted successfully.'}), 200

# HABITS

# POST /api/routines/<routine_id>/habits
# """Create a new habit or edit suggested habits"""

# GET /api/habits?topic=<topic>&topic=<topic>&topic=<topic>
# """Get a list of suggested habits by topic(up to three topics)"""

# PUT /api/routines/<routine_id>/habits/<habit_id>
# """Update a habit (description and issue/topic)"""

# DELETE /api/routines/<routine_id>/habits/<habit_id>
# """Delete a habit from the user's routine"""
