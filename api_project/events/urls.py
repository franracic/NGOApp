from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IEventViewSet

router = DefaultRouter()
router.register(r'events', IEventViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
