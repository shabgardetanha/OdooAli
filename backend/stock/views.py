from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import StockTransfer
from .serializers import StockTransferSerializer
from .services import approve_stock_transfer, create_stock_transfer


class StockTransferViewSet(viewsets.ModelViewSet):
    queryset = StockTransfer.objects.all()
    serializer_class = StockTransferSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        return create_stock_transfer(**serializer.validated_data)

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        transfer = self.get_object()
        approve_stock_transfer(transfer)
        return Response({"status": "approved"})
