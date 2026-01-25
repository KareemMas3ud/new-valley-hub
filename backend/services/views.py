from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Service, ServiceCategory
from .serializers import ServiceSerializer, ServiceCategorySerializer, ServiceCategoryHierarchicalSerializer


class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    
    @action(detail=False, methods=['get'])
    def hierarchy(self, request):
        """Get hierarchical structure of all categories"""
        # Get only parent categories
        parents = ServiceCategory.objects.filter(parent=None).order_by('order')
        serializer = ServiceCategoryHierarchicalSerializer(parents, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def services(self, request, pk=None):
        """Get all services for a specific category (including subcategories if parent)"""
        category = self.get_object()
        services = category.get_all_services()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.select_related('category', 'category__parent').all()
    serializer_class = ServiceSerializer
    
    @action(detail=False, methods=['get'])
    def emergency(self, request):
        """Get all emergency services"""
        services = Service.objects.filter(is_emergency=True)
        serializer = self.get_serializer(services, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_parent_category(self, request):
        """Get services grouped by parent category"""
        parent_slug = request.query_params.get('parent', None)
        
        if parent_slug:
            try:
                parent = ServiceCategory.objects.get(slug=parent_slug, parent=None)
                services = parent.get_all_services()
            except ServiceCategory.DoesNotExist:
                return Response({"error": "Parent category not found"}, status=404)
        else:
            services = Service.objects.all()
        
        serializer = self.get_serializer(services, many=True)
        return Response(serializer.data)
