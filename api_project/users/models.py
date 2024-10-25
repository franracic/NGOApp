from django.db import models
from django.contrib.auth.models import AbstractUser
from simple_history.models import HistoricalRecords
from django.core.validators import RegexValidator

class User(AbstractUser):
    BEGINNER = 'beginner'
    WORKER = 'worker'
    MENTOR = 'mentor'
    ADMIN = 'admin'
    PRACTITIONER = 'practitioner'

    ROLE_CHOICES = [
        (WORKER, 'Worker'),
        (MENTOR, 'Mentor'),
        (ADMIN, 'Admin'),
        (PRACTITIONER, 'Practitioner'),
    ]

    username_validator = RegexValidator(
        regex=r'^[\w\s\.-]+$',
        message='Username may contain only letters, numbers, spaces, and the following characters: -'
    )

    username = models.CharField(
        max_length=150,
        unique=True,
        validators=[username_validator],
        error_messages={
            'unique': "A user with that username already exists.",
        },
    )
    name = models.CharField(
        max_length=150,
        validators=[username_validator],
        default='User'
    )

    password = models.CharField(max_length=128)

    email = models.EmailField(unique=True)
    
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    
    interests = models.JSONField(null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    jobTitle = models.CharField(max_length=100, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    isNetworking = models.BooleanField(default=False)
    website = models.URLField(null=True, blank=True)
    linkedin = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    instagram = models.URLField(null=True, blank=True)
    availabilityStatus = models.CharField(max_length=100, null=True, blank=True)
    activityLevel = models.IntegerField(default=0)
    experiencePoints = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    connectionsCount = models.IntegerField(null=True, blank=True)
    isMentor = models.BooleanField(default=False)
    expertise = models.JSONField(null=True, blank=True)
    mentees = models.ManyToManyField('self', blank=True)
    completed_courses_count = models.IntegerField(default=0)
    submitted_resources_count = models.IntegerField(default=0)
    connections_count = models.IntegerField(default=0)
    login_streak = models.IntegerField(default=0)
    comment_count = models.IntegerField(default=0)
    perfect_quizzes_count = models.IntegerField(default=0)
    liked_resources_count = models.IntegerField(default=0)
    viewed_resources_count = models.IntegerField(default=0)
    time_spent_learning = models.FloatField(default=0.0)

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=BEGINNER)

    history = HistoricalRecords()

    class Meta:
        permissions = [
            ("intro", "Can view intro"),
            ("can_view_worker_dashboard", "Can view worker dashboard"),
            ("can_view_mentor_dashboard", "Can view mentor dashboard"),
            ("can_view_admin_dashboard", "Can view admin dashboard"),
            ("can_view_practitioner_dashboard", "Can view practitioner dashboard"),
        ]

class IGroup(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    members = models.IntegerField()
    memberList = models.ManyToManyField(User)
    level = models.IntegerField()

class IActivity(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    action = models.CharField(max_length=100)
    target = models.CharField(max_length=100, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)