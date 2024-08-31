from rest_framework import serializers

from mainapp.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ("id", "first_name", "last_name", "username", "password", "province", "city", "school", "birth_date",
                  "phone_number", "last_login", "is_active", "is_staff", "is_superuser", "date_joined")

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = super().create(validated_data)
        user.password = password
        user.save()
        return user
