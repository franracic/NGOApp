from rest_framework import serializers
from .models import ICourse, ICourseContent, ICourseSection, IAuthor, UserCourseProgress
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

class ICourseContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ICourseContent
        fields = '__all__'

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

    class Meta:
        model = ICourse
        fields = '__all__'

    def get_is_unlocked(self, obj):
        user = self.context.get('request').user
        if not user.is_authenticated:
            return False
        try:
            progress = UserCourseProgress.objects.get(user=user, course=obj)
            return progress.is_unlocked
        except UserCourseProgress.DoesNotExist:
            return False

    def get_is_completed(self, obj):
        user = self.context.get('request').user
        if not user.is_authenticated:
            return False
        try:
            progress = UserCourseProgress.objects.get(user=user, course=obj)
            return progress.is_completed
        except UserCourseProgress.DoesNotExist:
            return False

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
