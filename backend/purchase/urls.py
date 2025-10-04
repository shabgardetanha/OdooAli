from rest_framework.routers import DefaultRouter

from .views import PurchaseOrderViewSet

router = DefaultRouter()
router.register(r"purchase_orders", PurchaseOrderViewSet, basename="purchaseorder")

urlpatterns = router.urls
