from rest_framework import viewsets

from mainapp.models import Assignment
from mainapp.serializers import AssignmentSerializer


class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    http_method_name = ("post", "get", "put", "delete")
    search_fields = ("id", 'event')
    ordering_fields = "__all__"

    def get_serializer_class(self):
        return AssignmentSerializer
