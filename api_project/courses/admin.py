from django.contrib import admin
from .models import ICourse, ICourseSection, ICourseContent, IAuthor, UserCourseProgress, UserCourseContentProgress

admin.site.register(ICourseSection)
admin.site.register(ICourseContent)
admin.site.register(IAuthor)
admin.site.register(UserCourseContentProgress)

@admin.register(UserCourseProgress)
class UserCourseProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'is_unlocked', 'is_completed', 'progress')
    list_filter = ('is_unlocked', 'is_completed')
    search_fields = ('user__username', 'course__title')

@admin.register(ICourse)
class ICourseAdmin(admin.ModelAdmin):
    list_filter = ('course',)
    ordering = ('order',)