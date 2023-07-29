from flask import Blueprint, jsonify, session, request
# from flask_wtf import FlaskForm
from app.models import Checkin, Habit, db
from .auth_routes import validation_errors_to_error_messages
# from app.forms import CheckinForm,
from flask_login import current_user, login_required
from datetime import datetime

checkins = Blueprint('checkins', __name__)

def not_found_not_yours(obj, user_id, type_str):
    if not obj:
        return jsonify([f'error: {type_str} not found.']), 404

    # if obj.user_id != user_id:
    #     return jsonify([f'error: {type_str} does not belong to the current user.']), 403

    return None

# GET /api/checkins?user_id=<user_id>
# """Get a list of all check-ins for the user"""

# GET /api/habits/streaks?user_id=<user_id>
# """Get habit streaks (consecutive days of completing a habit)"""

# GET /api/habits/completion?user_id=<user_id>
# """Get the percentage of completed habits per check-in or week"""


# POST api/habit/checkin/<habit_id>
@checkins.route('/<int:habit_id>', methods=['POST'])
@login_required
def create_habit(habit_id):
    """Check in for the day by habit"""
    habit = Habit.query.get(habit_id)
    habit_dict = habit.to_routine_dict()

    print("------------------habit:", habit_dict)
    # sorry = not_found_not_yours(habit_dict, current_user.id, 'habit')
    # if sorry:
    #     return sorry

    existing_checkin = Checkin.query.filter(
        # Checkin.user_id == current_user.id,
        Checkin.habit_id == habit_id,
        db.func.date(Checkin.created_at) == datetime.now().date()
    ).first()

    if existing_checkin:
        return jsonify(['error: You already checked-in for this habit today.']), 400

    data = request.json
    completed = data.get('completed', False)
    new_checkin = Checkin(habit_id=habit_id, completed=completed)
    db.session.add(new_checkin)
    db.session.commit()
    return jsonify(new_checkin.to_dict()), 200

# PUT /api/habit/checkin/<habit_id>
@checkins.route('/<int:habit_id>', methods=['PUT'])
@login_required
def edit_checkin(habit_id):
    """Edit the check-in for the day by habit"""
    habit = Habit.query.get(habit_id)
    sorry = not_found_not_yours(habit, current_user.id, 'habit')
    if sorry:
        return sorry

    existing_checkin = Checkin.query.filter(
        Checkin.user_id == current_user.id,
        Checkin.habit_id == habit_id,
        db.func.date(Checkin.created_at) == datetime.now().date()
    ).first()

    if not existing_checkin:
        return jsonify(['error: You have not checked-in for this habit today.']), 400

    data = request.json
    completed = data.get('completed', existing_checkin.completed)
    existing_checkin.completed = completed
    db.session.commit()

    return jsonify(existing_checkin.to_dict()), 200

# DELETE /api/habit/checkin/<habit_id>
@checkins.route('/<int:habit_id>', methods=['DELETE'])
@login_required
def delete_checkin(habit_id):
    """Delete the check-in for the day by habit"""
    habit = Habit.query.get(habit_id)
    sorry = not_found_not_yours(habit, current_user.id, 'habit')
    if sorry:
        return sorry

    existing_checkin = Checkin.query.filter(
        Checkin.user_id == current_user.id,
        Checkin.habit_id == habit_id,
        db.func.date(Checkin.created_at) == datetime.now().date()
    ).first()

    if not existing_checkin:
        return jsonify(['error: You have not checked-in for this habit today.']), 400

    db.session.delete(existing_checkin)
    db.session.commit()

    return jsonify({'message': 'Check-in deleted successfully.'}), 200
