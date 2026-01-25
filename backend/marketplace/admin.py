from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'seller_name', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'seller_name', 'description')
