"""
Emisión de JWT para los dos tipos de usuario de la plataforma.

El claim `role` es lo que permite al backend distinguir un token de vendedor
de uno de cliente. Nunca se confía en lo que mande el frontend: el rol viaja
firmado dentro del token.
"""

from rest_framework_simplejwt.tokens import RefreshToken

ROLE_VENDOR = 'vendor'
ROLE_CLIENT = 'client'


def tokens_for_vendor(user):
    """JWT para un usuario staff de Django (lado vendedor)."""
    refresh = RefreshToken.for_user(user)
    refresh['role'] = ROLE_VENDOR
    return _pair(refresh)


def tokens_for_client(client):
    """JWT para un `Client` del portal, que no es un `auth.User`."""
    refresh = RefreshToken()
    refresh['role'] = ROLE_CLIENT
    refresh['client_id'] = client.id
    return _pair(refresh)


def _pair(refresh):
    return {'access': str(refresh.access_token), 'refresh': str(refresh)}
