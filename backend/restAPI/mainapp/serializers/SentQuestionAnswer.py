from rest_framework import serializers

from mainapp.models import SentQuestionAnswer, Group


class SentQuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentQuestionAnswer
        fields = "__all__"

    def create(self, validated_data):
        group_id = validated_data.pop("group_id")
        group = Group.objects.get(id = group_id)
        sent_question_answer = super().create(validated_data)
        sent_question_answer.group = group
        sent_question_answer.save()
        return sent_question_answer
