from rest_framework import serializers
from .models import IEvent

class IEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = IEvent
        fields = '__all__'
