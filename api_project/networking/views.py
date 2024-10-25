from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import IResource, IDiscussion, TrophyTemplate
from .serializers import (
    IResourceSerializer,
    IDiscussionSerializer,
    TrophyTemplateSerializer,
    UserTrophySerializer,
)
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, permissions
from .models import Trophy, UserInput
from .serializers import UserInputSerializer

class IResourceViewSet(viewsets.ModelViewSet):
    queryset = IResource.objects.all()
    serializer_class = IResourceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticatedOrReadOnly])
    def like(self, request, pk=None):
        resource = self.get_object()
        user = request.user
        if user in resource.likes.all():
            resource.likes.remove(user)
            return Response({'status': 'resource unliked'})
        else:
            resource.likes.add(user)
            return Response({'status': 'resource liked'})

    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def increment_views(self, request, pk=None):
        resource = self.get_object()
        resource.views += 1
        resource.save()
        return Response({'status': 'views incremented', 'views': resource.views})
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def get_multiple(self, request):
        ids = request.data.get('ids', [])
        if not ids:
            return Response({'detail': 'No IDs provided.'}, status=status.HTTP_400_BAD_REQUEST)

        resources = IResource.objects.filter(id__in=ids)
        if not resources.exists():
            return Response({'detail': 'Resources not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(resources, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TrophyViewSet(viewsets.ModelViewSet):
    queryset = Trophy.objects.all()
    serializer_class = UserTrophySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Trophy.objects.filter(user=self.request.user)

class UserInputViewSet(viewsets.ModelViewSet):
    queryset = UserInput.objects.all()
    serializer_class = UserInputSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.method in permissions.SAFE_METHODS:
            return UserInput.objects.all()
        else:
            return UserInput.objects.filter(user=self.request.user)

class IDiscussionViewSet(viewsets.ModelViewSet):
    queryset = IDiscussion.objects.all()
    serializer_class = IDiscussionSerializer

class TrophyTemplateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TrophyTemplate.objects.all()
    serializer_class = TrophyTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def with_user_progress(self, request):
        user = request.user
        trophy_templates = TrophyTemplate.objects.all()
        user_trophies = {t.trophy_template_id: t for t in Trophy.objects.filter(user=user)}

        trophy_data = []
        for trophy_template in trophy_templates:
            user_trophy = user_trophies.get(trophy_template.id)
            trophy_info = {
                'id': trophy_template.id,
                'title': trophy_template.title,
                'description': trophy_template.description,
                'icon': trophy_template.icon,
                'trophy_type': trophy_template.trophy_type,
                'target_value': trophy_template.target_value,
                'difficulty': trophy_template.difficulty,
                'progress': user_trophy.progress if user_trophy else 0,
                'is_earned': user_trophy.is_earned if user_trophy else False,
            }
            trophy_data.append(trophy_info)

        return Response(trophy_data)