from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta


def seed_posts():

    demo1 = Post(
        user_id=1,
        content="Today was a tough one, but journaling my thoughts brought some clarity and peace. Meditation helps me stay grounded and focused. Feeling overwhelmed lately, but I'm taking short breaks and stretching to manage stress.",
        image="https://images.pexels.com/photos/583848/pexels-photo-583848.jpeg?auto=compress&cs=tinysrgb&w=1600",
        created_at=datetime(2022, 9, 15, 10, 30, 0)
    )

    demo2 = Post(
        user_id=1,
        content="Meditation is my daily escape from reality. I'm floating on a fluffy cloud, pretending to be a Zen master. It's incredible how something so simple can bring about positive changes.",
        image="https://images.pexels.com/photos/268134/pexels-photo-268134.jpeg?auto=compress&cs=tinysrgb&w=1600",
        created_at=datetime(2022, 10, 25, 15, 45, 0)
    )

    demo3 = Post(
        user_id=1,
        content="Feeling a little lost in stressville today. Journaling away whenever I can and trying to take breaks.",
        created_at=datetime(2022, 11, 5, 12, 15, 0)
    )

    demo4 = Post(
        user_id=1,
        content="These days, I find myself dealing with sadness and stress more often than usual, and it's been a bit overwhelming. I'm not entirely sure what's triggering it, but I'm taking proactive steps to manage it. Journaling daily helps immensely. Writing things down helps me gain insights into the root causes of my stress- plus I can release some pent-up emotions without hurting anyone (as long as they dont read anything). I've started incorporating short stretching breaks into my day. These breaks serve as a reset button, helping me release muscle tension and relax my mind. Moreover, I've been taking occasional breaks from screens before bedtime to improve sleep quality. I believe that self-awareness and self-care are crucial in navigating through these STRESSFUL times.",
        image="https://images.pexels.com/photos/6754013/pexels-photo-6754013.jpeg?auto=compress&cs=tinysrgb&w=1600",
        created_at=datetime(2022, 11, 5, 12, 15, 0)
    )
    willow1 = Post(
        user_id=2,
        content="Anxiety, you've met your match! I'm on a mission to out-breathe you. Deep breathing exercises and grounding techniques are my secret weapons.",
        created_at=datetime(2022, 12, 20, 9, 0, 0)
    )

    willow2 = Post(
        user_id=2,
        content="Living with this kind of crippling anxiety is no easy feat, but I'm committed to overcoming it.  I've started creating a worry-time journal. This journal allows me to express my anxieties and fears, putting them into perspective and freeing my mind from the burden. Meditation has also been instrumental in alleviating anxiety. The guided anxiety relief meditations provide a sense of peace and control over my thoughts. I'm determined to take small steps each day to conquer anxiety and live a more fulfilling life.",
        image="https://images.pexels.com/photos/2954199/pexels-photo-2954199.jpeg?auto=compress&cs=tinysrgb&w=1600",
        created_at=datetime(2022, 12, 20, 9, 0, 0)
    )

    bobbie1 = Post(
        user_id=3,
        content="Journaling my feelings is so therapeutic. Coupled with lighting a memory candle, I feel so connected to cherished moments.",
        image="https://images.pexels.com/photos/4491465/pexels-photo-4491465.jpeg?auto=compress&cs=tinysrgb&w=1600",
        created_at=datetime(2023, 1, 10, 14, 30, 0)
    )

    bobbie2 = Post(
        user_id=3,
        content="Productive is my middle name! Slapping together a to-do list, time blocking, and minimizing distractions keep me focused.",
        image="https://images.pexels.com/photos/1579371/pexels-photo-1579371.jpeg?auto=compress&cs=tinysrgb&w=1600",
        created_at=datetime(2023, 2, 5, 16, 20, 0)
    )

    bobbie3 = Post(
        user_id=3,
        content="Morning stretches set a positive tone for the day. Drinking enough water and taking a relaxing bath are just two of my very important self-care rituals.",
        created_at=datetime(2023, 3, 18, 11, 45, 0)
    )

    bobbie4 = Post(
        user_id=3,
        content="Productivity is something I strive for every day, and I've adopted several strategies to stay on track. Creating a daily to-do list is my go-to method for organizing my tasks and setting priorities. I find immense satisfaction in checking off items on my list, and it keeps me motivated to tackle even more. Time blocking has been another game-changer for me. Allocating specific time blocks for tasks helps me stay focused and prevents distractions from derailing my progress. Additionally, I've learned to minimize distractions by turning off notifications and creating a clutter-free workspace. Short breaks between tasks help me recharge and maintain productivity throughout the day. I've also started the practice of rewarding myself for accomplishing milestones, which keeps me motivated to reach my goals. Productivity is all about finding the right balance and establishing a rhythm that works best for me.",
        image="https://images.pexels.com/photos/5717408/pexels-photo-5717408.jpeg?auto=compress&cs=tinysrgb&w=1600",
        created_at=datetime(2023, 2, 5, 16, 20, 0)
    )

    db.session.add(demo1)  # post 1
    db.session.add(demo2)  # post 2
    db.session.add(demo3)  # post 3
    db.session.add(demo4)  # post 4
    db.session.add(willow1)  # post 5
    db.session.add(willow2)  # post 6
    db.session.add(bobbie1)  # post 7
    db.session.add(bobbie2)  # post 8
    db.session.add(bobbie3)  # post 9
    db.session.add(bobbie4)  # post 10
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
