from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Attraction, DigitalArtifact, TeamMember, GovernorProfile
from .serializers import AttractionSerializer, DigitalArtifactSerializer, TeamMemberSerializer, GovernorProfileSerializer
from .ai_planner import generate_itinerary

class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer

    @action(detail=False, methods=['post'])
    def generate_plan(self, request):
        days = int(request.data.get('days', 3))
        budget = request.data.get('budget', 'medium') # low, medium, high
        interests = request.data.get('interests', []) # list of types

        result = generate_itinerary(days, budget, interests)
        return Response(result)

class DigitalArtifactViewSet(viewsets.ModelViewSet):
    queryset = DigitalArtifact.objects.all()
    serializer_class = DigitalArtifactSerializer

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

class GovernorProfileViewSet(viewsets.ModelViewSet):
    queryset = GovernorProfile.objects.all()
    serializer_class = GovernorProfileSerializer
    
    # Optional context: if you want to ensure the singleton exists,
    # you could override list, but the model has a load() method 
    # and we can rely on data seeding or manual creation for now.
    # But to be safe, let's override get_object or ensure seed.
    # Actually, a simple ModelViewSet is fine, frontend will fetch list[0].

import os
import google.generativeai as genai
from rest_framework.views import APIView
from django.db.models import Q
from hospitality.models import Hotel
from marketplace.models import Product

class ChatAPIView(APIView):
    def post(self, request):
        try:
            user_message = request.data.get('message', '')
            
            # 1. Setup Gemini
            api_key = os.environ.get('GEMINI_API_KEY')
            if not api_key:
                return Response({'error': 'API Key not found'}, status=500)
            
            genai.configure(api_key=api_key)
            
            # Use the current available model
            model = genai.GenerativeModel('gemini-flash-latest')

            # 2. RAG: Search Database
            context_results = []
            attractions = Attraction.objects.filter(
                Q(name__icontains=user_message) | Q(description__icontains=user_message)
            )[:2]
            for item in attractions:
                context_results.append(f"Place: {item.name} - {item.description[:150]}")

            hotels = Hotel.objects.filter(
                Q(name__icontains=user_message) | Q(description__icontains=user_message)
            )[:2]
            for item in hotels:
                context_results.append(f"Hotel: {item.name} - {item.description[:150]}")

            context_str = "\n".join(context_results) if context_results else "No specific database data."

            # 3. Generate Content
            prompt = (
                f"System: You are '3m Sa3ed', a helpful guide for New Valley Egypt. "
                f"Context: {context_str}. "
                f"Question: {user_message}. "
                f"Answer nicely and concisely."
            )
            
            response = model.generate_content(prompt)
            
            # Return text safely
            return Response({'response': response.text}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
