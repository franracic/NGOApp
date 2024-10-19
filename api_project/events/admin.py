from django.contrib import admin
from .models import IEvent

@admin.register(IEvent)
class IEventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'attendees', 'level')
    list_filter = ('date', 'level')
    search_fields = ('name', 'description')