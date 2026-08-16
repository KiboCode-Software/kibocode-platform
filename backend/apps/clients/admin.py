from django.contrib import admin

from .models import Client


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'company_name', 'username', 'is_active', 'created_at')
    search_fields = ('full_name', 'company_name', 'username', 'email')
    list_filter = ('is_active',)
    exclude = ('password',)
