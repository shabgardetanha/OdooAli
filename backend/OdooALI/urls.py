from accounts.views import health
from django.contrib import admin
from django.urls import include, path
from products.views import ProductViewSet
from purchase.views import PurchaseOrderViewSet
from rest_framework.routers import DefaultRouter
from sales.views import SalesOrderViewSet
from stock.views import StockTransferViewSet

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
router.register(r"stock-transfers", StockTransferViewSet, basename="stock-transfer")
router.register(r"sales-orders", SalesOrderViewSet, basename="sales-order")
router.register(r"purchase-orders", PurchaseOrderViewSet, basename="purchase-order")

urlpatterns = [
    path("admin/", admin.site.urls),
    # django-debug-toolbar
    path("__debug__/", include("debug_toolbar.urls")),
    path("api/accounts/", include("accounts.urls")),
    # Prometheus metrics endpoint
    path("", include("django_prometheus.urls")),
    # Health endpoint
    path("health/", health, name="health"),
]
