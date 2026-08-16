from django.contrib.auth.hashers import check_password, make_password
from django.db import models


class Client(models.Model):
    """
    Cliente del portal. No es un `auth.User`: tiene su propio login,
    con credenciales que KiboCode genera y entrega manualmente.
    """

    full_name = models.CharField('nombre completo', max_length=150)
    company_name = models.CharField('empresa', max_length=150, blank=True)
    email = models.EmailField('correo', blank=True)
    whatsapp_number = models.CharField('WhatsApp', max_length=32, blank=True)
    document_id = models.CharField('cédula / NIT', max_length=40, blank=True)

    username = models.CharField('usuario', max_length=64, unique=True)
    password = models.CharField('contraseña', max_length=128)

    is_active = models.BooleanField('activo', default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'cliente'
        verbose_name_plural = 'clientes'
        ordering = ('full_name',)

    def __str__(self):
        return f'{self.full_name} ({self.username})'

    def set_password(self, raw_password):
        """Guarda la contraseña siempre hasheada con los hashers de Django."""
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
