from rest_framework import serializers
from users.serializers import BasicUserSerializer
from .models import IResource, IDiscussion, Trophy, TrophyTemplate, UserInput

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
