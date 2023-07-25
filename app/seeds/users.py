from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='DemolitZen', email='demo@aa.io', profile_pic="https://media.istockphoto.com/id/1321644048/photo/balance-at-work-is-very-important.jpg?b=1&s=612x612&w=0&k=20&c=wN746bvgneyk4JzFI3hv1LlvlIkjWm6BHING98G9ZoY=", password='password')
    willow = User(
        username='WellnessWillow', email='willow@aa.io', profile_pic="https://images.pexels.com/photos/11057172/pexels-photo-11057172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", password='password')
    bobbie = User(
        username='HappyHiker', email='bobbie@aa.io', profile_pic="https: // images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg?auto=compress & cs=tinysrgb & w=1260 & h=750 & dpr=1", password='password')

    db.session.add(demo)
    db.session.add(willow)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
