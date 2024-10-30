from rest_framework import serializers

from courses.models import UserCourseProgress
from networking.models import Trophy
from .models import Connection, ConnectionRequest, GroupMessage, MentorshipRequest, Message, User, IGroup, IActivity

from django.contrib.auth.hashers import make_password

class UserCourseProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCourseProgress
        fields = ['is_unlocked', 'is_completed', 'progress', 'course']

class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'name', 'avatar', 'city', 'country', 'jobTitle', 'bio', 'role',
            'interests', 'isNetworking', 'website', 'linkedin', 'twitter', 'instagram',
            'availabilityStatus', 'activityLevel', 'experiencePoints', 'level',
            'connectionsCount', 'isMentor', 'expertise', 'completed_courses_count',
            'submitted_resources_count', 'connections_count', 'login_streak', 'comment_count',
            'perfect_quizzes_count', 'liked_resources_count', 'viewed_resources_count',
            'time_spent_learning',
        ]
class UserSerializer(serializers.ModelSerializer):
    courses = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        return make_password(value)

    def create(self, validated_data):
        mentees_data = validated_data.pop('mentees', None)
        
        user = super(UserSerializer, self).create(validated_data)
        
        if mentees_data:
            user.mentees.set(mentees_data)
        
        return user
    
    def update_time_spent(user, time_spent):
        user.time_spent_learning += time_spent
        user.save()

        if user.time_spent_learning >= 10.0:
            Trophy.objects.get_or_create(
                user=user,
                title='Marathon Learner',
                trophy_type='time_spent_learning',
                target_value=10,
                defaults={
                    'description': 'Spend 10 hours learning in one week.',
                    'icon': 'FaRunning',
                    'progress': 100,
                    'is_earned': True,
                    'difficulty': 'hard',
                }
            )
    
    def get_courses(self, obj):
        progress = UserCourseProgress.objects.filter(user=obj).values_list('course', flat=True)
        return list(progress)

class IGroupSerializer(serializers.ModelSerializer):
    members = BasicUserSerializer(many=True, read_only=True)
    members_count = serializers.IntegerField(source='members.count', read_only=True)
    is_member = serializers.SerializerMethodField()

    class Meta:
        model = IGroup
        fields = '__all__'

    def get_is_member(self, obj):
        user = self.context['request'].user
        return obj.is_member(user)
    
class GroupMessageSerializer(serializers.ModelSerializer):
    sender = BasicUserSerializer(read_only=True)

    class Meta:
        model = GroupMessage
        fields = ['id', 'group', 'sender', 'content', 'sent_at']
        read_only_fields = ['sender', 'sent_at']

class IActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = IActivity
        fields = '__all__'

class ConnectionRequestSerializer(serializers.ModelSerializer):
    sender = BasicUserSerializer(read_only=True)

    class Meta:
        model = ConnectionRequest
        fields = ['id', 'sender', 'status', 'sent_at']

class ConnectionSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer(source='user2', read_only=True)

    class Meta:
        model = Connection
        fields = ['user', 'connected_at']

class MessageSerializer(serializers.ModelSerializer):
    sender = BasicUserSerializer(read_only=True)
    recipient = BasicUserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'content', 'sent_at']

class MentorshipRequestSerializer(serializers.ModelSerializer):
    sender = BasicUserSerializer(read_only=True)
    mentor = BasicUserSerializer(read_only=True)

    class Meta:
        model = MentorshipRequest
        fields = ['id', 'sender', 'mentor', 'status', 'sent_at']