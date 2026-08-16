from rest_framework import serializers

from .models import ClientDocument, DocumentTemplate


class DocumentTemplateListSerializer(serializers.ModelSerializer):
    """Datos para las cards del grid: sin el HTML, que no le sirve al frontend."""

    class Meta:
        model = DocumentTemplate
        fields = ('id', 'slug', 'name', 'description', 'style', 'header_title')


class DocumentTemplateDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentTemplate
        fields = (
            'id',
            'slug',
            'name',
            'description',
            'style',
            'header_title',
            'fields',
        )


class ClientDocumentSerializer(serializers.ModelSerializer):
    template_name = serializers.CharField(source='template.name', read_only=True)
    template_slug = serializers.CharField(source='template.slug', read_only=True)
    template_style = serializers.CharField(source='template.style', read_only=True)
    client_name = serializers.CharField(source='client.full_name', read_only=True)

    class Meta:
        model = ClientDocument
        fields = (
            'id',
            'client',
            'client_name',
            'template',
            'template_name',
            'template_slug',
            'template_style',
            'field_values',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('id', 'created_at', 'updated_at')
