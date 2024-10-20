from django.db import models
from users.models import User

class IResource(models.Model):
    CATEGORY_CHOICES = [
        ('Education', 'Education'),
        ('Technology', 'Technology'),
        ('Health', 'Health'),
        ('Science', 'Science'),
        ('Arts', 'Arts'),
        ('Business', 'Business'),
        ('Environment', 'Environment'),
        ('Other', 'Other'),
    ]

    TYPE_CHOICES = [
        ('Article', 'Article'),
        ('Video', 'Video'),
        ('Pdf', 'Pdf'),
        ('Other', 'Other'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)
    file = models.FileField(upload_to='resources/', blank=True, null=True)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='Article')
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_resources')
    createdAt = models.DateTimeField(auto_now_add=True)
    tags = models.JSONField(null=True, blank=True)
    views = models.IntegerField(default=0)
    language = models.CharField(max_length=50)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='Other')
    likes = models.ManyToManyField(User, related_name='liked_resources', blank=True)
    isOfficial = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.file and not self.link:
            self.link = 'media/resources/'+self.file.url.split("/")[-1]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


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
