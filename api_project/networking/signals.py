# networking/signals.py

from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from django.db import models

from courses.models import IComment as CourseComment
from courses.models import UserCourseProgress, UserCourseContentProgress, ICourse, ICourseContent
from networking.models import Notification, Trophy, TrophyTemplate, IResource
from django.contrib.auth.signals import user_logged_in

from users.models import ConnectionRequest, MentorshipRequest, Message

User = get_user_model()

def get_trophy_template(title):
    try:
        return TrophyTemplate.objects.get(title=title)
    except TrophyTemplate.DoesNotExist:
        return None

@receiver(post_save, sender=UserCourseProgress)
def award_course_completion_trophies(sender, instance, created, **kwargs):
    user = instance.user
    # Update user's completed courses count
    user.completed_courses_count = UserCourseProgress.objects.filter(user=user, is_completed=True).count()
    user.save()

    trophies_data = [
        'First Steps',
        'Learning Enthusiast',
        'Dedicated Learner',
        'Master Learner',
    ]

    for title in trophies_data:
        trophy_template = get_trophy_template(title)
        if trophy_template:
            progress = min(int((user.completed_courses_count / trophy_template.target_value) * 100), 100)
            is_earned = progress >= 100

            Trophy.objects.update_or_create(
                user=user,
                trophy_template=trophy_template,
                defaults={
                    'progress': progress,
                    'is_earned': is_earned,
                }
            )

@receiver(post_save, sender=IResource)
def award_resource_submission_trophies(sender, instance, created, **kwargs):
    user = instance.createdBy
    # Update user's submitted resources count
    user.submitted_resources_count = IResource.objects.filter(createdBy=user).count()
    user.save()

    trophies_data = [
        'First Contribution',
        'Contributor',
        'Prolific Contributor',
        'Top Contributor',
    ]

    for title in trophies_data:
        trophy_template = get_trophy_template(title)
        if trophy_template:
            # Calculate progress percentage
            progress = min(int((user.submitted_resources_count / trophy_template.target_value) * 100), 100)
            is_earned = progress >= 100

            Trophy.objects.update_or_create(
                user=user,
                trophy_template=trophy_template,
                defaults={
                    'progress': progress,
                    'is_earned': is_earned,
                }
            )

@receiver(post_save, sender=User)
def award_role_trophies(sender, instance, created, **kwargs):
    user = instance
    role_trophies = {
        'practitioner': 'Practitioner',
        'mentor': 'Mentor',
    }

    role = user.role
    trophy_title = role_trophies.get(role)
    if trophy_title:
        trophy_template = get_trophy_template(trophy_title)
        if trophy_template:
            progress = 100
            is_earned = True

            Trophy.objects.update_or_create(
                user=user,
                trophy_template=trophy_template,
                defaults={
                    'progress': progress,
                    'is_earned': is_earned,
                }
            )

@receiver(post_save, sender=CourseComment)
def award_discussion_trophies(sender, instance, created, **kwargs):
    if created:
        user = instance.user
        # Update user's comment count
        user.comment_count = CourseComment.objects.filter(user=user).count()
        user.save()

        trophy_title = 'Community Helper'
        trophy_template = get_trophy_template(trophy_title)
        if trophy_template:
            # Calculate progress percentage
            progress = min(int((user.comment_count / trophy_template.target_value) * 100), 100)
            is_earned = progress >= 100

            Trophy.objects.update_or_create(
                user=user,
                trophy_template=trophy_template,
                defaults={
                    'progress': progress,
                    'is_earned': is_earned,
                }
            )

