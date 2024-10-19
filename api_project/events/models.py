from django.db import models

class IEvent(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateTimeField()
    description = models.TextField()
    attendees = models.IntegerField()
    level = models.IntegerField()
