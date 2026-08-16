"""
Crea (o actualiza) una cuenta de vendedor para el panel interno.

    python manage.py create_vendor --username juan --password "..."

Si no se pasa `--password`, se pide por consola sin mostrarla en pantalla.
"""

from getpass import getpass

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Crea o actualiza un usuario vendedor (staff) del panel.'

    def add_arguments(self, parser):
        parser.add_argument('--username', required=True)
        parser.add_argument('--password')
        parser.add_argument('--email', default='')
        parser.add_argument('--superuser', action='store_true')

    def handle(self, *args, **options):
        username = options['username'].strip()
        password = options['password'] or getpass('Contraseña del vendedor: ')

        if len(password) < 8:
            raise CommandError('La contraseña debe tener al menos 8 caracteres.')

        user, created = User.objects.get_or_create(
            username=username, defaults={'email': options['email']}
        )
        user.set_password(password)
        user.is_staff = True
        if options['superuser']:
            user.is_superuser = True
        user.save()

        verb = 'creado' if created else 'actualizado'
        self.stdout.write(self.style.SUCCESS(f'Vendedor {verb}: {username}'))
