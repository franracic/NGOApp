from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IResourceViewSet, IChallengeViewSet, ITrophyViewSet, IDiscussionViewSet

router = DefaultRouter()
router.register(r'resources', IResourceViewSet)
router.register(r'challenges', IChallengeViewSet)
router.register(r'trophies', ITrophyViewSet)
router.register(r'discussions', IDiscussionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
