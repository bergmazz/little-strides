from flask import Blueprint, jsonify, request
from flask_wtf import FlaskForm
from app.models import Post, Routine, Habit, db
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm
from flask_login import current_user, login_required

posts= Blueprint('posts', __name__)

# GET /api/posts
@posts.route('', methods=['GET'])
def get_all_posts():
    """
    Get a list of all community posts
    """
    all_posts = Post.query.all()
    posts = [post.to_dict() for post in all_posts]

    return jsonify({'posts': posts}), 200

# POST /api/posts
@posts.route('', methods=['POST'])
@login_required
def create_post():
    """
    Create a new post
    """
    form = PostForm()
    if form.validate_on_submit():
        content = form.data['content']
        image = form.data['image']

        new_post = Post(
            user_id=current_user.id,
            content=content,
            image=image
        )

        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# DELETE /api/posts/<post_id>
# """Delete your own post"""


# BONUS
# PUT /api/posts/<post_id>
# """Update the content of your post"""
