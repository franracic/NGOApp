from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ICourseViewSet,
    IAuthorViewSet,
    ICourseContentViewSet,
    ICourseSectionViewSet,
    LectureViewSet,
    WorkshopViewSet,
    ExamViewSet,
)

router = DefaultRouter()
router.register(r'courses', ICourseViewSet)
router.register(r'authors', IAuthorViewSet)
router.register(r'course-contents', ICourseContentViewSet)
router.register(r'lectures', LectureViewSet, basename='lecture')
router.register(r'exams', ExamViewSet, basename='exam')
router.register(r'workshops', WorkshopViewSet, basename='workshop')

course_section_list = ICourseSectionViewSet.as_view({'get': 'list', 'post': 'create'})

urlpatterns = [
    path('', include(router.urls)),
    path('courses/<int:course_pk>/sections/', course_section_list, name='course-sections-list'),
]
