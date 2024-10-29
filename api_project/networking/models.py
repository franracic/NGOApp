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

class TrophyTemplate(models.Model):
    DIFFICULTY_CHOICES = [
        ('very easy', 'Very Easy'),
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
        ('very hard', 'Very Hard'),
        ('extremely hard', 'Extremely Hard'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=100)
    trophy_type = models.CharField(max_length=50)
    target_value = models.IntegerField(default=0)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='easy')

    def __str__(self):
        return self.title

class Trophy(models.Model):
    user = models.ForeignKey(User, related_name='trophies', on_delete=models.CASCADE)
    trophy_template = models.ForeignKey(TrophyTemplate, on_delete=models.CASCADE, related_name='user_trophies')
    progress = models.IntegerField(default=0)
    is_earned = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'trophy_template')

    def __str__(self):
        return f"{self.trophy_template.title} - {self.user.username}"

class UserInput(models.Model):
    user = models.ForeignKey(User, related_name='user_inputs', on_delete=models.CASCADE, default=7, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    content = models.TextField()
    bg_color = models.CharField(max_length=50, default='white')

    def __str__(self):
        return f"UserInput by {self.user.username}"


class IDiscussion(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ('message', 'Message'),
        ('connection_request', 'Connection Request'),
        ('event', 'Event'),
        ('achievement', 'Achievement'),
    )

    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    related_object_id = models.PositiveIntegerField(null=True, blank=True)

    RELATED_MENU_ITEMS = (
        ('dashboard', 'Dashboard'),
        ('materials', 'Materials'),
        ('education', 'Education'),
        ('workshops', 'Workshops'),
        ('inspiration', 'Inspiration'),
        ('peer_to_peer', 'Peer to Peer'),
        ('mentorship', 'Mentorship'),
        ('networking', 'Networking'),
    )

    related_menu_item = models.CharField(
        max_length=50,
        choices=RELATED_MENU_ITEMS,
        null=True,
        blank=True,
        help_text="The menu item this notification is related to."
    )

    def __str__(self):
        return f"{self.notification_type} to {self.recipient.username}"