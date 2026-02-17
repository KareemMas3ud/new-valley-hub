from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AttractionViewSet,
    DigitalArtifactViewSet,
    MuseumArtifactViewSet,
    SouvenirAssetViewSet,
    TeamMemberViewSet,
    GovernorProfileViewSet,
    ChatAPIView,
    SearchAPIView
)

router = DefaultRouter()
router.register(r'attractions', AttractionViewSet)
router.register(r'artifacts', DigitalArtifactViewSet)  # Legacy
router.register(r'museum-artifacts', MuseumArtifactViewSet)  # 🏛️ Virtual Museum
router.register(r'souvenir-assets', SouvenirAssetViewSet)  # 📸 Souvenir Maker
router.register(r'team', TeamMemberViewSet)
router.register(r'governor', GovernorProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('chat/', ChatAPIView.as_view(), name='chat'),
    path('search/', SearchAPIView.as_view(), name='global-search'),
]
