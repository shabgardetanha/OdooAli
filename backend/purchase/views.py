from rest_framework import viewsets
from users.permissions import IsAdminOrManager

from .models.purchase_order import PurchaseOrder
from .serializers import PurchaseOrderSerializer


class PurchaseOrderViewSet(viewsets.ModelViewSet):
    serializer_class = PurchaseOrderSerializer
    permission_classes = [IsAdminOrManager]

    def get_queryset(self):
        user_company = getattr(self.request.user, "company", None)
        if not user_company:
            return PurchaseOrder.objects.none()
        return PurchaseOrder.objects.filter(company=user_company)
