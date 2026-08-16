from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import ClientLoginView, HealthView, SessionView, VendorLoginView

urlpatterns = [
    path('health/', HealthView.as_view(), name='health'),
    path('vendor/login/', VendorLoginView.as_view(), name='vendor-login'),
    path('client/login/', ClientLoginView.as_view(), name='client-login'),
    path('refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('session/', SessionView.as_view(), name='session'),
]
