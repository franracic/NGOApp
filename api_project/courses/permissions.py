from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import UserCourseProgress

class IsCourseUnlocked(BasePermission):

    message = 'You do not have access to this course.'

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user.is_authenticated:
            return False
        try:
            progress = UserCourseProgress.objects.get(user=user, course=obj)
            return progress.is_unlocked
        except UserCourseProgress.DoesNotExist:
            return False

class IsSectionAccessible(BasePermission):

    message = 'You do not have access to this course section.'

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user.is_authenticated:
            return False
        course = obj.course
        try:
            progress = UserCourseProgress.objects.get(user=user, course=course)
            return progress.is_unlocked
        except UserCourseProgress.DoesNotExist:
            return False

class IsAdminUserOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            (request.user and request.user.is_staff)
        )
