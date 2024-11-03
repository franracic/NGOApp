# admin.py

from django.contrib import admin
from django import forms
from .models import IResource, TrophyTemplate, Trophy, UserInput, Notification, IEvent

class IResourceAdminForm(forms.ModelForm):
    tags = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Comma-separated tags'}),
        required=False,
        help_text='Enter comma-separated tags.'
    )

    class Meta:
        model = IResource
        fields = '__all__'

    def clean_tags(self):
        tags_str = self.cleaned_data.get('tags', '')
        tags_list = [tag.strip() for tag in tags_str.split(',') if tag.strip()]
        return tags_list

@admin.register(IResource)
class IResourceAdmin(admin.ModelAdmin):
    form = IResourceAdminForm
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'type', 'category', 'language', 'isOfficial')
        }),
        ('Content', {
            'fields': ('link', 'file')
        }),
        ('Metadata', {
            'fields': ('createdBy', 'createdAt', 'views', 'likes')
        }),
        ('Tags', {
            'fields': ('tags',)
        }),
    )
    list_display = ('title', 'type', 'category', 'createdBy', 'createdAt', 'isOfficial')
    list_filter = ('type', 'category', 'isOfficial', 'createdAt', 'createdBy')
    search_fields = ('title', 'description', 'tags')
    ordering = ('-createdAt',)
    filter_horizontal = ('likes',)
    readonly_fields = ('createdAt', 'views')

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.prefetch_related('likes')

@admin.register(TrophyTemplate)
class TrophyTemplateAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'icon', 'trophy_type', 'target_value', 'difficulty')
        }),
    )
    list_display = ('title', 'trophy_type', 'target_value', 'difficulty')
    list_filter = ('trophy_type', 'difficulty')
    search_fields = ('title', 'description')
    ordering = ('title',)

@admin.register(Trophy)
class TrophyAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('user', 'trophy_template', 'progress', 'is_earned')
        }),
    )
    list_display = ('user', 'trophy_template', 'progress', 'is_earned')
    list_filter = ('is_earned',)
    search_fields = ('user__username', 'trophy_template__title')
    ordering = ('user', 'trophy_template')
    autocomplete_fields = ('user', 'trophy_template')

@admin.register(UserInput)
class UserInputAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('user', 'title', 'content', 'bg_color')
        }),
    )
    list_display = ('user', 'title', 'bg_color')
    search_fields = ('user__username', 'title', 'content')
    ordering = ('user',)

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('recipient', 'sender', 'notification_type', 'message', 'is_read', 'created_at')
        }),
        ('Related Info', {
            'fields': ('related_object_id', 'related_menu_item')
        }),
    )
    list_display = ('recipient', 'notification_type', 'message_preview', 'is_read', 'created_at')
    list_filter = ('notification_type', 'is_read', 'created_at')
    search_fields = ('recipient__username', 'sender__username', 'message')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

    def message_preview(self, obj):
        return obj.message[:50]
    message_preview.short_description = 'Message Preview'

@admin.register(IEvent)
class IEventAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('name', 'date', 'description', 'level')
        }),
        ('Additional Info', {
            'fields': ('tags', 'attendees')
        }),
    )
    list_display = ('name', 'date', 'level', 'attendee_count')
    list_filter = ('date', 'level')
    search_fields = ('name', 'description')
    ordering = ('-date',)
    filter_horizontal = ('attendees',)

    def attendee_count(self, obj):
        return obj.attendees.count()
    attendee_count.short_description = 'Attendees'
