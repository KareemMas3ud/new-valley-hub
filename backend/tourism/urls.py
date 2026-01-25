from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttractionViewSet, DigitalArtifactViewSet

router = DefaultRouter()
router.register(r'attractions', AttractionViewSet)
router.register(r'artifacts', DigitalArtifactViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
