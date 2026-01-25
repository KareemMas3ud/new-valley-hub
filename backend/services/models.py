from django.db import models

class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)  # e.g., "Dining & Restaurants" or "Fine Dining"
    icon = models.ImageField(upload_to='service_icons/', blank=True)
    slug = models.SlugField(unique=True)
    
    # NEW: Hierarchical structure
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True, 
        related_name='subcategories',
        help_text="Parent category for hierarchical structure. Null = root category."
    )
    
    # NEW: Ordering and display
    order = models.IntegerField(default=0, help_text="Display order within parent")
    description = models.TextField(blank=True, help_text="Category description")

    class Meta:
        verbose_name_plural = "Service Categories"
        ordering = ['parent__order', 'order', 'name']

    def __str__(self):
        if self.parent:
            return f"{self.parent.name} > {self.name}"
        return self.name
    
    def is_parent(self):
        """Check if this is a parent category"""
        return self.parent is None
    
    def get_all_services(self):
        """Get all services under this category and its subcategories"""
        if self.is_parent():
            # Return services from all subcategories
            from django.db.models import Q
            subcategory_ids = self.subcategories.values_list('id', flat=True)
            return Service.objects.filter(
                Q(category_id__in=subcategory_ids) | Q(category=self)
            )
        else:
            # Return services directly under this subcategory
            return self.services.all()


class Service(models.Model):
    # Core fields
    name = models.CharField(max_length=200)
    description = models.TextField()
    
    # Category (now hierarchical)
    category = models.ForeignKey(
        ServiceCategory, 
        on_delete=models.CASCADE, 
        related_name='services',
        help_text="Subcategory for this service (e.g., 'Hospitals' under 'Medical')"
    )
    
    # Contact & Location
    phone_number = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    address = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    
    # Special flags
    is_emergency = models.BooleanField(default=False)
    is_24_hours = models.BooleanField(default=False, help_text="Open 24/7")
    
    # Opening hours
    opening_time = models.TimeField(null=True, blank=True)
    closing_time = models.TimeField(null=True, blank=True)
    
    # Metadata
    image = models.URLField(max_length=500, blank=True, help_text="URL to external image (HTTPS)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category', 'name']

    def __str__(self):
        return f"{self.name} ({self.category.name})"
    
    def get_full_category_path(self):
        """Return full category path (e.g., 'Medical Infrastructure > Hospitals')"""
        if self.category.parent:
            return f"{self.category.parent.name} > {self.category.name}"
        return self.category.name
