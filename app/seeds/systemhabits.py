# from app.models import db, SystemHabit, environment, SCHEMA
# from sqlalchemy.sql import text

# def seed_suggested_habits():
#     suggested_habits_by_topic = {
#         'anxiety': [
#             "Practice deep breathing exercises for 5 minutes every morning to calm your nerves.",
#             "Keep a journal to jot down anxious thoughts and explore ways to address them.",
#             "Limit caffeine intake to reduce jitteriness and restlessness.",
#             "Engage in regular physical activities like yoga or walking to release tension.",
#             "Create a relaxation playlist with soothing music to listen to during stressful moments.",
#             "Practice mindfulness meditation to stay present and avoid overthinking.",
#             "Establish a consistent sleep schedule to improve overall mood and reduce anxiety.",
#             "Set realistic goals and break them down into manageable tasks to avoid feeling overwhelmed.",
#             "Surround yourself with supportive friends or join a support group to share experiences.",
#             "Seek professional help if anxiety interferes significantly with daily life.",
#         ],
#         'relationships': [
#             "Schedule alone time with your partner to strengthen your bond.",
#             "Practice active listening to understand your partner's needs and concerns better.",
#             "Express gratitude and appreciation for your loved one's efforts regularly.",
#             "Surprise your partner with small acts of kindness or thoughtful gestures.",
#             "Plan and engage in shared hobbies or activities to create shared experiences.",
#             "Prioritize open and honest communication to resolve conflicts effectively.",
#             "Allocate quality time to spend with family members or close friends regularly.",
#             "Practice empathy and try to see situations from your loved one's perspective.",
#             "Offer emotional support and be a good listener during challenging times.",
#             "Show respect and kindness in your interactions to nurture a positive connection.",
#         ],
#         'exercise': [
#             "Start each day with a 15-minute stretching routine to improve flexibility.",
#             "Incorporate 30 minutes of moderate-intensity cardio exercises, like brisk walking or cycling, into your daily routine.",
#             "Alternate strength training exercises for different muscle groups three times a week.",
#             "Practice yoga or Pilates to improve balance, core strength, and overall body awareness.",
#             "Participate in team sports or group fitness classes to stay motivated and socially engaged.",
#             "Take short breaks during work or study to do quick bodyweight exercises like squats or push-ups.",
#             "Set fitness goals and track your progress to stay motivated and focused.",
#             "Mix up your workouts to prevent boredom and challenge your body in different ways.",
#             "Remember to warm-up before exercising and cool down afterward to prevent injuries.",
#             "Stay hydrated and fuel your body with nutritious foods to support your fitness efforts.",
#         ],
#         'stress': [
#             "Practice daily meditation or mindfulness exercises to manage stress levels.",
#             "Create a calming daily routine that includes activities you enjoy and find relaxing.",
#             "Take short breaks throughout the day to step away from stressors and clear your mind.",
#             "Engage in hobbies or creative activities that allow you to express yourself and unwind.",
#             "Prioritize self-care and set aside time for relaxation and pampering.",
#             "Delegate tasks or seek support when feeling overwhelmed by responsibilities.",
#             "Use positive affirmations to counter negative thoughts and increase self-confidence.",
#             "Get outdoors and spend time in nature to reduce stress and improve overall well-being.",
#             "Avoid excessive caffeine and sugar, as they can contribute to feelings of anxiety.",
#             "Seek professional help or counseling if stress becomes unmanageable or persistent.",
#         ],
#         'wellness': [
#             "Practice regular mindfulness exercises to stay connected to the present moment.",
#             "Create a balanced and nutritious diet that includes a variety of colorful fruits and vegetables.",
#             "Engage in daily physical activity to promote cardiovascular health and mental well-being.",
#             "Prioritize getting enough sleep each night to support overall physical and mental health.",
#             "Set aside time for hobbies or activities that bring you joy and fulfillment.",
#             "Cultivate meaningful social connections and maintain a supportive network of friends and family.",
#             "Avoid excessive alcohol, tobacco, or drug use, as they can negatively impact well-being.",
#             "Practice gratitude daily by acknowledging and appreciating the positive aspects of life.",
#             "Set realistic goals and celebrate your progress, no matter how small it may seem.",
#             "Regularly assess your well-being and make adjustments to support a healthy lifestyle.",
#         ],
#         'sleep': [
#             "Establish a consistent sleep schedule, going to bed and waking up at the same time every day.",
#             "Create a relaxing bedtime routine to signal to your body that it's time to wind down.",
#             "Keep your bedroom cool, dark, and quiet to create an optimal sleep environment.",
#             "Avoid screen time and stimulating activities at least an hour before bedtime.",
#             "Limit caffeine and heavy meals close to bedtime to avoid sleep disturbances.",
#             "Invest in a comfortable mattress and pillows to support a restful sleep.",
#             "Practice relaxation techniques, such as deep breathing or gentle stretching, before sleep.",
#             "Avoid napping during the day if it interferes with your ability to sleep at night.",
#             "Consider using white noise machines or calming music to block out disruptive sounds.",
#             "Address any underlying sleep disorders or issues with the help of a healthcare professional.",
#         ],
#         'depression': [
#             "Move your body for 30 minutes, thinking about the reward of positive effects on your mood.",
#             "Create a daily routine to provide structure and stability during challenging times.",
#             "Reach out to friends or family for social support and connection.",
#             "Practice mindfulness or meditation to become more aware of thoughts and emotions.",
#             "Seek professional help, such as therapy or counseling, to address underlying issues.",
#             "Set small, achievable goals to provide a sense of accomplishment and progress.",
#             "Limit exposure to negative or triggering content in the media or online.",
#             "Express yourself through creative activities like writing, art, or music.",
#             "Avoid self-isolation, even if it's challenging. Reach out to someone!",
#             "Be patient with yourself and remember that recovery takes time and effort.",
#         ],
#         'productivity': [
#             "Create a to-do list or use productivity apps to prioritize tasks and stay organized.",
#             "Break larger projects into smaller, manageable tasks to avoid feeling overwhelmed.",
#             "Use time-blocking techniques to allocate specific periods for focused work.",
#             "Minimize distractions by setting specific times for checking emails and notifications.",
#             "Take regular breaks to recharge and prevent burnout during periods of intense work.",
#             "Use productivity tools like project management software to collaborate effectively.",
#             "Delegate tasks when possible to free up time for higher-priority responsibilities.",
#             "Practice time management techniques, such as the Pomodoro Technique, to stay focused.",
#             "Set specific deadlines for tasks to create a sense of urgency and maintain momentum.",
#             "Regularly evaluate your productivity strategies and make adjustments as needed.",
#         ]
#     }

#     for category, habits in suggested_habits_by_topic.items():
#         for description in habits:
#             habit = SystemHabit(category=category, description=description, daily=True)
#             db.session.add(habit)

#     db.session.commit()
