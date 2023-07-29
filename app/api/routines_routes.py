from flask import Blueprint, jsonify, session, request
from flask_wtf import FlaskForm
from app.models import Routine, Habit, db
from .auth_routes import validation_errors_to_error_messages
from app.forms import RoutineForm, HabitForm
from flask_login import current_user, login_required

routines = Blueprint('routines', __name__)

def not_found_not_yours(obj, user_id, type_str):
    if not obj:
        return jsonify([f'error: {type_str} not found.']), 404

    if obj.user_id != user_id:
        return jsonify([f'error: {type_str} does not belong to the current user.']), 403

    return None

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

    routine = Routine.query.get(routine_id)
    sorry = not_found_not_yours(routine, current_user.id, 'Routine')
    if sorry:
        return sorry

    form = RoutineForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
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
    sorry = not_found_not_yours(routine, current_user.id, 'Routine')
    if sorry:
        return sorry

    db.session.delete(routine)
    db.session.commit()

    return jsonify({'message': 'Routine deleted successfully.'}), 200

# *******************************************************************************************
# HABITS

# SEE HABIT_ROUTES.PY for GET /api/habits?topic=<topic>&topic=<topic>&topic=<topic>
    # these suggested habits will populate in the create routine form on the frontend
# """Get a list of suggested habits by topic(up to three topics)"""

# POST /api/routines/<routine_id>/habits
@routines.route('/<int:routine_id>/habits', methods=['POST'])
@login_required
def create_habit(routine_id):
    """Create a new habit"""
    routine = Routine.query.get(routine_id)
    sorry = not_found_not_yours(routine, current_user.id, 'Routine')
    if sorry:
        return sorry

    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['routine_id'].data = routine_id

    if form.validate_on_submit():
        description = form.data['description']
        category = form.data['category']
        new_habit = Habit(
            routine_id=routine_id,
            description=description,
            category=category
        )

        db.session.add(new_habit)
        db.session.commit()
        # return jsonify({'message': 'Habit created successfully.'}), 201
        return jsonify(new_habit.to_dict()), 200
    # if len(description) > 750:
    #     return jsonify([f'error: Your description is {len(description) - 750} characters too long.']), 400
    errors = validation_errors_to_error_messages(form.errors)
    return jsonify(errors), 400


# PUT /api/routines/<routine_id>/habits/<habit_id>
@routines.route('/<int:routine_id>/habits/<int:habit_id>', methods=['PUT'])
@login_required
def update_habit(routine_id, habit_id):
    """Update an existing habit"""
    routine = Routine.query.get(routine_id)
    sorry = not_found_not_yours(routine, current_user.id, 'Routine')
    if sorry:
        return sorry

    habit = Habit.query.get(habit_id)
    whoops = not_found_not_yours(habit, current_user.id, 'Habit')
    if whoops:
        return whoops

    form = HabitForm()
    form['routine_id'].data = routine_id
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        description = form.data['description']
        category = form.data['category']

        habit.description = description
        habit.category = category

        db.session.commit()

        return jsonify(habit.to_dict()), 200

    errors = validation_errors_to_error_messages(form.errors)
    return jsonify(errors), 400

# DELETE /api/routines/<routine_id>/habits/<habit_id>
@routines.route('/<int:routine_id>/habits/<int:habit_id>', methods=['DELETE'])
@login_required
def delete_habit(routine_id, habit_id):
    """Delete a habit from the user's routine"""
    routine = Routine.query.get(routine_id)
    sorry = not_found_not_yours(routine, current_user.id, 'Routine')
    if sorry:
        return sorry

    habit = Habit.query.get(habit_id)
    whoops = not_found_not_yours(habit, current_user.id, 'Habit')
    if whoops:
        return whoops

    db.session.delete(habit)
    db.session.commit()

    return jsonify({'message': 'Habit deleted successfully.'}), 200
