from django.urls import path, include
from rest_framework.routers import DefaultRouter

from recipy import views

router = DefaultRouter()
router.register('tags', views.TagViewSet)
router.register('ingredients', views.IngredientViewSet)
router.register('recipes', views.RecipeViewSet)
app_name = 'recipy'

urlpatterns = [
    path('', include(router.urls))
]
