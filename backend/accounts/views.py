from django.db import connection
from django.http import JsonResponse
from prometheus_client import Counter
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializers import UserSerializer

frontend_events_total = Counter("frontend_events_total", "Frontend event counts", ["event_type"])


class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class LoginView(TokenObtainPairView):
    # می‌توانید serializer دلخواه خود را اضافه کنید، ولی پیش‌فرض کافی است
    pass


def health(request):
    db_status = "unhealthy"
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            db_status = "healthy"
    except Exception:
        db_status = "unhealthy"

    return JsonResponse({"status": "ok" if db_status == "healthy" else "error", "db": db_status})


def frontend_event(request):
    event_type = request.GET.get("type", "unknown")
    frontend_events_total.labels(event_type=event_type).inc()
    return JsonResponse({"status": "ok"})
