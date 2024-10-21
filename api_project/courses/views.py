from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from courses.permissions import IsAdminUserOrReadOnly, IsContentAccessible, IsCourseUnlocked, IsSectionAccessible
from .models import (
    ICourse,
    ICourseContent,
    ICourseSection,
    IAuthor,
    UserCourseProgress,
    UserCourseContentProgress,
)
from .serializers import (
    ICourseSerializer,
    ICourseContentSerializer,
    ICourseSectionSerializer,
    IAuthorSerializer,
)
from rest_framework.permissions import IsAuthenticated

ROLE_HIERARCHY = ['worker', 'practitioner', 'mentor','admin']

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
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly, IsCourseUnlocked]

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
        
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        user = request.user
        if not user.is_authenticated:
            return Response({'detail': 'Authentication required.'}, status=401)
        try:
            course = ICourse.objects.get(pk=pk)
            progress, created = UserCourseProgress.objects.get_or_create(user=user, course=course)
            progress.is_completed = True
            progress.progress = 100
            progress.save()

            next_course = ICourse.objects.filter(id__gt=course.id).order_by('id').first()
            if next_course:
                next_progress, created = UserCourseProgress.objects.get_or_create(user=user, course=next_course)
                if not next_progress.is_unlocked:
                    next_progress.is_unlocked = True
                    next_progress.save()

            return Response({'detail': 'Course marked as completed.'})
        except ICourse.DoesNotExist:
            return Response({'detail': 'Course not found.'}, status=404)




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