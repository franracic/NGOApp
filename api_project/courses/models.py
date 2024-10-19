from django.db import models

class IAuthor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    avatar = models.URLField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

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

class ICourse(models.Model):
    title = models.CharField(max_length=100)
    cover_image = models.URLField(null=True, blank=True)
    average_rating = models.FloatField(null=True, default=0)
    description = models.TextField(null=True, blank=True)
    authors = models.ManyToManyField(IAuthor, blank=True)
    total_duration = models.CharField(max_length=50, default="Unknown")
    isUnlocked = models.BooleanField(default=False)
    course = models.TextField(null=True, blank=True)
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
    contents = models.ManyToManyField(ICourseContent, blank=True)
    course = models.ForeignKey(ICourse, related_name='sections', on_delete=models.CASCADE)

    def __str__(self):
        return self.title