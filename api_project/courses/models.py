from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from networking.models import IResource

User = get_user_model()

class IAuthor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    avatar = models.URLField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class ICourseContent(models.Model):
    CONTENT_TYPE_CHOICES = [
        ("pdf", "PDF"),
        ("video", "Video"),
        ("quiz", "Quiz"),
        ("form", "Form"),
        ("upload", "Upload"),
        ("survey", "Survey"),
        ("poll", "Poll"),
        ("image", "Image"),
        ("text", "Text"),
        ("audio", "Audio")
    ]
    title = models.CharField(max_length=100)
    type = models.CharField(choices=CONTENT_TYPE_CHOICES, max_length=10)
    url = models.URLField(null=True, blank=True)
    duration = models.CharField(max_length=50, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title


class ICourse(models.Model):
    title = models.CharField(max_length=100)
    cover_image = models.URLField(null=True, blank=True)
    average_rating = models.FloatField(null=True, default=0)
    no_of_ratings = models.PositiveIntegerField(default=0, null=True)
    description = models.TextField(null=True, blank=True)
    authors = models.ManyToManyField(IAuthor, blank=True)
    total_duration = models.CharField(max_length=50, default="Unknown")
    ROLE_CHOICES = [
        ('beginner', 'Beginner'),
        ('worker', 'Worker'),
        ('practitioner', 'Practitioner'),
        ('mentor', 'Mentor'),
    ]
    course = models.CharField(max_length=20, choices=ROLE_CHOICES)
    order = models.PositiveIntegerField(default=0)
    type_choices = [
        ("Lecture", "Lecture"),
        ("Workshop", "Workshop"),
        ("Exam", "Exam"),
    ]
    type = models.CharField(choices=type_choices, max_length=10)
    resources = models.ManyToManyField(IResource, blank=True)
    comments = models.ManyToManyField('IComment', blank=True, related_name='courses')

    def __str__(self):
        return self.course + " " + self.title
    
class CourseRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(ICourse, related_name='ratings', on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f"{self.user.username} rated {self.course.title} with {self.rating} stars"

class ICourseSection(models.Model):
    title = models.CharField(max_length=100)
    contents = models.ManyToManyField(ICourseContent, blank=True, related_name='sections')
    course = models.ForeignKey(ICourse, related_name='sections', on_delete=models.CASCADE)

    def __str__(self):
        return self.course.title + " " + self.title
    
class UserCourseProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='course_progress')
    course = models.ForeignKey(ICourse, on_delete=models.CASCADE, related_name='user_progress')
    is_unlocked = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    progress = models.FloatField(default=0)

    class Meta:
        unique_together = ('user', 'course')

    def __str__(self):
        return f"{self.user.username} - {self.course.title}"
    
class UserCourseContentProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='content_progress')
    content = models.ForeignKey(ICourseContent, on_delete=models.CASCADE, related_name='user_progress')
    is_completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'content')

    def __str__(self):
        return f"{self.user.username} - {self.content.title}"
    
class IComment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    timestamp = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey(
        'self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies'
    )
    likes = models.ManyToManyField(User, related_name='liked_comments', blank=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.timestamp}"

@receiver(post_save, sender=User)
def unlock_initial_courses(sender, instance, created, **kwargs):
    if created:
        initial_courses = ICourse.objects.filter(course=instance.role).order_by('order')[:3]
        for course in initial_courses:
            UserCourseProgress.objects.create(user=instance, course=course, is_unlocked=True)


class IQuizQuestion(models.Model):
    QUESTION_TYPE_CHOICES = [
        ("multiple-choice", "Multiple Choice"),
        ("true-false", "True/False"),
    ]
    content = models.ForeignKey(
        ICourseContent, related_name='quiz_questions', on_delete=models.CASCADE
    )
    type = models.CharField(choices=QUESTION_TYPE_CHOICES, max_length=20)
    question = models.CharField(max_length=255)
    options = models.JSONField(default=list, blank=True, null=True)
    correct_answer = models.CharField(max_length=255)

    def __str__(self):
        return self.question
    
class IFormField(models.Model):
    FIELD_TYPE_CHOICES = [
        ("text", "Text"),
        ("textarea", "Textarea"),
        ("rating", "Rating"),
        ("multiple-choice", "Multiple Choice"),
    ]
    content = models.ForeignKey(
        ICourseContent, related_name='form_fields', on_delete=models.CASCADE
    )
    label = models.CharField(max_length=255)
    type = models.CharField(choices=FIELD_TYPE_CHOICES, max_length=20)
    options = models.JSONField(default=list, blank=True, null=True)
    accept = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.label

class PollQuestion(models.Model):
    content = models.OneToOneField(
        ICourseContent, related_name='poll_question', on_delete=models.CASCADE
    )
    question = models.CharField(max_length=255)

    def __str__(self):
        return self.question

class PollOption(models.Model):
    poll_question = models.ForeignKey(
        PollQuestion, related_name='options', on_delete=models.CASCADE
    )
    label = models.CharField(max_length=255)
    votes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.label

class SurveyQuestion(models.Model):
    QUESTION_TYPE_CHOICES = [
        ("multiple-choice", "Multiple Choice"),
        ("text", "Text"),
        ("rating", "Rating"),
    ]
    content = models.ForeignKey(
        ICourseContent, related_name='survey_questions', on_delete=models.CASCADE
    )
    question = models.CharField(max_length=255)
    type = models.CharField(choices=QUESTION_TYPE_CHOICES, max_length=20)
    options = models.JSONField(default=list, blank=True, null=True)
    rating_scale = models.PositiveIntegerField(null=True, blank=True)
    placeholder = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.question

class IUploadContent(models.Model):
    content_type_choices = [
        ("pdf", "PDF"),
        ("video", "Video"),
        ("image", "Image"),
        ("text", "Text"),
        ("audio", "Audio"),
    ]

    user = models.ForeignKey(User, related_name="uploads", on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    accepted_file_types = models.JSONField(default=list, blank=True, null=True)
    multiple = models.BooleanField(default=False)
    files = models.FileField(upload_to="uploads/", null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title