from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from courses.permissions import IsAdminUserOrReadOnly, IsCourseUnlocked, IsSectionAccessible
from .models import ICourse, ICourseContent, ICourseSection, IAuthor, UserCourseProgress
from .serializers import (
    ICourseSerializer,
    ICourseContentSerializer,
    ICourseSectionSerializer,
    IAuthorSerializer,
    UserCourseProgressSerializer,
)

from rest_framework.permissions import IsAuthenticated

class LectureViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ICourseSerializer
    permission_classes = [IsAuthenticated, IsCourseUnlocked]

    def get_queryset(self):
        user = self.request.user
        return ICourse.objects.filter(
            type='Lecture', user_progress__user=user, user_progress__is_unlocked=True
        )

    def get_object(self):
        obj = super().get_object()
        self.check_object_permissions(self.request, obj)
        return obj

class WorkshopViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ICourseSerializer
    permission_classes = [IsAuthenticated, IsCourseUnlocked]

    def get_queryset(self):
        user = self.request.user
        return ICourse.objects.filter(
            type='Workshop', user_progress__user=user, user_progress__is_unlocked=True
        )

    def get_object(self):
        obj = super().get_object()
        self.check_object_permissions(self.request, obj)
        return obj

class ExamViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ICourseSerializer
    permission_classes = [IsAuthenticated, IsCourseUnlocked]

    def get_queryset(self):
        user = self.request.user
        return ICourse.objects.filter(
            type='Exam', user_progress__user=user, user_progress__is_unlocked=True
        )

    def get_object(self):
        obj = super().get_object()
        self.check_object_permissions(self.request, obj)
        return obj


class ICourseViewSet(viewsets.ModelViewSet):
    queryset = ICourse.objects.all()
    serializer_class = ICourseSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['type']
    search_fields = ['title', 'description']
    ordering_fields = ['average_rating', 'total_duration']
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly]

    def get_queryset(self):
        user = self.request.user

        if user.is_authenticated:
            if user.role == user.ADMIN:
                courses = ICourse.objects.all()
            elif user.role == user.MENTOR:
                courses = ICourse.objects.all()
            elif user.role == user.PRACTITIONER:
                courses = ICourse.objects.filter(course__in=["Worker", "Practitioner"])
            elif user.role == user.WORKER:
                courses = ICourse.objects.filter(course="Worker")
            else:
                courses = ICourse.objects.none()

            return courses
        else:
            return ICourse.objects.none()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    @action(detail=False, methods=['get'])
    def lectures(self, request):
        queryset = self.get_queryset().filter(type='Lecture')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def workshops(self, request):
        queryset = self.get_queryset().filter(type__in=['Workshop', 'Exam'])
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

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