from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework import permissions, viewsets
from simple_history.models import HistoricalRecords
from simple_history.utils import update_change_reason

from . import services
from .models import Product
from .permissions import IsAdminOrManager, IsCompanyAdminOrReadOnly  # ایمپورت Permission
from .serializers import ProductSerializer
from .services import create_product, delete_product, update_product


class ProductHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.history.all()
    serializer_class = ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # اینجا چند Permission با هم ترکیب شدند
    permission_classes = [IsCompanyAdminOrReadOnly & IsAdminOrManager]

    def get_queryset(self):
        return Product.objects.filter(company=self.request.user.company)

    def perform_create(self, serializer):
        return create_product(**serializer.validated_data)

    def perform_update(self, serializer):
        old_instance = self.get_object()
        serializer.save()
        new_instance = serializer.instance

        # Trigger Notification
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "products",
            {
                "type": "product_update",
                "data": {
                    "id": new_instance.id,
                    "name": new_instance.name,
                    "price": str(new_instance.price),
                    "stock": new_instance.stock,
                },
            },
        )

    def perform_destroy(self, instance):
        delete_product(instance)
