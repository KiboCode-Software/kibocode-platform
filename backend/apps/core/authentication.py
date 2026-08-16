"""
Autenticación JWT que entiende los dos tipos de identidad de la plataforma.

Un token de cliente NO resuelve a un `auth.User`: resuelve a un
`ClientPrincipal`, que solo da acceso a los datos de ese cliente.
"""

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed

from .tokens import ROLE_CLIENT, ROLE_VENDOR


class ClientPrincipal:
    """
    Identidad de un cliente del portal. Imita la interfaz mínima que DRF
    espera en `request.user` sin ser un usuario de Django.
    """

    is_authenticated = True
    is_anonymous = False
    is_staff = False
    is_superuser = False
    role = ROLE_CLIENT

    def __init__(self, client):
        self.client = client
        self.id = client.id
        self.username = client.username

    def __str__(self):
        return f'Client<{self.username}>'


class PlatformJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        role = validated_token.get('role')

        if role == ROLE_CLIENT:
            return self._get_client(validated_token)

        if role == ROLE_VENDOR:
            user = super().get_user(validated_token)
            # Un token de vendedor solo vale si la cuenta sigue siendo staff.
            if not user.is_staff:
                raise AuthenticationFailed(
                    'La cuenta ya no tiene acceso al panel de vendedor.',
                    code='vendor_access_revoked',
                )
            user.role = ROLE_VENDOR
            return user

        raise AuthenticationFailed('Token sin rol válido.', code='invalid_role')

    def _get_client(self, validated_token):
        from apps.clients.models import Client

        client_id = validated_token.get('client_id')
        if client_id is None:
            raise AuthenticationFailed('Token de cliente sin client_id.', code='invalid_token')

        try:
            client = Client.objects.get(pk=client_id, is_active=True)
        except Client.DoesNotExist as exc:
            raise AuthenticationFailed(
                'El cliente no existe o fue desactivado.', code='client_inactive'
            ) from exc

        return ClientPrincipal(client)
