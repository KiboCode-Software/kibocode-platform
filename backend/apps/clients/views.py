from rest_framework import viewsets

from apps.core.permissions import IsVendor

from .models import Client
from .serializers import ClientSerializer


class ClientViewSet(viewsets.ModelViewSet):
    """CRUD de clientes. Exclusivo del lado vendedor."""

    permission_classes = [IsVendor]
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(full_name__icontains=search)
        return queryset
