from flask.cli import AppGroup
from .users import seed_users, undo_users
from .routines import seed_routines, undo_routines
from .habits import seed_habits, undo_habits
from .checkins import seed_checkins, undo_checkins
from .posts import seed_posts, undo_posts
from .likes import seed_likes, undo_likes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_likes()
        undo_posts()
        undo_checkins()
        undo_habits()
        undo_routines()
        undo_users()
    seed_users()
    seed_routines()
    seed_habits()
    seed_checkins()
    seed_posts()
    seed_likes()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_likes()
    undo_posts()
    undo_checkins()
    undo_habits()
    undo_routines()
    undo_users()
