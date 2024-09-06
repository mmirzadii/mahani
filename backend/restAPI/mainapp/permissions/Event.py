from rest_framework import permissions

from mainapp.models import CustomUser, Event, SentQuestionAnswer, Group


class ISGroupManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj: Group):
        return request.user == obj.manager


class IsGroupMember(permissions.BasePermission):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj: Group):
        return request.user in obj.members


class IsEventParticipant(permissions.BasePermission):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj: Event):
        user = request.user
        if user.is_superuser:
            return True
        if user == obj.host:
            return True
        for group in obj._groups.all():
            if user in group.members or user == obj.host:
                return True
        return False
