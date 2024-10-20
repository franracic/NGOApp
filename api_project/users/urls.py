from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, IGroupViewSet, IActivityViewSet, ValidateEmailView, LoginView, RegisterView, MeView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', IGroupViewSet)
router.register(r'activities', IActivityViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('validate-email/', ValidateEmailView.as_view(), name='validate-email'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MeView.as_view(), name='me'),
]
