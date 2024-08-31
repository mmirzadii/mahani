from rest_framework import viewsets

from mainapp.models import Group, Event


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    http_method_name = ("post", "get", "put", "delete")
    search_fields = ("id", "assignment")
    ordering_fields = "__all__"

    def get_queryset(self):
        event_id = self.kwargs.get("event_id")
        try:
            event = Event.objects.get(id=event_id)
        except:
            raise ValueError("event does not found")
        return Group.objects.filter(event=event)
