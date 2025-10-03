from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from notifications.consumers import DashboardConsumer

application = ProtocolTypeRouter(
    {
        "websocket": AuthMiddlewareStack(
            URLRouter(
                [
                    path("ws/dashboard/", DashboardConsumer.as_asgi()),
                ]
            )
        ),
    }
)
