from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, ServiceCategoryViewSet

router = DefaultRouter()
router.register(r'items', ServiceViewSet)
router.register(r'categories', ServiceCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
