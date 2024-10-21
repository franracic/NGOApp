from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()

class IAuthor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    avatar = models.URLField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

class ICourseContent(models.Model):
    content_type_choices = [
        ("pdf", "PDF"),
        ("video", "Video"),
        ("quiz", "Quiz"),
        ("form", "Form"),
        ("upload", "Upload"),
        ("survey", "Survey"),
        ("youtube", "YouTube"),
        ("poll", "Poll"),
        ("image", "Image"),
        ("text", "Text"),
        ("audio", "Audio")
    ]
    title = models.CharField(max_length=100)
    type = models.CharField(choices=content_type_choices, max_length=10)
    url = models.URLField(null=True, blank=True)
    duration = models.CharField(max_length=50, null=True, blank=True)
    transcript = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title

class ICourse(models.Model):
    title = models.CharField(max_length=100)
    cover_image = models.URLField(null=True, blank=True)
    average_rating = models.FloatField(null=True, default=0)
    description = models.TextField(null=True, blank=True)
    authors = models.ManyToManyField(IAuthor, blank=True)
    total_duration = models.CharField(max_length=50, default="Unknown")
    ROLE_CHOICES = [
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

    def __str__(self):
        return self.title

class ICourseSection(models.Model):
    title = models.CharField(max_length=100)
    contents = models.ManyToManyField(ICourseContent, blank=True, related_name='sections')
    course = models.ForeignKey(ICourse, related_name='sections', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
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

@receiver(post_save, sender=User)
def unlock_initial_courses(sender, instance, created, **kwargs):
    if created:
        initial_courses = ICourse.objects.filter(course=instance.role).order_by('order')[:3]
        for course in initial_courses:
            UserCourseProgress.objects.create(user=instance, course=course, is_unlocked=True)