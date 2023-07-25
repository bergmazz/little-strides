from app.models import db, Habit, environment, SCHEMA
from sqlalchemy.sql import text


def seed_habits():
    d1 = Habit(
        routine_id=1, description="Morning gratitude journaling", category="Depression"
    )
    d2 = Habit(
        routine_id=1, description="Daily affirmations practice", category="Depression"
    )
    d3 = Habit(
        routine_id=1, description="20-minute nature walk", category="Exercise"
    )
    d4 = Habit(
        routine_id=1, description="Mindful breathing exercises", category="Anxiety"
    )
    d5 = Habit(
        routine_id=1, description="Reach out to a friend", category="Relationships"
    )
    d6 = Habit(
        routine_id=1, description="Bedtime relaxation routine", category="Sleep"
    )
# Routine 2: Meditations(Wellness) - Demo
    dd1 = Habit(
        routine_id=2, description="10-min guided meditation", category="Wellness"
    )
    dd2 = Habit(
        routine_id=2, description="Practice deep belly breathing", category="Wellness"
    )
    dd3 = Habit(
        routine_id=2, description="Mindful eating sessions", category="Wellness"
    )
    dd4 = Habit(
        routine_id=2, description="Body scan relaxation", category="Wellness"
    )
    dd5 = Habit(
        routine_id=2, description="Sunset mindfulness session", category="Wellness"
    )
# Routine 3: Not Sure(Stress) - Demo
    ddd1 = Habit(
        routine_id=3, description="Daily stress journaling", category="Stress"
    )
    ddd2 = Habit(
        routine_id=3, description="5-minute stretching break", category="Stress"
    )
    ddd3 = Habit(
        routine_id=3, description="Progressive muscle relaxation", category="Stress"
    )
    ddd4 = Habit(
        routine_id=3, description="Disconnect from screens an hour before bed", category="Stress"
    )
    ddd5 = Habit(
        routine_id=3, description="Take a short nature break", category="Stress"
    )
    ddd6 = Habit(
        routine_id=3, description="Dance or sing to your favorite song", category="Stress"
    )

# Routine 4: On the Daily(Anxiety) - Willow
    w1 = Habit(
        routine_id=4, description="Breathing exercises on waking", category="Anxiety"
    )
    w2 = Habit(
        routine_id=4, description="Create a worry-time journal", category="Anxiety"
    )
    w3 = Habit(
        routine_id=4, description="Guided anxiety relief meditation", category="Anxiety"
    )
    w4 = Habit(
        routine_id=4, description="Identify and challenge negative thoughts", category="Anxiety"
    )
    w5 = Habit(
        routine_id=4, description="Prioritize and organize tasks", category="Anxiety"
    )
    w6 = Habit(
        routine_id=4, description="Practice letting go of control", category="Anxiety"
    )
# Routine 5: My Daily Routine(Grief) - Bobbie
    b1 = Habit(
        routine_id=5, description="Journal about your feelings", category="Grief"
    )
    b2 = Habit(
        routine_id=5, description="Light a memory candle", category="Grief"
    )
    b3 = Habit(
        routine_id=5, description="Reach out to a support person", category="Grief"
    )
    b4 = Habit(
        routine_id=5, description="Engage in creative expression", category="Grief"
    )
    b5 = Habit(
        routine_id=5, description="Reminisce with old photos", category="Grief"
    )
    b6 = Habit(
        routine_id=5, description="Practice self-compassion", category="Grief"
    )
# Routine 6: Get Ish Done(Productivity)  - Bobbie
    bb1 = Habit(
        routine_id=6, description="Create a daily to-do list", category="Productivity"
    )
    bb2 = Habit(
        routine_id=6, description="Set specific time blocks for tasks", category="Productivity"
    )
    bb3 = Habit(
        routine_id=6, description="Minimize distractions", category="Productivity"
    )
    bb4 = Habit(
        routine_id=6, description="Take short breaks between tasks", category="Productivity"
    )
    bb5 = Habit(
        routine_id=6, description="Prioritize top 3 tasks daily", category="Productivity"
    )
    bb6 = Habit(
        routine_id=6, description="Reward yourself for accomplishments", category="Productivity"
    )
    # Routine 7: So Fresh and So Clean(Wellness)  - Bobbie
    bbb1 = Habit(
        routine_id=7, description="Drink 8 glasses of water", category="Wellness"
    )
    bbb2 = Habit(
        routine_id=7, description="Mindful skincare routine", category="Wellness"
    )
    bbb3 = Habit(
        routine_id=7, description="10-minute morning stretch", category="Wellness"
    )
    bbb4 = Habit(
        routine_id=7, description="Daily fruit and veggie intake", category="Wellness"
    )
    bbb5 = Habit(
        routine_id=7, description="Take a relaxing bath", category="Wellness"
    )
    bbb6 = Habit(
        routine_id=7, description="Early bedtime for ample rest", category="Wellness"
    )

    # Routine 1: My Daily Routine (Depression)
    db.session.add(d1)
    db.session.add(d2)
    db.session.add(d3)
    db.session.add(d4)
    db.session.add(d5)
    db.session.add(d6)

    # Routine 2: Meditations (Wellness) - Demo
    db.session.add(dd1)
    db.session.add(dd2)
    db.session.add(dd3)
    db.session.add(dd4)
    db.session.add(dd5)

    # Routine 3: Not Sure (Stress) - Demo
    db.session.add(ddd1)
    db.session.add(ddd2)
    db.session.add(ddd3)
    db.session.add(ddd4)
    db.session.add(ddd5)
    db.session.add(ddd6)

    # Routine 4: On the Daily (Anxiety) - Willow
    db.session.add(w1)
    db.session.add(w2)
    db.session.add(w3)
    db.session.add(w4)
    db.session.add(w5)
    db.session.add(w6)

    # Routine 5: My Daily Routine (Grief) - Bobbie
    db.session.add(b1)
    db.session.add(b2)
    db.session.add(b3)
    db.session.add(b4)
    db.session.add(b5)
    db.session.add(b6)

    # Routine 6: Get Ish Done (Productivity) - Bobbie
    db.session.add(bb1)
    db.session.add(bb2)
    db.session.add(bb3)
    db.session.add(bb4)
    db.session.add(bb5)
    db.session.add(bb6)

    # Routine 7: So Fresh and So Clean (Wellness) - Bobbie
    db.session.add(bbb1)
    db.session.add(bbb2)
    db.session.add(bbb3)
    db.session.add(bbb4)
    db.session.add(bbb5)
    db.session.add(bbb6)

    db.session.commit()


def undo_habits():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.habits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM habits"))

    db.session.commit()
