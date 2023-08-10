from app.models import db, Routine, environment, SCHEMA
from sqlalchemy.sql import text


def seed_routines():
    demo1 = Routine(
        user_id=1, rname="My Daily Routine", cover_image="https://images.pexels.com/photos/12988318/pexels-photo-12988318.jpeg",
        topic="Depression"
    )
    demo2 = Routine(
        user_id=1, rname="Meditations", cover_image="https://images.pexels.com/photos/3150250/pexels-photo-3150250.jpeg",
        topic="Wellnes"
    )
    demo3 = Routine(
        user_id=1, rname="Not Sure", cover_image="https://media.istockphoto.com/id/91520053/photo/senior-man-shrugging-shoulders.jpg",
        topic="Stress"
    )
    willow1 = Routine(
        user_id=2, rname="On the  Daily", cover_image="https://images.pexels.com/photos/552783/pexels-photo-552783.jpeg",
        topic="Anxiety"
    )
    bobbie1 = Routine(
        user_id=3, rname="My Daily Routine", cover_image="https://images.pexels.com/photos/54512/pexels-photo-54512.jpeg",
        topic="Grief"
    )
    bobbie2 = Routine(
        user_id=3, rname="Get Ish Done", cover_image="https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600",
        topic="Productivity"
    )
    bobbie3 = Routine(
        user_id=3, rname="So Fresh and So Clean", cover_image="https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=1600",
        topic="Wellness"
    )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(willow1)
    db.session.add(bobbie1)
    db.session.add(bobbie2)
    db.session.add(bobbie3)
    db.session.commit()


def undo_routines():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.routines RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM routines"))

    db.session.commit()
