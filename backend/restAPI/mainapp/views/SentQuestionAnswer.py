from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mainapp.models import SentQuestionAnswer
from mainapp.serializers import SentQuestionAnswerSerializer
from mainapp.permissions import ISGroupManager


class SentQuestionAnswerViewSet(viewsets.ModelViewSet):
    queryset = SentQuestionAnswer.objects.all()
    http_method_names = ("post", "get", "put", "delete")
    search_fields = ("user", 'id', 'assignment')
    ordering_fields = "__all__"

    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        if self.action == "set_score":
            permission_classes.append(ISGroupManager)
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        question_id = self.kwargs.get("question_id")
        try:
            question = SentQuestionAnswer.objects.get(id=question_id)
        except SentQuestionAnswer.DoesNotExist:
            raise ValueError("Question is not found")
        return SentQuestionAnswer.objects.filter(question=question)

    def get_serializer_class(self):
        return SentQuestionAnswerSerializer

    @action(detail=True, methods=["post"])
    def set_score(self, request, pk=None):
        score = request.data.get("score")
        if score is None:
            return Response({"error": "Score is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            question_answer = SentQuestionAnswer.objects.get(id=pk)
        except SentQuestionAnswer.DoesNotExist:
            return Response({"error": "ID is invalid"}, status=status.HTTP_404_NOT_FOUND)

        question_answer.score = score
        question_answer.save()

        # Optionally, you could serialize and return the updated instance
        serializer = SentQuestionAnswerSerializer(question_answer)
        return Response(serializer.data, status=status.HTTP_200_OK)
