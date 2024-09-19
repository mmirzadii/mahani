from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from mainapp.models import Assignment
from mainapp.models.Message import Message
from mainapp.serializers import MessageSerializer
from mainapp.serializers.Message import CreateMessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    http_method_name = ("post", "get", "put", "delete")
    search_fields = ("id", "content", "user")
    ordering_fields = "__all__"

    def get_queryset(self):
        assignment_id = self.request.query_params.get("assignment")
        try:
            assignment = Assignment.objects.get(id=assignment_id)
        except:
            raise ValueError("assignment does not exits")
        return Message.objects.filter(assignment=assignment)

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateMessageSerializer
        return MessageSerializer
