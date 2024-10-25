from rest_framework import serializers

from users.serializers import BasicUserSerializer, UserSerializer
from .models import IComment, ICourse, ICourseContent, ICourseSection, IAuthor, IFormField, IQuizQuestion, IUploadContent, PollOption, PollQuestion, SurveyQuestion, UserCourseContentProgress, UserCourseProgress
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCourseProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCourseProgress
        fields = ['is_unlocked', 'is_completed', 'progress']


class IAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = IAuthor
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer(read_only=True)
    replies = serializers.SerializerMethodField()
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    is_liked = serializers.SerializerMethodField()
    courses = serializers.PrimaryKeyRelatedField(queryset=ICourse.objects.all(), many=True, required=False)

    class Meta:
        model = IComment
        fields = '__all__'

    def get_replies(self, obj):
        if obj.replies.exists():
            return CommentSerializer(obj.replies.all(), many=True, context=self.context).data
        return []

    def get_is_liked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.likes.filter(id=user.id).exists()
        return False
    
    def create(self, validated_data):
        return super().create(validated_data)
    
class IQuizQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = IQuizQuestion
        fields = ['id', 'type', 'question', 'options', 'correct_answer']

    def validate(self, data):
        if data['type'] == 'multiple-choice' and not data.get('options'):
            raise serializers.ValidationError("Options are required for multiple-choice questions.")
        if data['type'] == 'true-false' and data.get('options'):
            raise serializers.ValidationError("Options should not be provided for true/false questions.")
        return data

class IFormFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = IFormField
        fields = ['id', 'label', 'type', 'options', 'accept']

class PollOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollOption
        fields = ['id', 'label', 'votes']

class PollQuestionSerializer(serializers.ModelSerializer):
    options = PollOptionSerializer(many=True)

    class Meta:
        model = PollQuestion
        fields = ['id', 'question', 'options']

    def create(self, validated_data):
        options_data = validated_data.pop('options')
        poll_question = PollQuestion.objects.create(**validated_data)
        for option_data in options_data:
            PollOption.objects.create(poll_question=poll_question, **option_data)
        return poll_question

    def update(self, instance, validated_data):
        options_data = validated_data.pop('options', None)
        instance.question = validated_data.get('question', instance.question)
        instance.save()

        if options_data is not None:
            instance.options.all().delete()
            for option_data in options_data:
                PollOption.objects.create(poll_question=instance, **option_data)
        return instance

class SurveyQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyQuestion
        fields = ['id', 'question', 'type', 'options', 'rating_scale', 'placeholder']

class IUploadContentSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = IUploadContent
        fields = ['id', 'user', 'title', 'accepted_file_types', 'multiple', 'files', 'description']

    def validate_files(self, value):
        accepted_types = self.initial_data.get('accepted_file_types', [])
        if accepted_types:
            if not value.name.split('.')[-1] in accepted_types:
                raise serializers.ValidationError("File type is not allowed.")
        return value

    def create(self, validated_data):
        user = validated_data.get('user')
        return IUploadContent.objects.create(**validated_data)

