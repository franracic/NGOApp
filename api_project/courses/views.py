from rest_framework import viewsets, filters, status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from courses.permissions import IsAdminUserOrReadOnly, IsContentAccessible, IsCourseUnlocked, IsSectionAccessible
from .models import (
    IComment,
    ICourse,
    ICourseContent,
    ICourseSection,
    IAuthor,
    IUploadContent,
    UserCourseProgress,
    UserCourseContentProgress,
    CourseRating
)
from .serializers import (
    CommentSerializer,
    ICourseSerializer,
    ICourseContentSerializer,
    ICourseSectionSerializer,
    IAuthorSerializer,
    IUploadContentSerializer,
)
from rest_framework.permissions import IsAuthenticated
from django.db.models import Avg

from courses import serializers

ROLE_HIERARCHY = ['beginner','worker', 'practitioner', 'mentor','admin']

def get_next_role(current_role):
    try:
        if current_role in ['mentor','admin']:
            return None
        index = ROLE_HIERARCHY.index(current_role)
        return ROLE_HIERARCHY[index + 1]
    except (ValueError, IndexError):
        return None

def get_roles_accessible(user_role):
    try:
        index = ROLE_HIERARCHY.index(user_role)
        return ROLE_HIERARCHY[:index + 1]
    except ValueError:
        return None

class LectureViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ICourseSerializer
    permission_classes = [IsAuthenticated, IsCourseUnlocked]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            accessible_roles = get_roles_accessible(user.role)
            return ICourse.objects.filter(
                type='Lecture',
                course__in=accessible_roles
            ).prefetch_related(
                'sections__contents',
                'sections__contents__user_progress',
            ).distinct()
        else:
            return ICourse.objects.none()

class WorkshopViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ICourseSerializer
    permission_classes = [IsAuthenticated, IsCourseUnlocked]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            accessible_roles = get_roles_accessible(user.role)
            return ICourse.objects.filter(type='Workshop', course__in=accessible_roles).prefetch_related(
                'sections__contents',
                'sections__contents__user_progress',
            ).distinct()
        else:
            return ICourse.objects.none()
        
class ExamViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ICourseSerializer
    permission_classes = [IsAuthenticated, IsCourseUnlocked]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            accessible_roles = get_roles_accessible(user.role)
            return ICourse.objects.filter(type='Exam', course__in=accessible_roles).prefetch_related(
                'sections__contents',
                'sections__contents__user_progress',
            ).distinct()
        else:
            return ICourse.objects.none()


class ICourseViewSet(viewsets.ModelViewSet):
    queryset = ICourse.objects.all()
    serializer_class = ICourseSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['type']
    search_fields = ['title', 'description']
    ordering_fields = ['average_rating', 'total_duration']
    permission_classes = [IsAuthenticated, IsCourseUnlocked]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            accessible_roles = get_roles_accessible(user.role)
            return ICourse.objects.filter(course__in=accessible_roles).prefetch_related(
                'sections__contents',
                'sections__contents__user_progress',
            ).distinct()
        else:
            return ICourse.objects.none()

    @action(detail=True, methods=['get'])
    def unlock(self, request, pk=None):
        user = request.user
        if not user.is_authenticated:
            return Response({'detail': 'Authentication required.'}, status=401)
        try:
            course = ICourse.objects.get(pk=pk)
            progress, created = UserCourseProgress.objects.get_or_create(user=user, course=course)
            if not progress.is_unlocked:
                progress.is_unlocked = True
                progress.save()
            return Response({'detail': 'Course unlocked.'})
        except ICourse.DoesNotExist:
            return Response({'detail': 'Course not found.'}, status=404)
        
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def rate(self, request, pk=None):
        user = request.user
        course = self.get_object()
        rating_value = request.data.get('rating')

        try:
            rating_value = int(rating_value)
            if rating_value < 1 or rating_value > 5:
                raise ValueError()
        except (TypeError, ValueError):
            return Response({'detail': 'Invalid rating value. Must be an integer between 1 and 5.'}, status=400)

        course_rating, created = CourseRating.objects.update_or_create(
            user=user,
            course=course,
            defaults={'rating': rating_value}
        )

        average = CourseRating.objects.filter(course=course).aggregate(Avg('rating'))['rating__avg']
        course.average_rating = average
        course.no_of_ratings = CourseRating.objects.filter(course=course).count()
        course.save()

        return Response({'detail': 'Rating submitted successfully.', 'average_rating': average})

class IAuthorViewSet(viewsets.ModelViewSet):
    queryset = IAuthor.objects.all()
    serializer_class = IAuthorSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name']
    search_fields = ['name', 'description']
    ordering_fields = ['name']

