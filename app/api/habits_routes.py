from flask import Blueprint, jsonify, session, request
# from flask_wtf import FlaskForm
from app.models import Habit, Routine
# from .auth_routes import validation_errors_to_error_messages
# from app.forms import RoutineForm, HabitForm
from flask_login import current_user, login_required

habits = Blueprint('habits', __name__)


# GET /api/habits/mine
@login_required
@habits.route('/mine', methods=['GET'])
def my_habits():
    """Get current user's habits """
    habits = []
    for routine in Routine.query.filter_by(user_id=current_user.id).all():
        my_habits = Habit.query.filter_by(routine_id=routine.id)
        for habit in my_habits:
            habits.append(habit.to_simple_dict())

    return jsonify({'my_habits': habits}), 200


# GET /api/habits/all
@habits.route('/all', methods=['GET'])
def get_habits():
    """Get all of the users' habits sorted by category"""
    all_the_habits = Habit.query.all()
    all_habits = []
    for habit in all_the_habits:
        all_habits.append(habit.to_simple_dict())
    # habits_by_category = {}
    # for habit in all_habits:
    #     category = habit.category
    #     if category not in habits_by_category:
    #         habits_by_category[category] = []
    #     habits_by_category[category].append(habit.to_simple_dict())

    # return jsonify({'habits_by_category': habits_by_category}), 200
    return jsonify({'all_habits': all_habits}), 200


# TODO remove this blob and actually create the systemhabits table and seed (uncomment in those files and edit)
# not dealing with render seeding errors again right now
system_habits = {
    'anxiety': [
        "Start the day with 5 minutes of deep breathing & calm nerves.",
        "Write in journal addressing anxious thoughts.",
        "Limit caffeine intake to reduce restlessness- 2 cups max.",
        "Engage in 20 minutes of yoga or walking for tension release.",
        "Listen to a relaxing playlist.",
        "Practice mindfulness and notice avoid overthinking.",
        "Consistent sleep schedule for mood improvement- bed at 9.",
        "Set realistic goals fo rthe day to avoid feeling overwhelmed.",
    ],
    'relationships': [
        "Schedule partner time to strengthen bond.",
        "Practice active listening to understand needs.",
        "Express gratitude for loved ones' efforts.",
        "Surprise someone with a thoughtful gesture.",
        "Engage in shared hobbies for shared experiences.",
        "Prioritize honest communication for conflict resolution.",
        "Allocate quality time for family & close friends.",
        "Practice empathy for better understanding.",
        "Offer emotional support during challenges.",
        "Show kindness for positive connection.",
    ],
    'exercise': [
        "15min daily stretches for flexibility.",
        "30min cardio daily (walking or cycling).",
        "Strength train 3x/week, different muscles.",
        "Yoga & Pilates for balance and strength.",
        "Team sports & group classes for motivation.",
        "Quick bodyweight exercises during breaks.",
        "Set fitness goals, track progress.",
        "Vary workouts to prevent boredom.",
        "Warm-up and cool down to prevent injuries.",
        "Stay hydrated, eat nutritious foods.",
    ],
    'stress': [
        "Meditation for stress management.",
        "Calming routine with enjoyable activities.",
        "Short breaks to clear mind.",
        "Hobbies for self-expression and relaxation.",
        "Prioritize self-care and relaxation.",
        "Delegate tasks when overwhelmed.",
        "Positive affirmations for confidence.",
        "Nature time for well-being.",
        "Avoid excessive caffeine & sugar.",
    ],
    'wellness': [
        "Mindfulness for staying present.",
        "Balanced, colorful diet for health.",
        "Daily activity for well-being.",
        "Adequate sleep for mental health.",
        "Hobbies for joy and fulfillment.",
        "Cultivate social connections.",
        "Limit alcohol, tobacco, drugs.",
        "Practice gratitude daily.",
        "Set realistic goals, celebrate progress.",
        "Support a healthy lifestyle.",
    ],
    'sleep': [
        "Consistent sleep schedule.",
        "Relaxing bedtime routine.",
        "Optimal sleep environment.",
        "No screens 45 min before bedtime.",
        "Limit caffeine, heavy meals.",
        "Relaxation techniques before sleep.",
        "Avoid daytime napping.",
        "Use white noise or calming music.",
    ],
    'depression': [
        "30min exercise for mood boost.",
        "Daily routine for stability.",
        "Reach out for support.",
        "Mindfulness for self-awareness.",
        "Continue therapy/self-work.",
        "Set achievable goals.",
        "Limit negative media exposure.",
        "Express through creativity.",
        "Avoid isolation, connect.",
        "Be patient, recovery takes time.",
    ],
    'productivity': [
        "Use to-do list & productivity apps.",
        "Break projects into tasks.",
        "Time-blocking for focused work.",
        "Minimize distractions, breaks.",
        "Prevent burnout with regular breaks.",
        "Use project management tools.",
        "Delegate tasks for efficiency.",
        "Practice time management.",
        "Set deadlines, maintain momentum.",
        "Evaluate and adjust strategies.",
    ]
}
# GET /api/habits?topic=<topic>&topic=<topic>&topic=<topic>
@habits.route('', methods=['GET'])
def get_suggested_habits():
    """Get a list of suggested habits by topic (up to three topics)"""

    topicz = request.args.getlist('topic')
    # TODO no duplicates
    # selected_topics = request.args.getlist('topic')
    # topics = set()
    # for selected in selected_topics:
    #     if selected in selected_topics:
    #         continue
    #     topics.add(selected)

    if len(topicz) == 0 or len(topicz) > 3:
        return jsonify(['error: Please provide 1 to 3 topics.']), 400

    suggested_habits = []
    for topic in topicz:
        for category, habits in system_habits.items():
            if category == topic:
                for habit in habits:
                    suggested_habits.append(f"{habit} !#*SPLIT {topic}")

    return jsonify({'suggested_habits': suggested_habits}), 200
