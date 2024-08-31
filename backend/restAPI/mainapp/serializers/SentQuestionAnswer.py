from rest_framework import serializers

from mainapp.models import SentQuestionAnswer


class SentQuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentQuestionAnswer
        fields = "__all__"

