from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import IResource, IChallenge, ITrophy, IDiscussion
from .serializers import (
    IResourceSerializer,
    IChallengeSerializer,
    ITrophySerializer,
    IDiscussionSerializer,
)
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from django.shortcuts import get_object_or_404

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


class IChallengeViewSet(viewsets.ModelViewSet):
    queryset = IChallenge.objects.all()
    serializer_class = IChallengeSerializer

class ITrophyViewSet(viewsets.ModelViewSet):
    queryset = ITrophy.objects.all()
    serializer_class = ITrophySerializer

class IDiscussionViewSet(viewsets.ModelViewSet):
    queryset = IDiscussion.objects.all()
    serializer_class = IDiscussionSerializer
