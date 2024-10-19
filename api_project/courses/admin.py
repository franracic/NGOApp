from django.contrib import admin
from .models import IAuthor, ICourse, ICourseContent, ICourseSection

@admin.register(IAuthor)
class IAuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
    search_fields = ('name', 'email')

@admin.register(ICourseContent)
class ICourseContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'type')
    list_filter = ('type',)
    search_fields = ('title',)

@admin.register(ICourse)
class ICourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'average_rating', 'total_duration', 'isUnlocked', 'type')
    list_filter = ('isUnlocked', 'type')
    search_fields = ('title', 'description')

@admin.register(ICourseSection)
class ICourseSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'course')
    search_fields = ('title',)
    list_filter = ('course',)

