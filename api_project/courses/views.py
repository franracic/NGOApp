from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from users.permissions import IsAdmin, IsMentor, IsPractitioner
from .models import ICourse, ICourseContent, ICourseSection, IAuthor
from .serializers import (
    ICourseSerializer,
    ICourseContentSerializer,
    ICourseSectionSerializer,
    IAuthorSerializer,
)
from rest_framework.permissions import IsAuthenticated

class ICourseViewSet(viewsets.ModelViewSet):
    queryset = ICourse.objects.all()
    serializer_class = ICourseSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['isUnlocked', 'type']
    search_fields = ['title', 'description']
    ordering_fields = ['average_rating', 'total_duration']

    def get_queryset(self):
        user = self.request.user

        if user.role == user.ADMIN:
            return ICourse.objects.all()
        elif user.role == user.MENTOR:
            return ICourse.objects.all()
        elif user.role == user.PRACTITIONER:
            return ICourse.objects.filter(course__in = ["Worker", "Practitioner"])
        elif user.role == user.WORKER:
            return ICourse.objects.filter(course = "Worker")
        else:
            return ICourse.objects.none()


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

    def get_queryset(self):
        course_id = self.kwargs.get('course_pk')
        if course_id:
            return ICourseSection.objects.filter(course__id=course_id)
        return ICourseSection.objects.all()
    
    def perform_create(self, serializer):
        course = ICourse.objects.get(id=self.kwargs['course_pk'])
        serializer.save(course=course)