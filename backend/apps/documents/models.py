from django.conf import settings
from django.db import models

from apps.clients.models import Client


class DocumentStyle(models.TextChoices):
    LEGAL = 'legal', 'Legal (fondo blanco, membrete)'
    COMERCIAL = 'comercial', 'Comercial (fondo oscuro)'


class DocumentTemplate(models.Model):
    """
    Plantilla de documento. `html_template` guarda el CUERPO del documento
    con placeholders de Django ({{ campo }}); el diseño (membrete, tipografía,
    pie de página) vive en las plantillas de estilo en disco, de modo que
    el vendedor nunca toca maquetación.
    """

    name = models.CharField('nombre', max_length=150)
    slug = models.SlugField('slug', max_length=80, unique=True)
    description = models.CharField('para qué sirve', max_length=255, blank=True)
    style = models.CharField(
        'estilo', max_length=16, choices=DocumentStyle.choices, default=DocumentStyle.LEGAL
    )
    header_title = models.CharField('título del membrete', max_length=120, blank=True)
    fields = models.JSONField('campos personalizables', default=list)
    html_template = models.TextField('cuerpo HTML')
    is_active = models.BooleanField('activa', default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'plantilla de documento'
        verbose_name_plural = 'plantillas de documento'
        ordering = ('name',)

    def __str__(self):
        return self.name

    def default_values(self):
        """Valores por defecto declarados en `fields`, listos para pre-llenar el formulario."""
        return {
            field['key']: field.get('default', [] if field.get('type') == 'table' else '')
            for field in self.fields
        }


class ClientDocument(models.Model):
    """
    Documento ya personalizado para un cliente concreto. Guarda los valores
    usados para poder volver a descargarlo sin rellenar todo de nuevo.
    """

    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='documents')
    template = models.ForeignKey(
        DocumentTemplate, on_delete=models.PROTECT, related_name='client_documents'
    )
    field_values = models.JSONField('valores', default=dict)
    generated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='generated_documents',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'documento de cliente'
        verbose_name_plural = 'documentos de cliente'
        ordering = ('-updated_at',)

    def __str__(self):
        return f'{self.template.name} — {self.client.full_name}'

    @property
    def filename(self):
        safe_client = self.client.full_name.replace(' ', '-').lower()
        return f'{self.template.slug}-{safe_client}.pdf'
