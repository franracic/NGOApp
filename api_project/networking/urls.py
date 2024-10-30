from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views import GroupMessageViewSet


from .views import IEventViewSet, IGroupViewSet, IResourceViewSet, IDiscussionViewSet, NotificationViewSet, TrophyViewSet, UserInputViewSet, TrophyTemplateViewSet

router = DefaultRouter()
router.register(r'resources', IResourceViewSet)
router.register(r'user-inputs', UserInputViewSet)
router.register(r'trophies', TrophyViewSet)
router.register(r'discussions', IDiscussionViewSet)
router.register(r'trophy-templates', TrophyTemplateViewSet)
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'groups', IGroupViewSet)
router.register(r'events', IEventViewSet)
router.register(r'group-messages', GroupMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