@receiver(m2m_changed, sender=IResource.likes.through)
def award_influencer_trophy(sender, instance, action, pk_set, **kwargs):
    if action in ['post_add', 'post_remove', 'post_clear']:
        user = instance.createdBy
        total_likes = IResource.objects.filter(createdBy=user).aggregate(total_likes=models.Count('likes'))['total_likes'] or 0
        user.liked_resources_count = total_likes
        user.save()

        trophy_title = 'Influencer'
        trophy_template = get_trophy_template(trophy_title)
        if trophy_template:
            # Calculate progress percentage
            progress = min(int((total_likes / trophy_template.target_value) * 100), 100)
            is_earned = progress >= 100

            Trophy.objects.update_or_create(
                user=user,
                trophy_template=trophy_template,
                defaults={
                    'progress': progress,
                    'is_earned': is_earned,
                }
            )

@receiver(user_logged_in)
def award_login_trophies(sender, user, request, **kwargs):
    today = timezone.now().date()
    last_login = user.last_login.date() if user.last_login else None

    if last_login and (today - last_login).days == 1:
        user.login_streak += 1
    else:
        user.login_streak = 1

    user.save()

    trophies_data = [
        'Early Bird',
        'Night Owl',
    ]

    for title in trophies_data:
        trophy_template = get_trophy_template(title)
        if trophy_template:
            # Calculate progress percentage
            progress = min(int((user.login_streak / trophy_template.target_value) * 100), 100)
            is_earned = progress >= 100

            Trophy.objects.update_or_create(
                user=user,
                trophy_template=trophy_template,
                defaults={
                    'progress': progress,
                    'is_earned': is_earned,
                }
            )

@receiver(post_save, sender=UserCourseContentProgress)
def award_perfectionist_trophy(sender, instance, created, **kwargs):
    user = instance.user
    content = instance.content
    if instance.is_completed and content.type == 'quiz':
        user.perfect_quizzes_count = UserCourseContentProgress.objects.filter(
            user=user, is_completed=True, content__type='quiz'
        ).count()
        user.save()

        trophy_title = 'Perfectionist'
        trophy_template = get_trophy_template(trophy_title)
        if trophy_template:
            # Calculate progress percentage
            progress = min(int((user.perfect_quizzes_count / trophy_template.target_value) * 100), 100)
            is_earned = progress >= 100

            Trophy.objects.update_or_create(
                user=user,
                trophy_template=trophy_template,
                defaults={
                    'progress': progress,
                    'is_earned': is_earned,
                }
            )

@receiver(post_save, sender=IResource)
def award_polyglot_trophy(sender, instance, created, **kwargs):
    user = instance.createdBy
    languages = IResource.objects.filter(createdBy=user).values_list('language', flat=True).distinct()
    language_count = languages.count()
    user.languages_submitted = language_count
    user.save()

    trophy_title = 'Polyglot'
    trophy_template = get_trophy_template(trophy_title)
    if trophy_template:
        # Calculate progress percentage
        progress = min(int((language_count / trophy_template.target_value) * 100), 100)
        is_earned = progress >= 100

        Trophy.objects.update_or_create(
            user=user,
            trophy_template=trophy_template,
            defaults={
                'progress': progress,
                'is_earned': is_earned,
            }
        )

@receiver(post_save, sender=UserCourseProgress)
def award_explorer_trophy(sender, instance, created, **kwargs):
    user = instance.user
    categories = ICourse.objects.filter(
        user_progress__user=user, user_progress__is_completed=True
    ).values_list('type', flat=True).distinct()
    category_count = categories.count()
    user.categories_completed = category_count
    user.save()

    trophy_title = 'Explorer'
    trophy_template = get_trophy_template(trophy_title)
    if trophy_template:
        # Calculate progress percentage
        progress = min(int((category_count / trophy_template.target_value) * 100), 100)
        is_earned = progress >= 100

        Trophy.objects.update_or_create(
            user=user,
            trophy_template=trophy_template,
            defaults={
                'progress': progress,
                'is_earned': is_earned,
            }
        )

