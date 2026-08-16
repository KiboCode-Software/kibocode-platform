from rest_framework.permissions import BasePermission

from .authentication import ClientPrincipal


class IsVendor(BasePermission):
    """Solo usuarios staff de Django (lado vendedor)."""

    message = 'Necesitas una cuenta de vendedor para acceder a este recurso.'

    def has_permission(self, request, view):
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and not isinstance(user, ClientPrincipal)
            and user.is_staff
        )


class IsClient(BasePermission):
    """Solo clientes autenticados del portal."""

    message = 'Necesitas iniciar sesión como cliente para acceder a este recurso.'

    def has_permission(self, request, view):
        return isinstance(request.user, ClientPrincipal)
