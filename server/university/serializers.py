from rest_framework import serializers
from .models import University

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = [
            "pk",
            "name",
            "description",
            "city",
            "country",
            "latitude",
            "longtitude",
            "website"
        ]
        extra_kwargs = {
            "website": {"required": False}
        }