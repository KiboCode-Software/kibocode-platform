from django.contrib import admin

from .models import ClientDocument, DocumentTemplate


@admin.register(DocumentTemplate)
class DocumentTemplateAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'style', 'is_active', 'updated_at')
    list_filter = ('style', 'is_active')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(ClientDocument)
class ClientDocumentAdmin(admin.ModelAdmin):
    list_display = ('template', 'client', 'generated_by', 'updated_at')
    list_filter = ('template',)
    search_fields = ('client__full_name',)
