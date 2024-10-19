from django.db import models
from users.models import User

class IResource(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    link = models.URLField()
    level = models.IntegerField()
    type = models.CharField(max_length=50)
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
    tags = models.JSONField(null=True, blank=True)

class IChallenge(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=100)
    level = models.IntegerField()
    progress = models.IntegerField()

class ITrophy(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.TextField()
    progress = models.IntegerField()
    isEarned = models.BooleanField(default=False)

class IDiscussion(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
