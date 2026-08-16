from django.http import HttpResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.core.permissions import IsVendor

from .models import ClientDocument, DocumentTemplate
from .serializers import (
    ClientDocumentSerializer,
    DocumentTemplateDetailSerializer,
    DocumentTemplateListSerializer,
)
from .services import (
    PDFEngineUnavailable,
    pdf_engine_available,
    pdf_engine_name,
    render_html,
    render_pdf,
)


class DocumentTemplateViewSet(viewsets.ReadOnlyModelViewSet):
    """Catálogo de plantillas. Solo lectura: el diseño no se edita desde la app."""

    permission_classes = [IsVendor]
    queryset = DocumentTemplate.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DocumentTemplateDetailSerializer
        return DocumentTemplateListSerializer

    @action(detail=False, methods=['get'], url_path='engine')
    def engine(self, request):
        """Le dice al frontend si este servidor puede generar PDFs, y con qué motor."""
        return Response({'pdf_available': pdf_engine_available(), 'engine': pdf_engine_name()})


class ClientDocumentViewSet(viewsets.ModelViewSet):
    """Documentos ya personalizados para un cliente."""

    permission_classes = [IsVendor]
    serializer_class = ClientDocumentSerializer

    def get_queryset(self):
        queryset = ClientDocument.objects.select_related('client', 'template')
        client_id = self.request.query_params.get('client')
        if client_id:
            queryset = queryset.filter(client_id=client_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(generated_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(generated_by=self.request.user)

    @action(detail=True, methods=['get'], url_path='pdf')
    def pdf(self, request, pk=None):
        document = self.get_object()
        try:
            pdf_bytes = render_pdf(document.template, document.field_values)
        except PDFEngineUnavailable as exc:
            return Response(
                {'detail': str(exc), 'code': 'pdf_engine_unavailable'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{document.filename}"'
        return response

    @action(detail=True, methods=['get'], url_path='preview')
    def preview(self, request, pk=None):
        """Vista previa HTML: sirve para revisar antes de generar el PDF."""
        document = self.get_object()
        html = render_html(document.template, document.field_values)
        return HttpResponse(html, content_type='text/html; charset=utf-8')
