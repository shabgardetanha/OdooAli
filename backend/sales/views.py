from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import SalesOrder
from .serializers import SalesOrderSerializer
from .services import approve_sales_order, create_sales_order


class SalesOrderViewSet(viewsets.ModelViewSet):
    queryset = SalesOrder.objects.all()
    serializer_class = SalesOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        return create_sales_order(**serializer.validated_data)

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        order = self.get_object()
        approve_sales_order(order)
        return Response({"status": "approved"})
