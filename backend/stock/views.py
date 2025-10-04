from rest_framework import viewsets
from users.permissions import IsAdminOrManager

from .models import Stock
from .serializers import StockSerializer


class StockViewSet(viewsets.ModelViewSet):
    serializer_class = StockSerializer
    permission_classes = [IsAdminOrManager]

    def get_queryset(self):
        user_company = getattr(self.request.user, "company", None)
        if not user_company:
            return Stock.objects.none()
        return Stock.objects.filter(company=user_company)
