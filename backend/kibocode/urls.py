from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.core.urls')),
    path('api/clients/', include('apps.clients.urls')),
    path('api/documents/', include('apps.documents.urls')),
    path('api/projects/', include('apps.projects.urls')),
]
