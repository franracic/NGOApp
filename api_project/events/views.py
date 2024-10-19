from rest_framework import viewsets
from .models import IEvent
from .serializers import IEventSerializer

class IEventViewSet(viewsets.ModelViewSet):
    queryset = IEvent.objects.all()
    serializer_class = IEventSerializer
