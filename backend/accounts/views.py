from django.http import JsonResponse
from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from django.db import connection
from prometheus_client import Counter

frontend_events_total = Counter('frontend_events_total', 'Frontend event counts', ['event_type'])


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

def health(request):
    db_status = "unhealthy"
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            db_status = "healthy"
    except Exception:
        db_status = "unhealthy"

    return JsonResponse({
        "status": "ok" if db_status == "healthy" else "error",
        "db": db_status
    })


def frontend_event(request):
    event_type = request.GET.get('type', 'unknown')
    frontend_events_total.labels(event_type=event_type).inc()
    return JsonResponse({'status': 'ok'})