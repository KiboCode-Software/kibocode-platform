from rest_framework.routers import DefaultRouter

from .views import ClientDocumentViewSet, DocumentTemplateViewSet

router = DefaultRouter()
router.register('templates', DocumentTemplateViewSet, basename='document-template')
router.register('generated', ClientDocumentViewSet, basename='client-document')

urlpatterns = router.urls
