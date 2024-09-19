from rest_framework import viewsets

from mainapp.models import Assignment,Question

from mainapp.serializers import QuestionSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    http_method_name = ("post", "get", "put", "delete")
    search_fields = ("id", "assignment")
    ordering_fields = "__all__"

    def get_queryset(self):
        assignment_id = self.request.query_params.get('assignment')
        try:
            assignment = Assignment.objects.get(id=assignment_id)
        except:
            raise ValueError("assignment does not exits")
        return Question.objects.filter(assignment=assignment)

    def get_serializer_class(self):
        return QuestionSerializer
