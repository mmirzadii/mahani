from rest_framework import serializers

from mainapp.models import Event
from mainapp.serializers import CustomUserSerializer


class EventSerializer(serializers.ModelSerializer):
    host = CustomUserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = "__all__"


