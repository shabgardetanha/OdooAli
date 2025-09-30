from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.test_api),  # /api/test/ را فعال می‌کند
]
