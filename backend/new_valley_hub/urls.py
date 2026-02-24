from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'tourism-attractions': reverse('attraction-list', request=request, format=format),
        'tourism-artifacts':   reverse('digitalartifact-list', request=request, format=format),
        'services-items':      reverse('service-list', request=request, format=format),
        'services-categories': reverse('servicecategory-list', request=request, format=format),
        'hospitality-hotels':  reverse('hotel-list', request=request, format=format),
        'marketplace-products':reverse('product-list', request=request, format=format),
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root),
    path('api/tourism/',     include('tourism.urls')),
    path('api/services/',    include('services.urls')),
    path('api/hospitality/', include('hospitality.urls')),
    path('api/marketplace/', include('marketplace.urls')),

    # ── JWT standard endpoints ──────────────────────────────────────────────
    path('api/auth/token/',         TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(),    name='token_refresh'),

    # ── Custom auth (register, save-trip, souvenirs) ────────────────────────
    path('api/auth/', include('tourism.auth_urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
