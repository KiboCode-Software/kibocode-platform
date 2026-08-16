from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.core.permissions import IsClient, IsVendor

from .models import Project, ProjectUpdate
from .serializers import ClientProjectSerializer, ProjectSerializer, ProjectUpdateSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    """Gestión de proyectos desde el lado vendedor."""

    permission_classes = [IsVendor]
    serializer_class = ProjectSerializer
    queryset = Project.objects.select_related('client').prefetch_related('updates')

    def get_queryset(self):
        queryset = super().get_queryset()
        client_id = self.request.query_params.get('client')
        if client_id:
            queryset = queryset.filter(client_id=client_id)
        return queryset


class ProjectUpdateViewSet(viewsets.ModelViewSet):
    permission_classes = [IsVendor]
    serializer_class = ProjectUpdateSerializer
    queryset = ProjectUpdate.objects.select_related('project')


class MyProjectsView(APIView):
    """
    Portal del cliente: devuelve ÚNICAMENTE los proyectos del cliente dueño
    del token. El id del cliente se toma del token firmado, nunca de un
    parámetro que mande el frontend.
    """

    permission_classes = [IsClient]

    def get(self, request):
        projects = (
            Project.objects.filter(client_id=request.user.client.id)
            .prefetch_related('updates')
            .order_by('-updated_at')
        )
        return Response(
            {
                'client': {
                    'full_name': request.user.client.full_name,
                    'company_name': request.user.client.company_name,
                },
                'projects': ClientProjectSerializer(projects, many=True).data,
            }
        )
