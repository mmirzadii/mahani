from rest_framework import serializers

from mainapp.models import CustomUser


class CreateCustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ("id", "first_name", "last_name", "username", "password", "province", "city", "school", "birth_date",
                  "phone_number", "last_login", "is_active", "is_staff", "is_superuser", "date_joined")

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "first_name", "last_name", "username", "province", "city", "school", "birth_date",
                  "last_login")


class DetailedCustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "first_name", "last_name", "username", "province", "city", "school", "birth_date",
                  "phone_number", "last_login", "is_active", "is_staff", "is_superuser", "date_joined")
