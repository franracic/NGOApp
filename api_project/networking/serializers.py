from rest_framework import serializers
from courses.models import IDiscussion
from users.serializers import BasicUserSerializer
from .models import IEvent, IResource, Notification, Trophy, TrophyTemplate, UserInput

class IResourceSerializer(serializers.ModelSerializer):
    createdBy = BasicUserSerializer(read_only=True)
    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = IResource
        fields = '__all__'

class TrophyTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrophyTemplate
        fields = '__all__'

class UserTrophySerializer(serializers.ModelSerializer):
    trophy_template = TrophyTemplateSerializer()

    class Meta:
        model = Trophy
        fields = ['id', 'trophy_template', 'progress', 'is_earned']

class UserInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInput
        fields = '__all__'

class IDiscussionSerializer(serializers.ModelSerializer):
    author = BasicUserSerializer(read_only=True)

    class Meta:
        model = IDiscussion
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    related_menu_item = serializers.CharField()

    class Meta:
        model = Notification
        fields = [
            'id',
            'recipient',
            'sender',
            'sender_username',
            'notification_type',
            'message',
            'is_read',
            'created_at',
            'related_object_id',
            'related_menu_item',
        ]
        read_only_fields = ['recipient', 'created_at']

class IEventSerializer(serializers.ModelSerializer):
    attendees = BasicUserSerializer(many=True, read_only=True)
    attendees_count = serializers.IntegerField(source='attendees.count', read_only=True)
    tags = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = IEvent
        fields = ['id', 'name', 'date', 'description', 'attendees', 'attendees_count', 'level', 'tags']
