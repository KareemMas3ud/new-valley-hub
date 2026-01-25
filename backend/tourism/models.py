from django.db import models
from core.models import BaseLocationModel

class Attraction(BaseLocationModel):
    TYPE_CHOICES = [
        ('natural', 'Natural Reserve'),
        ('historical', 'Historical Site'),
        ('cultural', 'Cultural Center'),
    ]
    
    attraction_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    visit_duration_minutes = models.PositiveIntegerField(help_text="Average time spent in minutes")
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    ticket_price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)

    def __str__(self):
        return self.name

class DigitalArtifact(models.Model):
    """
    Represents items in the Digital Museum.
    Can be standalone or linked to a specific physical attraction.
    """
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='artifacts/')
    
    # For 3D viewing or virtual tours
    model_3d_file = models.FileField(upload_to='3d_models/', blank=True, null=True)
    virtual_tour_url = models.URLField(blank=True, help_text="Link to 360 view if hosted externally")
    
    related_attraction = models.ForeignKey(
        Attraction, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='artifacts'
    )

    def __str__(self):
        return self.name
