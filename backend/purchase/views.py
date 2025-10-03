from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import PurchaseOrder
from .serializers import PurchaseOrderSerializer
from .services import approve_purchase_order, create_purchase_order


class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        return create_purchase_order(**serializer.validated_data)

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        order = self.get_object()
        approve_purchase_order(order)
        return Response({"status": "approved"})
