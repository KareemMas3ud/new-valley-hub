from django.contrib import admin
from .models import Attraction, DigitalArtifact, TeamMember, GovernorProfile, SiteConfiguration

@admin.register(Attraction)
class AttractionAdmin(admin.ModelAdmin):
    list_display = ('name', 'attraction_type', 'visit_duration_minutes', 'ticket_price', 'opening_time', 'closing_time')
    list_filter = ('attraction_type',)
    search_fields = ('name', 'description')
    ordering = ('name',)

@admin.register(DigitalArtifact)
class DigitalArtifactAdmin(admin.ModelAdmin):
    list_display = ('name', 'related_attraction', 'image_url')
    search_fields = ('name', 'description')
    fields = ('name', 'description', 'image', 'image_url', 'related_attraction', 'model_3d_file', 'virtual_tour_url')

from .models import TeamMember

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'profile_url')
    search_fields = ('name', 'role')
    fields = ('name', 'role', 'photo', 'photo_url', 'profile_url')

@admin.register(GovernorProfile)
class GovernorProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title')
    # Prevent deletion if you want it to be strictly singleton, 
    # but for now we trust the save() method override.

@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
    """
    Admin interface for site-wide configuration.
    Uses singleton pattern - only one instance can exist.
    """
    list_display = ('__str__', 'updated_at')
    fieldsets = (
        ('API Configuration', {
            'fields': ('gemini_api_key',),
            'description': 'Configure API keys for external services. Leave blank to use environment variables.'
        }),
        ('Metadata', {
            'fields': ('updated_at',),
            'classes': ('collapse',),
        }),
    )
    readonly_fields = ('updated_at',)
    
    def has_add_permission(self, request):
        """Prevent adding more than one configuration instance"""
        return not SiteConfiguration.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        """Prevent deletion of the configuration instance"""
        return False
