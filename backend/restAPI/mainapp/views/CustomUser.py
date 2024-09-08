from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from mainapp.models.CustomUser import CustomUser
from mainapp.serializers import CustomUserSerializer, DetailedCustomUserSerializer, CreateCustomUserSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    http_method_name = ("post", "get", "patch", "delete")
    search_fields = ("username", 'id', 'phone_number')
    ordering_fields = "__all__"

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'partial_update':
            return CreateCustomUserSerializer
        if self.request.user.is_staff:
            return DetailedCustomUserSerializer

        return CustomUserSerializer

    def get_permissions(self):
        # Allow any user to create a new student (POST), require authentication for other actions
        if self.action == 'create' or self.action == 'partial_update':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def partial_update(self, request, *args, **kwargs):
        # Ensure that the current user is the one being updated
        user = request.user
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