@receiver(post_save, sender=User)
def award_champion_trophy(sender, instance, created, **kwargs):
    user = instance
    trophy_title = 'Champion'
    trophy_template = get_trophy_template(trophy_title)
    if trophy_template:
        # Calculate progress percentage
        progress = min(int((user.level / trophy_template.target_value) * 100), 100)
        is_earned = progress >= 100

        Trophy.objects.update_or_create(
            user=user,
            trophy_template=trophy_template,
            defaults={
                'progress': progress,
                'is_earned': is_earned,
            }
        )

# New Message Notification
@receiver(post_save, sender=Message)
def create_message_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            recipient=instance.recipient,
            sender=instance.sender,
            notification_type='message',
            message=f'You have a new message from {instance.sender.username}.',
            related_object_id=instance.id,
            related_menu_item='peer_to_peer',
        )

# New Connection Request Notification
@receiver(post_save, sender=ConnectionRequest)
def create_connection_request_notification(sender, instance, created, **kwargs):
    if created and instance.status == 'pending':
        Notification.objects.create(
            recipient=instance.recipient,
            sender=instance.sender,
            notification_type='connection_request',
            message=f'{instance.sender.username} sent you a connection request.',
            related_object_id=instance.id,
            related_menu_item='peer_to_peer',
        )

@receiver(post_save, sender=MentorshipRequest)
def create_mentorship_request_notification(sender, instance, created, **kwargs):
    if created and instance.status == 'pending':
        Notification.objects.create(
            recipient=instance.mentor,
            sender=instance.sender,
            notification_type='mentorship_request',
            message=f'{instance.sender.username} sent you a mentorship request.',
            related_object_id=instance.id,
            related_menu_item='mentorship',
        )

@receiver(post_save, sender=MentorshipRequest)
def notify_mentee_on_accept(sender, instance, **kwargs):
    if instance.status == 'accepted':
        Notification.objects.create(
            recipient=instance.sender,
            sender=instance.mentor,
            notification_type='mentorship_acceptance',
            message=f'{instance.mentor.username} accepted your mentorship request.',
            related_object_id=instance.id,
            related_menu_item='mentorship',
        )
        add_experience(instance.sender, 100)

def add_experience(user, amount):
    user.experiencePoints += amount
    level_ups = 0
    while user.experiencePoints >= 1000:
        user.experiencePoints -= 1000
        user.level += 1
        level_ups += 1
    user.save()
    if level_ups > 0:
        Notification.objects.create(
            recipient=user,
            notification_type='level_up',
            message=f'Congratulations! You have leveled up to level {user.level}.',
            related_menu_item='inspiration',
        )

@receiver(post_save, sender=IResource)
def award_resource_submission_trophies(sender, instance, created, **kwargs):
    user = instance.createdBy
    if created:
        add_experience(user, 150)

def get_xp_for_difficulty(difficulty):
    xp_values = {
        'Easy': 50,
        'Medium': 100,
        'Hard': 150,
        'Very Hard': 200,
    }
    return xp_values.get(difficulty, 50)

@receiver(post_save, sender=Trophy)
def handle_trophy_post_save(sender, instance, created, **kwargs):
    if instance.is_earned:
        if created:
            difficulty = instance.trophy_template.difficulty
            xp = get_xp_for_difficulty(difficulty)
            add_experience(instance.user, xp)

            Notification.objects.create(
                recipient=instance.user,
                notification_type='achievement',
                message=f'Congratulations! You have unlocked the "{instance.trophy_template.title}" achievement and gained {xp} XP.',
                related_object_id=instance.id,
                related_menu_item='inspiration',
            )
        else:
            previous = Trophy.objects.filter(pk=instance.pk).first()
            if previous and not previous.is_earned:
                difficulty = instance.trophy_template.difficulty
                xp = get_xp_for_difficulty(difficulty)
                add_experience(instance.user, xp)

                Notification.objects.create(
                    recipient=instance.user,
                    notification_type='achievement',
                    message=f'Congratulations! You have unlocked the "{instance.trophy_template.title}" achievement and gained {xp} XP.',
                    related_object_id=instance.id,
                    related_menu_item='inspiration',
                )