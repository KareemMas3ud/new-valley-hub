from rest_framework import serializers
from .models import Service, ServiceCategory


class ServiceCategorySerializer(serializers.ModelSerializer):
    """Serializer for subcategories"""
    service_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'slug', 'icon', 'order', 'description', 'service_count']
    
    def get_service_count(self, obj):
        return obj.services.count()


class ServiceCategoryHierarchicalSerializer(serializers.ModelSerializer):
    """Serializer for parent categories with nested subcategories"""
    subcategories = ServiceCategorySerializer(many=True, read_only=True)
    total_services = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'slug', 'icon', 'order', 'description', 'subcategories', 'total_services']
    
    def get_total_services(self, obj):
        """Get total services across all subcategories"""
        return obj.get_all_services().count()


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    parent_category = serializers.SerializerMethodField()
    full_category_path = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = [
            'id', 'name', 'description', 'category', 'category_name', 
            'category_slug', 'parent_category', 'full_category_path',
            'phone_number', 'website', 'email', 'address', 
            'latitude', 'longitude', 'is_emergency', 'is_24_hours',
            'opening_time', 'closing_time', 'image', 'created_at', 'updated_at'
        ]
    
    def get_parent_category(self, obj):
        """Get the parent category info"""
        if obj.category.parent:
            return {
                'id': obj.category.parent.id,
                'name': obj.category.parent.name,
                'slug': obj.category.parent.slug
            }
        return None
    
    def get_full_category_path(self, obj):
        """Get full category path as string"""
        return obj.get_full_category_path()
