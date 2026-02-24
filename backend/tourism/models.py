from django.db import models
from django.core.validators import FileExtensionValidator
from core.models import BaseLocationModel
import os

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


# ============================================
# LEGACY MODEL (Kept for backward compatibility)
# ============================================

class DigitalArtifact(models.Model):
    """
    Legacy model - kept for backward compatibility.
    Use MuseumArtifact or SouvenirAsset instead.
    """
    name = models.CharField(max_length=255, help_text="Name of the artifact")
    description = models.TextField(help_text="Detailed description of the artifact")
    
    image = models.ImageField(
        upload_to='artifacts/images/', 
        blank=True, 
        null=True,
        help_text="Poster/preview image for the artifact"
    )
    image_url = models.URLField(
        blank=True, 
        help_text="External URL for image (optional, falls back to uploaded image)"
    )
    
    model_3d_file = models.FileField(
        upload_to='artifacts/models/',
        blank=True,
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=['glb', 'gltf', 'usdz'])],
        help_text="Upload .glb for Android/Web or .usdz for iOS AR"
    )
    
    virtual_tour_url = models.URLField(
        blank=True, 
        help_text="Link to 360° view if hosted externally"
    )
    
    related_attraction = models.ForeignKey(
        Attraction, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='artifacts',
        help_text="Link to a physical attraction in New Valley"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Digital Artifact (Legacy)"
        verbose_name_plural = "Digital Artifacts (Legacy)"
    
    @property
    def final_image_src(self):
        if self.image:
            return self.image.url
        return self.image_url
    
    @property
    def has_3d_model(self):
        return bool(self.model_3d_file)
    
    @property
    def model_file_size(self):
        if self.model_3d_file:
            try:
                return round(self.model_3d_file.size / (1024 * 1024), 2)
            except:
                return None
        return None
    
    @property
    def model_file_extension(self):
        if self.model_3d_file:
            return os.path.splitext(self.model_3d_file.name)[1].lower()
        return None
    
    def __str__(self):
        return self.name


# ============================================
# VIRTUAL MUSEUM MODELS 🏛️
# ============================================

class MuseumArtifact(models.Model):
    """
    Dedicated model for Virtual Museum 3D artifacts.
    Used exclusively for AR/VR museum experiences.
    """
    name = models.CharField(max_length=255, help_text="Name of the museum artifact")
    description = models.TextField(help_text="Historical/cultural description of the artifact")
    
    # Poster/Preview Image (File or URL required)
    image = models.ImageField(
        upload_to='museum/posters/',
        blank=True,
        null=True,
        help_text="Preview image/poster for the artifact"
    )
    image_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="Paste external image link here (optional backup)"
    )
    
    # 3D Model File (Required for museum artifacts)
    model_3d_file = models.FileField(
        upload_to='museum/models/',
        validators=[FileExtensionValidator(allowed_extensions=['glb', 'gltf', 'usdz'])],
        help_text="3D model file (.glb for Web/Android, .usdz for iOS)"
    )
    
    # Link to physical attraction
    related_attraction = models.ForeignKey(
        Attraction,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='museum_artifacts',
        help_text="Physical location in New Valley where this artifact was found/displayed"
    )
    
    # Display order
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers appear first)"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Museum Artifact"
        verbose_name_plural = "Museum Artifacts"
    
    @property
    def model_file_size(self):
        """Return file size in MB"""
        if self.model_3d_file:
            try:
                return round(self.model_3d_file.size / (1024 * 1024), 2)
            except:
                return None
        return None
    
    @property
    def model_file_extension(self):
        """Return file extension"""
        if self.model_3d_file:
            return os.path.splitext(self.model_3d_file.name)[1].lower()
        return None
    
    @property
    def display_image(self):
        """Return image URL (external URL takes priority over uploaded file)"""
        if self.image_url:
            return self.image_url
        if self.image:
            return self.image.url
        return None
    
    def __str__(self):
        return self.name
    
    def clean(self):
        """Validate that at least one image source is provided"""
        from django.core.exceptions import ValidationError
        if not self.image and not self.image_url:
            raise ValidationError(
                'You must provide either an image file or an image URL.'
            )


# ============================================
# SOUVENIR MAKER MODELS 📸
# ============================================

