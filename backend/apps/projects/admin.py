from django.contrib import admin

from .models import Project, ProjectUpdate


class ProjectUpdateInline(admin.TabularInline):
    model = ProjectUpdate
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'client', 'phase', 'updated_at')
    list_filter = ('phase',)
    search_fields = ('name', 'client__full_name')
    inlines = [ProjectUpdateInline]
