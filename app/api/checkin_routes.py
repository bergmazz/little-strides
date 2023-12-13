from flask import Blueprint, jsonify, session, request
# from flask_wtf import FlaskForm
from app.models import Checkin, Habit,  Routine, db
from .auth_routes import validation_errors_to_error_messages
# from app.forms import CheckinForm,
from flask_login import current_user, login_required
from datetime import datetime

checkins = Blueprint('checkins', __name__)

def not_found_not_yours(habit, user_id):

    if not habit:
        return jsonify(['error: Habit not found.']), 404
    # print("------------------habit:", habit_dict)
    # print("------------------habit routine: ", habit_dict['routine']['userId'])
    habit_dict = habit.to_routine_dict()
    habit_user = habit_dict['routine']['userId']
    # print("------------------userid from routine:", habit_user)
    # print("------------------curr user id :", user_id)
    if habit_user != user_id:
        return jsonify(['error: Habit does not belong to the current user.']), 403

    return None

# GET /api/habit/checkin
# or GET /api/habit/checkin?topic=,<topic>
# TODO &start_date=<start_date>&end_date=<end_date>
@checkins.route('')
@login_required
def get_user_checkins():
    """Get all check-ins for the current user, by habit or by topic"""
    checkinz = {}
    topic = request.args.get('topic')
    # start_date = request.args.get('startdate')
    # end_date = request.args.get('enddate')
    # TODO refactor these loooops and allow for streak and percentage within week for given time period
    routines = Routine.query.filter_by(user_id =current_user.id).all()
    for routine in routines:
        for habit in routine.habits:
            if topic and habit.category.lower() != topic.lower():
                continue
            desc = habit.description
            checkins = Checkin.query.filter_by(habit_id=habit.id).all()
            checkin_list = [checkin.to_simple_dict() for checkin in checkins]
            checkinz[f'habit {habit.id}'] = {
                'checkins': checkin_list,
                'description': desc,
                'streak': habit.streak(),
                'percent': habit.percent()
            }
    return jsonify({'checkins': checkinz}), 200


# REFACTORED TO CHECK IN FOR WHOLE ROUTINE AT ONCE DUE TO SLOW UPDATE ON FRONTEND DISPATCHING PER HABIT-
# SEE ROUTINE ROUTES FILE FOR THE ACTIVE CHECKIN API ROUTE IN USE ON FRONTEND
# POST api/habit/checkin/<habit_id>
@checkins.route('/<int:habit_id>', methods=['POST'])
@login_required
def create_habit(habit_id):
    """Check in for the day by habit"""
    habit = Habit.query.get(habit_id)

    sorry = not_found_not_yours(habit, current_user.id)
    if sorry:
        return sorry

    existing_checkin = Checkin.query.filter(
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
    sorry = not_found_not_yours(habit, current_user.id)
    if sorry:
        return sorry

    existing_checkin = Checkin.query.filter(
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
    sorry = not_found_not_yours(habit, current_user.id)
    if sorry:
        return sorry

    existing_checkin = Checkin.query.filter(
        Checkin.habit_id == habit_id,
        db.func.date(Checkin.created_at) == datetime.now().date()
    ).first()

    if not existing_checkin:
        return jsonify(['error: You have not checked-in for this habit today.']), 400

    db.session.delete(existing_checkin)
    db.session.commit()

    return jsonify({'message': 'Check-in deleted successfully.'}), 200
