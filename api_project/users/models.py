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
    NGO = models.CharField(max_length=100, null=True, blank=True)
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
    connectionsCount = models.IntegerField(default=0)
    isMentor = models.BooleanField(default=False)
    expertise = models.JSONField(null=True, blank=True)
    completed_courses_count = models.IntegerField(default=0)
    submitted_resources_count = models.IntegerField(default=0)
    connections_count = models.IntegerField(default=0)
    login_streak = models.IntegerField(default=0)
    comment_count = models.IntegerField(default=0)
    perfect_quizzes_count = models.IntegerField(default=0)
    liked_resources_count = models.IntegerField(default=0)
    viewed_resources_count = models.IntegerField(default=0)
    time_spent_learning = models.FloatField(default=0.0)
    mentor = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='mentees')
    max_mentees = models.IntegerField(default=5)

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
    description = models.TextField(null=True, blank=True)
    members = models.ManyToManyField(User, related_name='inGroups', blank=True)
    logo_url = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return self.name

    def is_member(self, user):
        return self.members.filter(id=user.id).exists()
    
class GroupMessage(models.Model):
    group = models.ForeignKey(IGroup, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.sender.username} in {self.group.name}"

class IActivity(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    action = models.CharField(max_length=100)
    target = models.CharField(max_length=100, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

class Connection(models.Model):
    user1 = models.ForeignKey(User, related_name='connections_initiated', on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name='connections_received', on_delete=models.CASCADE)
    connected_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user1} connected with {self.user2}"

    class Meta:
        unique_together = ('user1', 'user2')

class ConnectionRequest(models.Model):
    sender = models.ForeignKey(User, related_name='connection_requests_sent', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='connection_requests_received', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=(('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')), default='pending')
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('sender', 'recipient')

    def __str__(self):
        return f"{self.sender} sent a connection request to {self.recipient}"

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='messages_sent', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='messages_received', on_delete=models.CASCADE)
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} sent a message to {self.recipient}"
    
class MentorshipRequest(models.Model):
    sender = models.ForeignKey(User, related_name='mentorship_requests_sent', on_delete=models.CASCADE)
    mentor = models.ForeignKey(User, related_name='mentorship_requests_received', on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=(('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')),
        default='pending'
    )
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('sender', 'mentor')

    def __str__(self):
        return f"{self.sender} sent a mentorship request to {self.mentor}"