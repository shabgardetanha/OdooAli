# purchase/views.py
from rest_framework import viewsets
from users.permissions import IsAdminOrManager

from .models.purchase_order import PurchaseOrder
from .serializers import PurchaseOrderSerializer


class PurchaseOrderViewSet(viewsets.ModelViewSet):
    serializer_class = PurchaseOrderSerializer
    permission_classes = [IsAdminOrManager]

    def get_queryset(self):
        user_company = getattr(self.request.user, "company", None)
        if user_company is None:
            return PurchaseOrder.objects.none()
        return PurchaseOrder.objects.filter(company=user_company)
