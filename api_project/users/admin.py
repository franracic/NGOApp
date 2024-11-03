# admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User,
    IGroup,
    GroupMessage,
    IActivity,
    Connection,
    ConnectionRequest,
    Message,
    MentorshipRequest,
)

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('name', 'email', 'avatar', 'bio', 'city', 'country', 'jobTitle')}),
        ('Interests and Social', {'fields': ('interests', 'website', 'linkedin', 'twitter', 'instagram')}),
        ('Status', {'fields': (
            'isNetworking',
            'availabilityStatus',
            'activityLevel',
            'experiencePoints',
            'level',
            'connectionsCount',
            'completed_courses_count',
            'submitted_resources_count',
            'time_spent_learning'
        )}),
        ('Mentorship', {'fields': (
            'isMentor',
            'mentor',
            'max_mentees',
            'expertise'
        )}),
        ('Role and Permissions', {'fields': ('role', 'is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Learning Statistics', {'fields': (
            'login_streak',
            'comment_count',
            'perfect_quizzes_count',
            'liked_resources_count',
            'viewed_resources_count'
        )}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    list_display = ('username', 'email', 'name', 'role', 'is_staff', 'is_active', 'isMentor')
    list_filter = ('role', 'is_staff', 'is_active', 'isMentor')
    search_fields = ('username', 'email', 'name')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions')


@admin.register(IGroup)
class IGroupAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('name', 'description', 'logo_url')}),
        ('Members', {'fields': ('members',)}),
    )
    list_display = ('name', 'description', 'member_count')
    search_fields = ('name', 'description')
    filter_horizontal = ('members',)

    def member_count(self, obj):
        return obj.members.count()
    member_count.short_description = 'Member Count'


@admin.register(GroupMessage)
class GroupMessageAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('group', 'sender', 'content', 'sent_at')}),
    )
    list_display = ('group', 'sender', 'short_content', 'sent_at')
    list_filter = ('group', 'sender', 'sent_at')
    search_fields = ('group__name', 'sender__username', 'content')

    def short_content(self, obj):
        return obj.content[:50]
    short_content.short_description = 'Content Preview'


@admin.register(IActivity)
class IActivityAdmin(admin.ModelAdmin):
    list_display = ('username', 'action', 'target', 'timestamp')
    list_filter = ('action', 'timestamp', 'username')
    search_fields = ('username', 'action', 'target')


@admin.register(Connection)
class ConnectionAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('user1', 'user2', 'connected_at')}),
    )
    list_display = ('user1', 'user2', 'connected_at')
    search_fields = ('user1__username', 'user2__username')
    list_filter = ('connected_at',)
    ordering = ('-connected_at',)


@admin.register(ConnectionRequest)
class ConnectionRequestAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('sender', 'recipient', 'status', 'sent_at')}),
    )
    list_display = ('sender', 'recipient', 'status', 'sent_at')
    search_fields = ('sender__username', 'recipient__username')
    list_filter = ('status', 'sent_at')
    ordering = ('-sent_at',)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('sender', 'recipient', 'content', 'sent_at')}),
    )
    list_display = ('sender', 'recipient', 'short_content', 'sent_at')
    search_fields = ('sender__username', 'recipient__username', 'content')
    list_filter = ('sent_at',)
    ordering = ('-sent_at',)

    def short_content(self, obj):
        return obj.content[:50]
    short_content.short_description = 'Content Preview'


@admin.register(MentorshipRequest)
class MentorshipRequestAdmin(admin.ModelAdmin):
    list_display = ('sender', 'mentor', 'status', 'sent_at')
    list_filter = ('status', 'sent_at')
    search_fields = ('sender__username', 'mentor__username')
    ordering = ('-sent_at',)
