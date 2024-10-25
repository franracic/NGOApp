from rest_framework import permissions

class IsBeginner(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'beginner'

class IsWorker(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'worker'

class IsMentor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'mentor'

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'admin'

class IsPractitioner(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'practitioner'
