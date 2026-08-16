from django.db import models

from apps.clients.models import Client


class ProjectPhase(models.TextChoices):
    """Mismas fases que la metodología publicada en la landing."""

    DESCUBRIMIENTO = 'descubrimiento', '01 Descubrimiento & Arquitectura'
    DESARROLLO = 'desarrollo', '02 Desarrollo & Pruebas'
    DESPLIEGUE = 'despliegue', '03 Despliegue & Escalabilidad'
    COMPLETADO = 'completado', 'Completado'


class Project(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField('nombre', max_length=150)
    phase = models.CharField(
        'fase', max_length=20, choices=ProjectPhase.choices, default=ProjectPhase.DESCUBRIMIENTO
    )
    notes = models.TextField('notas internas', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'proyecto'
        verbose_name_plural = 'proyectos'
        ordering = ('-updated_at',)

    def __str__(self):
        return f'{self.name} — {self.client.full_name}'


class ProjectUpdate(models.Model):
    """Entrada de la línea de tiempo que el cliente ve en su portal."""

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='updates')
    message = models.TextField('mensaje')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'actualización de proyecto'
        verbose_name_plural = 'actualizaciones de proyecto'
        ordering = ('-created_at',)

    def __str__(self):
        return f'{self.project.name}: {self.message[:40]}'
