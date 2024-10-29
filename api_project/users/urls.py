from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ConnectionRequestViewSet, UserViewSet, IGroupViewSet, IActivityViewSet, ValidateEmailView, LoginView, RegisterView, MeView, ConnectionViewSet, MessageViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', IGroupViewSet)
router.register(r'activities', IActivityViewSet)
router.register(r'connection-requests', ConnectionRequestViewSet, basename='connection-request')
router.register(r'connections', ConnectionViewSet, basename='connection')
router.register(r'messages', MessageViewSet, basename='message')

urlpatterns = [
    path('', include(router.urls)),
    path('validate-email/', ValidateEmailView.as_view(), name='validate-email'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MeView.as_view(), name='me'),
]
