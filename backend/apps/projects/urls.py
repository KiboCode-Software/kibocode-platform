from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import MyProjectsView, ProjectUpdateViewSet, ProjectViewSet

router = DefaultRouter()
router.register('updates', ProjectUpdateViewSet, basename='project-update')
router.register('', ProjectViewSet, basename='project')

urlpatterns = [
    path('mine/', MyProjectsView.as_view(), name='my-projects'),
    *router.urls,
]
