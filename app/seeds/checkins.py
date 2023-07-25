import random
from app.models import db, Checkin, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta


def seed_checkins():
    per_habit = 15
    for i in range(1, 42):
        start = datetime.now() - timedelta(days=1)

        for e in range(1, per_habit):
            checkin_date = start - timedelta(days=per_habit - e)

            completed = random.choice([True, False])
            checkin = Checkin(habit_id=i,
                            completed=completed, created_at=checkin_date)
            db.session.add(checkin)

    db.session.commit()


def undo_checkins():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.checkins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM checkins"))

    db.session.commit()
