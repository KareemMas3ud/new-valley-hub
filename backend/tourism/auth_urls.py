from django.urls import path
from .auth_views import (
    RegisterView,
    SaveTripView, DeleteTripView,
    SouvenirView, DeleteSouvenirView,
)

urlpatterns = [
    # Auth
    path('register/',              RegisterView.as_view(),       name='auth-register'),

    # Trips
    path('save-trip/',             SaveTripView.as_view(),       name='auth-save-trip'),
    path('save-trip/<int:pk>/',    DeleteTripView.as_view(),     name='auth-delete-trip'),

    # Souvenirs
    path('souvenirs/',             SouvenirView.as_view(),       name='auth-souvenirs'),
    path('souvenirs/<int:pk>/',    DeleteSouvenirView.as_view(), name='auth-delete-souvenir'),
]
