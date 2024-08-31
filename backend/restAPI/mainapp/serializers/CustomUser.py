from rest_framework import serializers

from mainapp.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ("id","first_name","last_name","username","password","province","city","school","birth_date",)

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = super().create(validated_data)
        user.password = password
        user.save()
        return user
    
id: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  province: string;
  city: string;
  school: string;
  birth_date: string;
  phone_number: string;
  last_login: string;
  is_active: boolean;
  is_staff: boolean;
  is_superUser: boolean;
  date_jointed: string;
