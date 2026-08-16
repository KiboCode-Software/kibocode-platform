from rest_framework import serializers

from .models import Client


class ClientSerializer(serializers.ModelSerializer):
    """
    Serializer del lado vendedor. `password` es de solo escritura:
    la contraseña hasheada nunca sale por la API.
    """

    password = serializers.CharField(write_only=True, required=False, min_length=8)

    class Meta:
        model = Client
        fields = (
            'id',
            'full_name',
            'company_name',
            'email',
            'whatsapp_number',
            'document_id',
            'username',
            'password',
            'is_active',
            'created_at',
        )
        read_only_fields = ('id', 'created_at')

    def create(self, validated_data):
        raw_password = validated_data.pop('password', None)
        if not raw_password:
            raise serializers.ValidationError(
                {'password': 'Define una contraseña inicial para el cliente.'}
            )
        client = Client(**validated_data)
        client.set_password(raw_password)
        client.save()
        return client

    def update(self, instance, validated_data):
        raw_password = validated_data.pop('password', None)
        for field, value in validated_data.items():
            setattr(instance, field, value)
        if raw_password:
            instance.set_password(raw_password)
        instance.save()
        return instance
