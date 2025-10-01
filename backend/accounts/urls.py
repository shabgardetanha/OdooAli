from django.urls import path
from .views import RegisterUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("health/", views.health, name="health"),
    path('frontend-event/', views.frontend_event, name='frontend_event'),

]
