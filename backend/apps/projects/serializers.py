from rest_framework import serializers

from .models import Project, ProjectUpdate


class ProjectUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUpdate
        fields = ('id', 'project', 'message', 'created_at')
        read_only_fields = ('id', 'created_at')


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer del lado vendedor: incluye las notas internas."""

    client_name = serializers.CharField(source='client.full_name', read_only=True)
    phase_label = serializers.CharField(source='get_phase_display', read_only=True)
    updates = ProjectUpdateSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = (
            'id',
            'client',
            'client_name',
            'name',
            'phase',
            'phase_label',
            'notes',
            'updates',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('id', 'created_at', 'updated_at')


class ClientProjectSerializer(serializers.ModelSerializer):
    """
    Serializer del portal de cliente. NO expone `notes`:
    las notas internas son solo para el vendedor.
    """

    phase_label = serializers.CharField(source='get_phase_display', read_only=True)
    updates = ProjectUpdateSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'name', 'phase', 'phase_label', 'updates', 'updated_at')
