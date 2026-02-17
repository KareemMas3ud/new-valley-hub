from rest_framework import serializers
from .models import (
    Attraction,
    DigitalArtifact,
    MuseumArtifact,
    SouvenirAsset,
    TeamMember,
    GovernorProfile
)

class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = '__all__'


# ============================================
# VIRTUAL MUSEUM SERIALIZERS 🏛️
# ============================================

class MuseumArtifactSerializer(serializers.ModelSerializer):
    model_file_size = serializers.ReadOnlyField()
    model_file_extension = serializers.ReadOnlyField()
    display_image = serializers.ReadOnlyField()  # Smart image URL resolver
    
    # Ensure full URLs are returned (both are optional now)
    image = serializers.ImageField(use_url=True, required=False, allow_null=True)
    model_3d_file = serializers.FileField(use_url=True)

    class Meta:
        model = MuseumArtifact
        fields = '__all__'


# ============================================
# SOUVENIR MAKER SERIALIZERS 📸
# ============================================

class SouvenirAssetSerializer(serializers.ModelSerializer):
    file_size_kb = serializers.ReadOnlyField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    display_image = serializers.ReadOnlyField()  # Smart image URL resolver
    
    # Ensure full URL is returned (both are optional now)
    image_file = serializers.ImageField(use_url=True, required=False, allow_null=True)

    class Meta:
        model = SouvenirAsset
        fields = '__all__'


# ============================================
# LEGACY SERIALIZER
# ============================================

class DigitalArtifactSerializer(serializers.ModelSerializer):
    final_image_src = serializers.ReadOnlyField()
    has_3d_model = serializers.ReadOnlyField()
    model_file_size = serializers.ReadOnlyField()
    model_file_extension = serializers.ReadOnlyField()
    
    image = serializers.ImageField(use_url=True, required=False, allow_null=True)
    model_3d_file = serializers.FileField(use_url=True, required=False, allow_null=True)

    class Meta:
        model = DigitalArtifact
        fields = '__all__'


# ============================================
# OTHER SERIALIZERS
# ============================================

class TeamMemberSerializer(serializers.ModelSerializer):
    final_photo = serializers.ReadOnlyField()

    class Meta:
        model = TeamMember
        fields = '__all__'

class GovernorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GovernorProfile
        fields = '__all__'
