from rest_framework import serializers

from mainapp.models import Question
from mainapp.serializers.SentQuestionAnswer import SentQuestionAnswerSerializer


class QuestionSerializer(serializers.ModelSerializer):
    sentAssignments = (SentQuestionAnswerSerializer
                       (many=True,required=False))

    class Meta:
        model = Question
        fields = "__all__"
