from rest_framework import viewsets
from users.permissions import IsAdminOrManager

from .models.sales_order import SalesOrder
from .serializers import SalesOrderSerializer


class SalesOrderViewSet(viewsets.ModelViewSet):
    serializer_class = SalesOrderSerializer
    permission_classes = [IsAdminOrManager]

    def get_queryset(self):
        user_company = getattr(self.request.user, "company", None)
        if not user_company:
            return SalesOrder.objects.none()
        return SalesOrder.objects.filter(company=user_company)
