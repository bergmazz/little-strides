from flask import Blueprint, jsonify, request
from flask_wtf import FlaskForm
from app.models import Post, Routine, Habit, db
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm
from flask_login import current_user, login_required
from sqlalchemy import desc

from ..aws import s3, bucket, upload_to_s3
import boto3

posts= Blueprint('posts', __name__)

# GET /api/posts
@posts.route('', methods=['GET'])
def get_all_posts():
    """
    Get a list of all community posts
    """
    all_posts = Post.query.order_by(desc(Post.created_at)).all()
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
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        content = form.data['content']
        image = form.data['image']
        print("--------image    ----    ", image)
        s3_image_url = upload_to_s3(image) if image else None
        print("--------s3url    ----    ", s3_image_url)

        new_post = Post(
            user_id=current_user.id,
            content=content,
            image=s3_image_url
        )

        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE /api/posts/<post_id>
@posts.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    """
    Delete your own post
    """
    post = Post.query.get(post_id)
    if not post:
        return  jsonify(['error : Post not found']), 404

    if post.user_id != current_user.id:
        return jsonify(['error: post does not belong to the current user.']), 403

    db.session.delete(post)
    db.session.commit()

    return jsonify({'message': 'Post deleted successfully'}), 200

# BONUS
# PUT /api/posts/<post_id>
# """Update the content of your post"""
