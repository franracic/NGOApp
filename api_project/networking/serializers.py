from rest_framework import serializers
from users.serializers import BasicUserSerializer
from .models import IResource, IChallenge, ITrophy, IDiscussion

class IResourceSerializer(serializers.ModelSerializer):
    createdBy = BasicUserSerializer(read_only=True)
    likes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = IResource
        fields = '__all__'

class IChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = IChallenge
        fields = '__all__'

class ITrophySerializer(serializers.ModelSerializer):
    class Meta:
        model = ITrophy
        fields = '__all__'

class IDiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = IDiscussion
        fields = '__all__'
