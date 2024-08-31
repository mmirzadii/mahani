from rest_framework import viewsets

from mainapp.models import SentQuestionAnswer
from mainapp.serializers import SentQuestionAnswerSerializer


class SentQuestionAnswerViewSet(viewsets.ModelViewSet):
    queryset = SentQuestionAnswer.objects.all()
    http_method_name = ("post","get","put","delete")
    search_fields = ("user", 'id','assignment')
    ordering_fields = "__all__"

    def get_queryset(self):
        question_id = self.kwargs.get("question_id")
        try:
            question = SentQuestionAnswer.objects.get(id=question_id)
        except:
            raise ValueError("question is not found")
        return SentQuestionAnswer.objects.filter(question=question)

    def get_serializer_class(self):
        return SentQuestionAnswerSerializer
