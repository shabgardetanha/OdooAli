from companies.models import Company
from django.conf import settings
from django.db import models
from products.models import Product
from simple_history.models import HistoricalRecords


class PurchaseOrder(models.Model):
    """
    Purchase order model.
    Each purchase order belongs to a company and a user (creator).
    Includes role-based & company-based access by design.
    """

    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="purchase_orders")
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="created_purchase_orders",
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="purchase_orders")
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    history = HistoricalRecords(inherit=True)

    class Meta:
        ordering = ["-created_at"]
        permissions = [
            ("can_approve_purchase", "Can approve purchase order"),
            ("can_cancel_purchase", "Can cancel purchase order"),
        ]

    def __str__(self):
        return f"PO-{self.id} | {self.product.name} x {self.quantity} ({self.status})"

    @property
    def total_price(self):
        return self.quantity * self.price
