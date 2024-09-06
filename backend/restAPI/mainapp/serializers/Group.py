from rest_framework import serializers
from mainapp.models import Group, CustomUser, Event


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class CreateGroupSerializer(serializers.ModelSerializer):
    manager = serializers.CharField()
    members = serializers.ListField(child=serializers.CharField(), write_only=True)
    members_list = serializers.SerializerMethodField()
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())

    class Meta:
        model = Group
        fields = ['name', 'manager', 'members', 'members_list', 'event']

    def validate_manager(self, value):
        try:
            return CustomUser.objects.get(phone_number=value)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Manager with this phone number does not exist.")

    def validate_members(self, values):
        members = []
        for phone_number in values:
            try:
                members.append(CustomUser.objects.get(phone_number=phone_number))
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError(f"Member with phone number {phone_number} does not exist.")
        return members

    def get_members_list(self, obj):
        return [member.phone_number for member in obj.members.all()]
