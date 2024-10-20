from rest_framework import serializers
from .models import User, IGroup, IActivity

from django.contrib.auth.hashers import make_password

class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'name', 'avatar', 'city', 'country', 'jobTitle', 'bio', 'role'
        ]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'name', 'email', 'password', 'avatar', 'interests', 'city', 'jobTitle', 'bio', 'country', 
            'isNetworking', 'website', 'linkedin', 'twitter', 'instagram', 'availabilityStatus', 'activityLevel', 
            'experiencePoints', 'level', 'connectionsCount', 'isMentor', 'expertise', 'mentees', 'role'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        return make_password(value)

    def create(self, validated_data):
        mentees_data = validated_data.pop('mentees', None)
        
        user = super(UserSerializer, self).create(validated_data)
        
        if mentees_data:
            user.mentees.set(mentees_data)
        
        return user

class IGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = IGroup
        fields = '__all__'

class IActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = IActivity
        fields = '__all__'
