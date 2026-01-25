from django.db import models

class BaseLocationModel(models.Model):
    """
    Abstract base model for any location-based entities
    (Hotels, Tourist Spots, Services, etc.)
    """
    name = models.CharField(max_length=200)
    description = models.TextField()
    # Changed from ImageField to URLField to support external images
    image = models.URLField(max_length=500, blank=True, help_text="URL to external image (HTTPS)")
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name
