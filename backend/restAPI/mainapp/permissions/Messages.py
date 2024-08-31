from rest_framework import permissions

from mainapp.models import CustomUser, Event


class IsEventMember(permissions.BasePermission):
    def has_permission(self, request, view):
        event_id = view.kwargs.get("event_id")
        if not event_id:
            return False
        try:
            event = Event.objects.get(id=event_id)
        except:
            return False
        if not request.user.is_authenticated:
            return False
        try:
            student = CustomUser.objects.get(user=request.user)
        except:
            return False

        return student in event.managers.all() or student in event.students.all()

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class IsEventManager(permissions.BasePermission):
    def has_permission(self, request, view):
        event_id = view.kwargs.get("event_id")
        if not event_id:
            return False
        try:
            event = Event.objects.get(id=event_id)
        except:
            return False

        if not request.user.is_authenticated:
            return False
        try:
            student = CustomUser.objects.get(user=request.user)
        except:
            return False

        return student in event.managers.all()

    def has_object_permission(self, request, view, obj):
        return True
