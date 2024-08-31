from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from mainapp.models import Event
from mainapp.permissions.Messages import IsEventManager
from mainapp.serializers import EventSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    http_method_name = ("post", "get", "put", "delete")
    search_fields = ("id", "username", 'host')
    ordering_fields = "__all__"

    def get_serializer_class(self):
        return EventSerializer



    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        if self.action == 'partial_update':
            permission_classes.append(IsEventManager)
        else:
            permission_classes.append(IsAdminUser)
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)