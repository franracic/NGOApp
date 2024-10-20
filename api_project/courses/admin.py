from django.contrib import admin
from .models import ICourse, ICourseSection, ICourseContent, IAuthor, UserCourseProgress

admin.site.register(ICourse)
admin.site.register(ICourseSection)
admin.site.register(ICourseContent)
admin.site.register(IAuthor)

@admin.register(UserCourseProgress)
class UserCourseProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'is_unlocked', 'is_completed', 'progress')
    list_filter = ('is_unlocked', 'is_completed')
    search_fields = ('user__username', 'course__title')