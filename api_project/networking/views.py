from rest_framework import viewsets
from .models import IResource, IChallenge, ITrophy, IDiscussion
from .serializers import (
    IResourceSerializer,
    IChallengeSerializer,
    ITrophySerializer,
    IDiscussionSerializer,
)

class IResourceViewSet(viewsets.ModelViewSet):
    queryset = IResource.objects.all()
    serializer_class = IResourceSerializer

class IChallengeViewSet(viewsets.ModelViewSet):
    queryset = IChallenge.objects.all()
    serializer_class = IChallengeSerializer

class ITrophyViewSet(viewsets.ModelViewSet):
    queryset = ITrophy.objects.all()
    serializer_class = ITrophySerializer

class IDiscussionViewSet(viewsets.ModelViewSet):
    queryset = IDiscussion.objects.all()
    serializer_class = IDiscussionSerializer
