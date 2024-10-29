from rest_framework import serializers
from users.serializers import BasicUserSerializer
from .models import IResource, IDiscussion, Notification, Trophy, TrophyTemplate, UserInput

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