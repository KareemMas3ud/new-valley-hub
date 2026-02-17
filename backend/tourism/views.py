from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import (
    Attraction,
    DigitalArtifact,
    MuseumArtifact,
    SouvenirAsset,
    TeamMember,
    GovernorProfile,
    SiteConfiguration
)
from .serializers import (
    AttractionSerializer,
    DigitalArtifactSerializer,
    MuseumArtifactSerializer,
    SouvenirAssetSerializer,
    TeamMemberSerializer,
    GovernorProfileSerializer
)
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


# ============================================
# VIRTUAL MUSEUM VIEWSET 🏛️
# ============================================

class MuseumArtifactViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Virtual Museum artifacts.
    Provides CRUD operations for 3D museum artifacts.
    """
    queryset = MuseumArtifact.objects.all()
    serializer_class = MuseumArtifactSerializer


# ============================================
# SOUVENIR MAKER VIEWSET 📸
# ============================================

class SouvenirAssetViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Souvenir Maker assets.
    Provides CRUD operations for backgrounds, stickers, and frames.
    """
    queryset = SouvenirAsset.objects.all()
    serializer_class = SouvenirAssetSerializer
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Filter assets by category (background, sticker, frame)"""
        category = request.query_params.get('category', None)
        if category:
            assets = SouvenirAsset.objects.filter(category=category)
            serializer = self.get_serializer(assets, many=True)
            return Response(serializer.data)
        return Response({'error': 'Category parameter required'}, status=status.HTTP_400_BAD_REQUEST)


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

class GovernorProfileViewSet(viewsets.ModelViewSet):
    queryset = GovernorProfile.objects.all()
    serializer_class = GovernorProfileSerializer

import os
import re
import google.generativeai as genai
from rest_framework.views import APIView
from django.db.models import Q
from hospitality.models import Hotel
from marketplace.models import Product

class ChatAPIView(APIView):
    def post(self, request):
        try:
            user_message = request.data.get('message', '')
            
            # 1. Setup Gemini - Check database first, fallback to environment variable
            site_config = SiteConfiguration.load()
            api_key = site_config.gemini_api_key if site_config.gemini_api_key else os.environ.get('GEMINI_API_KEY')
            
            if not api_key:
                return Response({
                    'error': 'API Key not configured. Please set it in Django Admin or environment variable.'
                }, status=500)
            
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
            
            # Add 30-second timeout to prevent hanging
            response = model.generate_content(prompt, request_options={'timeout': 30})
            
            # Safety check: ensure response has text before accessing
            if hasattr(response, 'text') and response.text:
                return Response({'response': response.text}, status=status.HTTP_200_OK)
            else:
                return Response({'response': 'Sorry, I cannot answer that question right now.'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SearchAPIView(APIView):
    """
    Global Search API - searches across Attractions, Hotels, and Products
    """
    def get(self, request):
        query = request.GET.get('q', '').strip()
        print(f"Search Request Received: {query}")
        
        if not query:
            return Response({'results': [], 'message': 'Please provide a search query'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Sanitize query to prevent SQL wildcard issues with % and _
        # These characters are treated as wildcards in Django's icontains (LIKE query)
        sanitized_query = query.replace('%', '\\%').replace('_', '\\_')
        
        results = []
        
        # Search Attractions
        attractions = Attraction.objects.filter(
            Q(name__icontains=sanitized_query) | Q(description__icontains=sanitized_query)
        )[:10]
        
        for attraction in attractions:
            # Build absolute URL for image
            image_url = None
            if attraction.image:
                if hasattr(attraction.image, 'url'):
                    image_url = request.build_absolute_uri(attraction.image.url)
                else:
                    # If it's already a string URL, make it absolute
                    image_url = request.build_absolute_uri(attraction.image)
            
            results.append({
                'type': 'attraction',
                'id': attraction.id,
                'name': attraction.name,
                'description': attraction.description[:150] + '...' if len(attraction.description) > 150 else attraction.description,
                'image': image_url,
                'category': attraction.attraction_type,
            })
        
        # Search Hotels
        hotels = Hotel.objects.filter(
            Q(name__icontains=sanitized_query) | Q(description__icontains=sanitized_query)
        )[:10]
        
        for hotel in hotels:
            # Build absolute URL for image
            image_url = None
            if hotel.image:
                if hasattr(hotel.image, 'url'):
                    image_url = request.build_absolute_uri(hotel.image.url)
                else:
                    # If it's already a string URL, make it absolute
                    image_url = request.build_absolute_uri(hotel.image)
            
            results.append({
                'type': 'hotel',
                'id': hotel.id,
                'name': hotel.name,
                'description': hotel.description[:150] + '...' if len(hotel.description) > 150 else hotel.description,
                'image': image_url,
                'rating': str(hotel.stars) if hotel.stars else None,
            })
        
        # Search Products
        products = Product.objects.filter(
            Q(name__icontains=sanitized_query) | Q(description__icontains=sanitized_query)
        )[:10]
        
        for product in products:
            # Build absolute URL for image
            image_url = None
            if product.image:
                if hasattr(product.image, 'url'):
                    image_url = request.build_absolute_uri(product.image.url)
                else:
                    # If it's already a string URL, make it absolute
                    image_url = request.build_absolute_uri(product.image)
            
            results.append({
                'type': 'product',
                'id': product.id,
                'name': product.name,
                'description': product.description[:150] + '...' if len(product.description) > 150 else product.description,
                'image': image_url,
                'price': str(product.price),
            })
        
        return Response({
            'results': results,
            'count': len(results),
            'query': query
        }, status=status.HTTP_200_OK)
