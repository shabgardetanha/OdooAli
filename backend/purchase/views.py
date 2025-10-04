from rest_framework import permissions, viewsets

from .models import PurchaseOrder
from .serializers import PurchaseOrderSerializer


class IsAdminOrManager(permissions.BasePermission):
    """
    Custom permission to allow only Admins or Managers to approve/cancel.
    """

    def has_permission(self, request, view):
        return request.user.role in ["admin", "manager"]


class PurchaseOrderViewSet(viewsets.ModelViewSet):
    """
    CRUD for Purchase Orders.
    Queryset filtered by user's company.
    Permissions enforced per role.
    """

    serializer_class = PurchaseOrderSerializer

    def get_queryset(self):
        return PurchaseOrder.objects.filter(company=self.request.user.company)

    def perform_create(self, serializer):
        serializer.save(company=self.request.user.company, created_by=self.request.user)

    def get_permissions(self):
        if self.action in ["update", "partial_update", "destroy"]:
            permission_classes = [IsAdminOrManager]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [perm() for perm in permission_classes]
