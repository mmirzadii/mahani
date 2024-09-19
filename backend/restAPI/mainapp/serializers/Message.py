from rest_framework import serializers

from mainapp.models import Message
from mainapp.serializers import CustomUserSerializer


class MessageSerializer(serializers.ModelSerializer):
    sender = CustomUserSerializer()

    class Meta:
        model = Message
        fields = "__all__"


class CreateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
