from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from mainapp.models import Assignment
from mainapp.models.Message import Message
from mainapp.permissions.Messages import IsEventMember, IsEventManager
from mainapp.serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    http_method_name = ("post", "get", "put", "delete")
    search_fields = ("id", "content", "user")
    ordering_fields = "__all__"

    def get_queryset(self):
        assignment_id = self.kwargs.get("assignment_id")
        try:
            assignment = Assignment.objects.get(id=assignment_id)
        except:
            raise ValueError("assignment does not exits")
        return Message.objects.filter(assignment=assignment)



    def get_permissions(self):
        permission_classes = [IsAuthenticated, IsEventMember]
        if self.request.action != "create":
            permission_classes.append(IsEventManager)
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        return MessageSerializer




