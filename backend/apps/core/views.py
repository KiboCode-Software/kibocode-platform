from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.clients.models import Client

from .authentication import ClientPrincipal
from .tokens import ROLE_CLIENT, ROLE_VENDOR, tokens_for_client, tokens_for_vendor

INVALID_CREDENTIALS = {'detail': 'Usuario o contraseña incorrectos.'}


class HealthView(APIView):
    """
    Chequeo de salud para systemd / balanceador. Comprueba que la base de
    datos responde: un 200 aquí significa que el servicio está realmente útil.
    """

    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        from django.db import connection

        try:
            with connection.cursor() as cursor:
                cursor.execute('SELECT 1')
        except Exception:
            return Response(
                {'status': 'error', 'database': 'unreachable'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        return Response({'status': 'ok', 'database': 'ok'})


class VendorLoginView(APIView):
    """Login del lado vendedor: usuario staff de Django."""

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        username = (request.data.get('username') or '').strip()
        password = request.data.get('password') or ''

        user = authenticate(request, username=username, password=password)
        if user is None or not user.is_active or not user.is_staff:
            # Mismo mensaje para credenciales malas y cuentas sin permiso:
            # no revelamos qué usuarios existen.
            return Response(INVALID_CREDENTIALS, status=status.HTTP_401_UNAUTHORIZED)

        return Response(
            {
                'role': ROLE_VENDOR,
                'tokens': tokens_for_vendor(user),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'full_name': user.get_full_name() or user.username,
                },
            }
        )


class ClientLoginView(APIView):
    """Login del portal de cliente: credenciales del modelo `Client`."""

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        username = (request.data.get('username') or '').strip()
        password = request.data.get('password') or ''

        client = Client.objects.filter(username__iexact=username, is_active=True).first()
        if client is None or not client.check_password(password):
            return Response(INVALID_CREDENTIALS, status=status.HTTP_401_UNAUTHORIZED)

        return Response(
            {
                'role': ROLE_CLIENT,
                'tokens': tokens_for_client(client),
                'client': {
                    'id': client.id,
                    'full_name': client.full_name,
                    'company_name': client.company_name,
                },
            }
        )


class SessionView(APIView):
    """Devuelve quién es el portador del token. Útil para rehidratar el frontend."""

    def get(self, request):
        user = request.user

        if isinstance(user, ClientPrincipal):
            return Response(
                {
                    'role': ROLE_CLIENT,
                    'client': {
                        'id': user.client.id,
                        'full_name': user.client.full_name,
                        'company_name': user.client.company_name,
                    },
                }
            )

        return Response(
            {
                'role': ROLE_VENDOR,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'full_name': user.get_full_name() or user.username,
                },
            }
        )
