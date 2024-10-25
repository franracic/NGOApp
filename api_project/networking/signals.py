# networking/signals.py

from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

from courses.models import IComment as CourseComment
from courses.models import UserCourseProgress, UserCourseContentProgress, ICourse, ICourseContent
from networking import models
from networking.models import Trophy, TrophyTemplate, IResource
from django.contrib.auth.signals import user_logged_in

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
            # Calculate progress percentage
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
            # For role trophies, progress is either 0 or 100
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
    if instance.is_completed and content.type == 'quiz' and instance.score == 100:
        user.perfect_quizzes_count = UserCourseContentProgress.objects.filter(
            user=user, is_completed=True, content__type='quiz', score=100
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
