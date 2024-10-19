from rest_framework import serializers
from .models import IResource, IChallenge, ITrophy, IDiscussion

class IResourceSerializer(serializers.ModelSerializer):
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
