from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from mainapp.models import Event, CustomUser, Group
from mainapp.permissions.Event import IsEventParticipant
from mainapp.serializers import EventSerializer
from mainapp.serializers.Group import GroupSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    authentication_classes = [JWTAuthentication]
    http_method_name = ("post", "get", "put", "delete")
    search_fields = ("id", "username", 'host')
    ordering_fields = "__all__"

    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        if self.action != 'list' and self.action != 'retrieve':
            permission_classes.append(IsAdminUser)
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        return EventSerializer

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
