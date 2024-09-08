from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication

from mainapp.models import Group, Event
from mainapp.serializers.Group import GroupSerializer, CreateGroupSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    http_method_names = ("get","patch","post","delete")
    authentication_classes = [JWTAuthentication]
    def get_serializer_class(self):
        if self.action == 'create':
            return CreateGroupSerializer
        return GroupSerializer

    def get_queryset(self):
        event_id = self.request.query_params.get("event")

        if event_id is not None:
            try:
                event = Event.objects.get(id=event_id)
                return Group.objects.filter(event=event)
            except Event.DoesNotExist:
                raise serializers.ValidationError("The event with the provided ID does not exist.")
        return Group.objects.all()
