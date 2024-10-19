from django.contrib import admin
from .models import IResource, IChallenge, ITrophy, IDiscussion

@admin.register(IResource)
class IResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'level', 'type', 'createdBy', 'createdAt')
    list_filter = ('level', 'type', 'createdBy')
    search_fields = ('title', 'description', 'tags')

@admin.register(IChallenge)
class IChallengeAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'level', 'progress')
    list_filter = ('status', 'level')
    search_fields = ('title', 'description')

@admin.register(ITrophy)
class ITrophyAdmin(admin.ModelAdmin):
    list_display = ('title', 'progress', 'isEarned')
    list_filter = ('isEarned',)
    search_fields = ('title', 'description')

@admin.register(IDiscussion)
class IDiscussionAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'timestamp')
    search_fields = ('title', 'author', 'content')
    list_filter = ('author', 'timestamp')

