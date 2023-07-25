from app.models import db, Routine, environment, SCHEMA
from sqlalchemy.sql import text


def seed_routines():
    demo1 = Routine(
        user_id=1, rname="My Daily Routine", cover_image="https://images.pexels.com/photos/12988318/pexels-photo-12988318.jpeg?auto=compress&cs=tinysrgb&w=1600",
        topic="Depression"
    )
    demo2 = Routine(
        user_id=1, rname="Meditations", cover_image="https://images.pexels.com/photos/3150250/pexels-photo-3150250.jpeg?auto=compress&cs=tinysrgb&w=1600",
        topic="Wellnes"
    )
