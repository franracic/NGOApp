from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, IGroup, IActivity

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('name', 'email', 'avatar', 'bio', 'city', 'country', 'jobTitle')}),
        ('Interests and Social', {'fields': ('interests', 'website', 'linkedin', 'twitter', 'instagram')}),
        ('Status', {'fields': ('isNetworking', 'availabilityStatus', 'activityLevel', 'experiencePoints', 'level', 'connectionsCount')}),
        ('Mentorship', {'fields': ('isMentor', 'expertise', 'mentees')}),
        ('Role and Permissions', {'fields': ('role', 'is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    list_display = ('username', 'email', 'name', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active', 'isMentor')
    search_fields = ('username', 'email', 'name')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions', 'mentees')

@admin.register(IGroup)
class IGroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'level', 'members')
    list_filter = ('level',)
    search_fields = ('name', 'description')
    filter_horizontal = ('memberList',)

@admin.register(IActivity)
class IActivityAdmin(admin.ModelAdmin):
    list_display = ('username', 'action', 'target', 'timestamp')
    list_filter = ('action', 'timestamp', 'username')
    search_fields = ('username', 'action', 'target')