class ICourseContentViewSet(viewsets.ModelViewSet):
    queryset = ICourseContent.objects.all()
    serializer_class = ICourseContentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['type']
    search_fields = ['title']
    ordering_fields = ['title']

    permission_classes = [IsAuthenticated, IsContentAccessible]

    def get_queryset(self):
        return ICourseContent.objects.all().select_related().prefetch_related(
            'quiz_questions__content',
            'form_fields__content',
            'poll_question__options',
            'survey_questions__content',
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        course_content = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            self.get_serializer(course_content).data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        course_content = serializer.save()

        return Response(self.get_serializer(course_content).data)

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        user = request.user
        content = self.get_object()

        courses = ICourse.objects.filter(sections__contents=content).distinct()

        user_courses = UserCourseProgress.objects.filter(user=user, course__in=courses, is_unlocked=True)

        if not user_courses.exists():
            return Response({'detail': 'You do not have access to this content.'}, status=403)

        progress, created = UserCourseContentProgress.objects.get_or_create(user=user, content=content)
        if progress.is_completed:
            return Response({'detail': 'Content already completed.'})
        progress.is_completed = True
        progress.save()

        for course in courses:
            all_contents = ICourseContent.objects.filter(sections__course=course).distinct()
            total_contents = all_contents.count()

            completed_contents = all_contents.filter(
                user_progress__user=user,
                user_progress__is_completed=True
            ).count()

            progress_percentage = (completed_contents / total_contents) * 100

            course_progress, created = UserCourseProgress.objects.get_or_create(user=user, course=course)
            course_progress.progress = round(progress_percentage)
            course_progress.save()
            if completed_contents == all_contents.count():
                course_progress, created = UserCourseProgress.objects.get_or_create(user=user, course=course)
                if not course_progress.is_completed:
                    course_progress.is_completed = True
                    course_progress.progress = 100
                    course_progress.save()

                    user.completed_courses_count += 1
                    user.save()

                    courses_in_role = ICourse.objects.filter(course=user.role)
                    incomplete_courses = courses_in_role.exclude(
                        user_progress__user=user,
                        user_progress__is_completed=True
                    )
                    if not incomplete_courses.exists():
                        next_role = get_next_role(user.role)
                        if next_role:
                            user.role = next_role
                            user.save()

                            initial_courses = ICourse.objects.filter(course=next_role).order_by('order')[:3]
                            for c in initial_courses:
                                progress, created = UserCourseProgress.objects.get_or_create(user=user, course=c)
                                if not progress.is_unlocked:
                                    progress.is_unlocked = True
                                    progress.save()
                    else:
                        next_course = incomplete_courses.first()
                        print("next_course",next_course)
                        if next_course:
                            next_progress, created = UserCourseProgress.objects.get_or_create(user=user, course=next_course)
                            if not next_progress.is_unlocked:
                                next_progress.is_unlocked = True
                                next_progress.save()

        return Response({'detail': 'Content marked as completed.'})

class ICourseSectionViewSet(viewsets.ModelViewSet):
    queryset = ICourseSection.objects.all()
    serializer_class = ICourseSectionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['title']
    search_fields = ['title']
    ordering_fields = ['title']

    permission_classes = [IsAuthenticated, IsSectionAccessible]

    def get_queryset(self):
        course_id = self.kwargs.get('course_pk')
        if course_id:
            return ICourseSection.objects.filter(course__id=course_id)
        return ICourseSection.objects.all()
    
    def perform_create(self, serializer):
        course = ICourse.objects.get(id=self.kwargs['course_pk'])
        serializer.save(course=course)

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.method == 'GET':
            return IComment.objects.filter(parent__isnull=True).order_by('-timestamp')
        else:
            return IComment.objects.all()

    def perform_create(self, serializer):
        parent_id = self.request.data.get('parent_id')
        course_id = self.request.data.get('course_id')
        parent = None
        course = None

        if parent_id:
            parent = get_object_or_404(IComment, id=parent_id)
            course = parent.courses.first()
            if not course:
                raise serializers.ValidationError("Parent comment is not associated with any course.")
        else:
            if not course_id:
                raise serializers.ValidationError("Course ID is required for top-level comments.")
            course = get_object_or_404(ICourse, id=course_id)

        serializer.save(user=self.request.user, parent=parent, courses=[course])
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def like(self, request, pk=None):
        comment = self.get_object()
        user = request.user
        if user in comment.likes.all():
            comment.likes.remove(user)
            return Response({'status': 'unliked'}, status=status.HTTP_200_OK)
        else:
            comment.likes.add(user)
            return Response({'status': 'liked'}, status=status.HTTP_200_OK)
        
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def reply(self, request, pk=None):
        parent_comment = self.get_object()
        content = request.data.get('content')
        user = request.user

        if not content:
            return Response({'error': 'Reply content is required'}, status=status.HTTP_400_BAD_REQUEST)

        reply_comment = IComment.objects.create(
            content=content,
            user=user,
            parent=parent_comment
        )
        
        serializer = CommentSerializer(reply_comment, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        comment = self.get_object()
        if comment.user != request.user:
            return Response({'error': 'You can only edit your own comments'}, status=status.HTTP_403_FORBIDDEN)

        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()
        if comment.user != request.user:
            return Response({'error': 'You can only delete your own comments'}, status=status.HTTP_403_FORBIDDEN)

        return super().destroy(request, *args, **kwargs)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def get_multiple(self, request):
        ids = request.data.get('ids', [])
        if not ids:
            return Response([], status=status.HTTP_200_OK)

        comments = self.get_queryset().filter(parent__isnull=True, id__in=ids).order_by('-timestamp')
        if not comments.exists():
            return Response({'detail': 'Comments not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class IUploadContentViewSet(viewsets.ModelViewSet):
    serializer_class = IUploadContentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return IUploadContent.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)