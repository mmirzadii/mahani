from rest_framework import serializers
from mainapp.models import Assignment


class AssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assignment
        fields = "__all__"
