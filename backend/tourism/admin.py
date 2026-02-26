from django.contrib import admin
from django.utils.html import format_html, mark_safe
from .models import (
    Attraction,
    DigitalArtifact,
    MuseumArtifact,
    SouvenirAsset,
    TeamMember,
    GovernorProfile,
    SiteConfiguration
)

# ── Reusable static snippets (no args → mark_safe, not format_html) ──────────
_NO_IMAGE  = mark_safe('<span style="color: #999;">No image</span>')
_NO_MODEL  = mark_safe('<span style="color: #ccc;">No 3D model</span>')
_DASH      = mark_safe('<span style="color: #ccc;">—</span>')
_CHECK     = mark_safe('<span style="color: green; font-size: 18px;">✓</span>')
_CHECK_SM  = mark_safe('✓')
_PREMIUM   = mark_safe('<span style="background:#D3AB80;color:white;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:bold;">⭐ PREMIUM</span>')


@admin.register(Attraction)
class AttractionAdmin(admin.ModelAdmin):
    list_display = ('name', 'attraction_type', 'visit_duration_minutes', 'ticket_price', 'opening_time', 'closing_time')
    list_filter = ('attraction_type',)
    search_fields = ('name', 'description')
    ordering = ('name',)


# ============================================
# VIRTUAL MUSEUM ADMIN 🏛️
# ============================================

@admin.register(MuseumArtifact)
class MuseumArtifactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'thumbnail_preview', 'has_url', 'model_info', 'order', 'related_attraction', 'created_at')
    list_filter = ('related_attraction', 'created_at')
    search_fields = ('name', 'description')
    list_editable = ('order',)
    list_per_page = 20
    fields = (
        'name', 'description', 'image', 'image_url',
        'model_3d_file', 'order', 'related_attraction',
        'created_at', 'updated_at'
    )
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)

    def thumbnail_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width:60px;height:60px;object-fit:cover;border-radius:4px;border:2px solid #D3AB80;" />',
                obj.image.url
            )
        return _NO_IMAGE
    thumbnail_preview.short_description = '🖼️ Preview'

    def model_info(self, obj):
        if obj.model_3d_file:
            size = obj.model_file_size or '?'
            ext  = obj.model_file_extension
            return format_html(
                '<span style="color:green;">✓ {} MB {}</span>',
                size,
                ext.upper() if ext else ''
            )
        return _NO_MODEL
    model_info.short_description = '3D Model'

    def has_url(self, obj):
        return _CHECK_SM if obj.image_url else _DASH
    has_url.short_description = '🔗 URL'


# ============================================
# SOUVENIR MAKER ADMIN 📸
# ============================================

@admin.register(SouvenirAsset)
class SouvenirAssetAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'thumbnail_preview', 'has_url', 'premium_badge', 'display_order', 'file_info', 'created_at')
    list_filter = ('category', 'is_premium', 'created_at')
    search_fields = ('name',)
    list_editable = ('display_order',)
    list_per_page = 20
    fields = (
        'name', 'category', 'image_file', 'image_url',
        'is_premium', 'display_order', 'created_at', 'updated_at'
    )
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('display_order', '-created_at')

    def thumbnail_preview(self, obj):
        if obj.image_file:
            return format_html(
                '<img src="{}" style="width:60px;height:60px;object-fit:cover;border-radius:4px;border:2px solid #D3AB80;" />',
                obj.image_file.url
            )
        return _NO_IMAGE
    thumbnail_preview.short_description = '🖼️ Preview'

    def premium_badge(self, obj):
        return _PREMIUM if obj.is_premium else _DASH
    premium_badge.short_description = 'Status'

    def file_info(self, obj):
        size = obj.file_size_kb
        if size is not None:
            return format_html('<span style="color:#666;">{} KB</span>', size)
        return _DASH
    file_info.short_description = 'File Size'

    def has_url(self, obj):
        return _CHECK_SM if obj.image_url else _DASH
    has_url.short_description = '🔗 URL'


# ============================================
# LEGACY DIGITAL ARTIFACT ADMIN
# ============================================

@admin.register(DigitalArtifact)
class DigitalArtifactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'thumbnail_preview', 'has_3d_model_icon', 'model_size_display', 'related_attraction', 'created_at')
    list_filter = ('related_attraction', 'created_at')
    search_fields = ('name', 'description')
    list_per_page = 20
    fields = (
        'name', 'description', 'image', 'image_url',
        'model_3d_file', 'virtual_tour_url',
        'related_attraction', 'created_at', 'updated_at'
    )
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)

    def thumbnail_preview(self, obj):
        src = None
        if obj.image:
            src = obj.image.url
        elif obj.image_url:
            src = obj.image_url
        if src:
            return format_html(
                '<img src="{}" style="width:60px;height:60px;object-fit:cover;border-radius:4px;" />',
                src
            )
        return _NO_IMAGE
    thumbnail_preview.short_description = 'Preview'

    def has_3d_model_icon(self, obj):
        return _CHECK if obj.has_3d_model else _DASH
    has_3d_model_icon.short_description = '3D Model'

    def model_size_display(self, obj):
        size = obj.model_file_size
        if size is not None:
            ext = obj.model_file_extension
            return format_html(
                '<span style="color:#666;">{} MB {}</span>',
                size,
                ext.upper() if ext else ''
            )
        return _DASH
    model_size_display.short_description = 'File Size'


# ============================================
# OTHER ADMINS
# ============================================

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'profile_url')
    search_fields = ('name', 'role')
    fields = ('name', 'role', 'photo', 'photo_url', 'profile_url')


@admin.register(GovernorProfile)
class GovernorProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title')


@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
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
        return not SiteConfiguration.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