class SouvenirAsset(models.Model):
    """
    Digital assets for the Souvenir Maker tool.
    Includes backgrounds, stickers, and frames for canvas editing.
    """
    CATEGORY_CHOICES = [
        ('background', 'Background Image'),
        ('sticker', 'Sticker/Overlay'),
        ('frame', 'Photo Frame'),
    ]
    
    name = models.CharField(max_length=255, help_text="Name of the asset")
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        help_text="Type of souvenir asset"
    )
    
    # Image file (File or URL required)
    image_file = models.ImageField(
        upload_to='souvenir/assets/',
        blank=True,
        null=True,
        help_text="The actual image file (PNG with transparency for stickers/frames)"
    )
    image_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="Paste external image link here (optional backup)"
    )
    
    # Optional metadata
    is_premium = models.BooleanField(
        default=False,
        help_text="Mark as premium/featured asset"
    )
    display_order = models.IntegerField(
        default=0,
        help_text="Order in which to display (lower numbers first)"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['display_order', '-created_at']
        verbose_name = "Souvenir Asset"
        verbose_name_plural = "Souvenir Assets"
    
    @property
    def file_size_kb(self):
        """Return file size in KB"""
        if self.image_file:
            try:
                return round(self.image_file.size / 1024, 2)
            except:
                return None
        return None
    
    @property
    def display_image(self):
        """Return image URL (external URL takes priority over uploaded file)"""
        if self.image_url:
            return self.image_url
        if self.image_file:
            return self.image_file.url
        return None
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"
    
    def clean(self):
        """Validate that at least one image source is provided"""
        from django.core.exceptions import ValidationError
        if not self.image_file and not self.image_url:
            raise ValidationError(
                'You must provide either an image file or an image URL.'
            )


# ============================================
# OTHER MODELS
# ============================================

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, blank=True, null=True)
    photo = models.ImageField(upload_to='team_photos/', blank=True, null=True)
    photo_url = models.URLField(blank=True, null=True)
    profile_url = models.URLField(blank=True, null=True)

    @property
    def final_photo(self):
        if self.photo_url:
            return self.photo_url
        if self.photo:
            return self.photo.url
        return None

    def __str__(self):
        return self.name

class GovernorProfile(models.Model):
    name = models.CharField(max_length=200, default="اللواء أ.ح / محمد سالمان الزملوط")
    title = models.CharField(max_length=200, default="محافظ الوادي الجديد")
    photo = models.ImageField(upload_to='governor_photos/', blank=True, null=True)
    welcome_heading = models.CharField(max_length=200, default="كلمة السيد المحافظ")
    welcome_message = models.TextField(default="يسعدني ويشرفني أن أكون بين أهلي في محافظة الوادي الجديد فالمواطن أول اهتماماتي وأقسمت اليمين لأرعى مصالحه وأن أحافظ عليه. أما تعظيم الموارد المتاحة بالمحافظة وترشيد الاستهلاك والتواصل بين جميع الجهات الإدارية لتوفير الكثير من الجهد والوقت وضرورة حسن معاملة المواطنين والعمل بروح الفريق والالتزام الكامل بتوفير الخدمات من أساسيات العمل بالمحافظة.")
    career_highlights = models.TextField(default="تاريخ التخرج: الكلية الحربية 1/4/1980.\nتولى الوظائف القيادية في سلاح المشاة حتى قائد الفرقة 16 مشاة.\nمساعد قائد المنطقة الشمالية العسكرية.\nرئيس أركان الجيش الثاني الميداني.\nرئيس أركان المنطقة المركزية العسكرية.\nقائد المنطقة الشمالية العسكرية.\nرئيس هيئة البحوث العسكرية.\nالأوسمة: ميدالية الخدمة الطويلة، نوط الواجب العسكري، نوط الخدمة الممتازة.")

    def save(self, *args, **kwargs):
        self.pk = 1
        super(GovernorProfile, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.name

class SiteConfiguration(models.Model):
    """
    Singleton model to store site-wide configuration settings.
    Managed through Django Admin for dynamic API key configuration.
    """
    gemini_api_key = models.CharField(
        max_length=500, 
        blank=True, 
        null=True,
        help_text="Google Gemini API Key for AI chatbot. Leave blank to use environment variable."
    )
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configuration"
    
    def save(self, *args, **kwargs):
        """Ensure only one instance exists (singleton pattern)"""
        self.pk = 1
        super(SiteConfiguration, self).save(*args, **kwargs)
    
    @classmethod
    def load(cls):
        """Load or create the singleton instance"""
        obj, created = cls.objects.get_or_create(pk=1)
        return obj
    
    def __str__(self):
        return "Site Configuration"


# ── Auth-gated models ──────────────────────────────────────────────────────
from django.contrib.auth import get_user_model

class UserSavedTrip(models.Model):
    user           = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='user_saved_trips')
    transport_mode = models.CharField(max_length=20, default='unknown')
    total_co2      = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    route_data     = models.JSONField(default=list, blank=True)
    created_at     = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering            = ['-created_at']
        verbose_name        = 'User Saved Trip'
        verbose_name_plural = 'User Saved Trips'

    def __str__(self):
        return f"{self.user.email} — {self.transport_mode} ({self.total_co2} kg CO₂)"


class UserSavedSouvenir(models.Model):
    user       = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='user_saved_souvenirs')
    image_data = models.TextField(help_text='Base-64 PNG data-URL of the souvenir canvas')
    caption    = models.CharField(max_length=120, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering            = ['-created_at']
        verbose_name        = 'User Saved Souvenir'
        verbose_name_plural = 'User Saved Souvenirs'

    def __str__(self):
        return f"Souvenir by {self.user.email} ({self.created_at:%Y-%m-%d})"
