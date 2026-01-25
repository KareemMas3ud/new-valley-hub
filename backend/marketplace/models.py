from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.URLField(max_length=500, blank=True, null=True, help_text="URL to external image (HTTPS)")
    seller_name = models.CharField(max_length=100)
    seller_contact = models.CharField(max_length=50)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
