from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Attraction, DigitalArtifact
from .serializers import AttractionSerializer, DigitalArtifactSerializer
from .ai_planner import generate_itinerary

class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer

    @action(detail=False, methods=['post'])
    def generate_plan(self, request):
        days = int(request.data.get('days', 3))
        budget = request.data.get('budget', 'medium') # low, medium, high
        interests = request.data.get('interests', []) # list of types

        itinerary = generate_itinerary(days, budget, interests)
        return Response(itinerary)

class DigitalArtifactViewSet(viewsets.ModelViewSet):
    queryset = DigitalArtifact.objects.all()
    serializer_class = DigitalArtifactSerializer
