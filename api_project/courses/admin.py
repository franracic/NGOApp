from django.contrib import admin
from .models import IComment, ICourse, ICourseSection, ICourseContent, IAuthor, IFormField, IQuizQuestion, IUploadContent, PollOption, PollQuestion, SurveyQuestion, UserCourseProgress, UserCourseContentProgress, CourseRating

class IQuizQuestionInline(admin.TabularInline):
    model = IQuizQuestion
    extra = 1

class IFormFieldInline(admin.TabularInline):
    model = IFormField
    extra = 1

class PollOptionInline(admin.TabularInline):
    model = PollOption
    extra = 1

class PollQuestionInline(admin.StackedInline):
    model = PollQuestion
    inlines = [PollOptionInline]
    extra = 1

class SurveyQuestionInline(admin.TabularInline):
    model = SurveyQuestion
    extra = 1

@admin.register(ICourseContent)
class ICourseContentAdmin(admin.ModelAdmin):
    list_display = ['title', 'type']
    list_filter = ['type']
    search_fields = ['title', 'description']
    inlines = [
        IQuizQuestionInline,
        IFormFieldInline,
        PollQuestionInline,
        SurveyQuestionInline,
    ]

@admin.register(IUploadContent)
class IUploadContentAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'multiple']
    list_filter = ['user', 'multiple']
    search_fields = ['title', 'user__username']

admin.site.register(ICourse)
admin.site.register(ICourseSection)
admin.site.register(IAuthor)
admin.site.register(UserCourseProgress)
admin.site.register(UserCourseContentProgress)
admin.site.register(IComment)
admin.site.register(CourseRating)