class ICourseContentSerializer(serializers.ModelSerializer):
    quiz_questions = IQuizQuestionSerializer(many=True, required=False)
    form_fields = IFormFieldSerializer(many=True, required=False)
    poll_question = PollQuestionSerializer(required=False)
    survey_questions = SurveyQuestionSerializer(many=True, required=False)
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = ICourseContent
        fields = '__all__'

    def create(self, validated_data):
        content_type = validated_data.get('type')
        quiz_data = validated_data.pop('quiz_questions', [])
        form_fields = validated_data.pop('form_fields', [])
        poll_data = validated_data.pop('poll_question', None)
        survey_data = validated_data.pop('survey_questions', [])

        course_content = ICourseContent.objects.create(**validated_data)

        if content_type == 'quiz':
            for question_data in quiz_data:
                IQuizQuestion.objects.create(content=course_content, **question_data)
        elif content_type == 'form':
            for field_data in form_fields:
                IFormField.objects.create(content=course_content, **field_data)
        elif content_type == 'poll':
            if poll_data:
                poll_question_serializer = PollQuestionSerializer(data=poll_data)
                poll_question_serializer.is_valid(raise_exception=True)
                poll_question_serializer.save(content=course_content)
        elif content_type == 'survey':
            for question_data in survey_data:
                SurveyQuestion.objects.create(content=course_content, **question_data)

        return course_content

    def update(self, instance, validated_data):
        content_type = validated_data.get('type', instance.type)
        quiz_data = validated_data.pop('quiz_questions', None)
        form_fields = validated_data.pop('form_fields', None)
        poll_data = validated_data.pop('poll_question', None)
        survey_data = validated_data.pop('survey_questions', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if content_type == 'quiz' and quiz_data is not None:
            instance.quiz_questions.all().delete()
            for question_data in quiz_data:
                IQuizQuestion.objects.create(content=instance, **question_data)
        elif content_type == 'form' and form_fields is not None:
            instance.form_fields.all().delete()
            for field_data in form_fields:
                IFormField.objects.create(content=instance, **field_data)
        elif content_type == 'poll' and poll_data is not None:
            if instance.poll_question:
                poll_question_serializer = PollQuestionSerializer(instance.poll_question, data=poll_data)
                poll_question_serializer.is_valid(raise_exception=True)
                poll_question_serializer.save()
            else:
                poll_question_serializer = PollQuestionSerializer(data=poll_data)
                poll_question_serializer.is_valid(raise_exception=True)
                poll_question_serializer.save(content=instance)
        elif content_type == 'survey' and survey_data is not None:
            instance.survey_questions.all().delete()
            for question_data in survey_data:
                SurveyQuestion.objects.create(content=instance, **question_data)

        return instance

    def get_is_completed(self, obj):
        user = self.context.get('request').user
        if not user.is_authenticated:
            return False
        return UserCourseContentProgress.objects.filter(user=user, content=obj, is_completed=True).exists()
    
class ICourseSectionSerializer(serializers.ModelSerializer):
    contents = ICourseContentSerializer(many=True, required=False)
    course = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ICourseSection
        fields = '__all__'

    def create(self, validated_data):
        contents_data = validated_data.pop('contents', [])
        section = ICourseSection.objects.create(**validated_data)

        contents = []
        for content_data in contents_data:
            content = ICourseContent.objects.create(**content_data)
            contents.append(content.id)
        section.contents.set(contents)

        return section

class ICourseSerializer(serializers.ModelSerializer):
    sections = ICourseSectionSerializer(many=True, required=False)
    authors = IAuthorSerializer(many=True, required=False)
    is_unlocked = serializers.SerializerMethodField()
    is_completed = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()
    user_rating = serializers.SerializerMethodField()

    class Meta:
        model = ICourse
        fields = '__all__'

    def get_is_unlocked(self, obj):
        user = self.context.get('request').user
        if not user.is_authenticated:
            return False
        return UserCourseProgress.objects.filter(user=user, course=obj, is_unlocked=True).exists()

    def get_is_completed(self, obj):
        user = self.context.get('request').user
        if not user.is_authenticated:
            return False
        return UserCourseProgress.objects.filter(user=user, course=obj, is_completed=True).exists()

    def get_progress(self, obj):
        user = self.context.get('request').user
        if not user.is_authenticated:
            return 0

        try:
            progress = UserCourseProgress.objects.get(user=user, course=obj)
            return progress.progress
        except UserCourseProgress.DoesNotExist:
            return 0

    def create(self, validated_data):
        authors_data = validated_data.pop('authors', [])
        sections_data = validated_data.pop('sections', [])

        course = ICourse.objects.create(**validated_data)

        for author_data in authors_data:
            author = IAuthor.objects.create(**author_data)
            course.authors.add(author)

        for section_data in sections_data:
            section_data["course"] = course
            ICourseSectionSerializer().create(validated_data=section_data)
        return course

    def update(self, instance, validated_data):
        authors_data = validated_data.pop('authors', None)
        sections_data = validated_data.pop('sections', None)

        instance = super().update(instance, validated_data)

        if authors_data is not None:
            instance.authors.all().delete()
            for author_data in authors_data:
                author = IAuthor.objects.create(**author_data)
                instance.authors.add(author)

        if sections_data is not None:
            instance.sections.all().delete()

            for section_data in sections_data:
                section_data["course"] = instance
                ICourseSectionSerializer().create(validated_data=section_data)

        return instance
    
    def get_user_rating(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            rating = obj.ratings.filter(user=user).first()
            if rating:
                return rating.rating
        return None