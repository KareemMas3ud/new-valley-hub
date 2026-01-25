from rest_framework import serializers
from .models import Attraction, DigitalArtifact

class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = '__all__'

class DigitalArtifactSerializer(serializers.ModelSerializer):
    class Meta:
        model = DigitalArtifact
        fields = '__all__'
