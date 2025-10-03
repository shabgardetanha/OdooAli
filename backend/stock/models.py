from django.db import models
from products.models import Product


class StockTransfer(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("processing", "Processing"),
        ("done", "Done"),
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product} ({self.quantity}) {self.source} → {self.destination}"


class StockTransfer(models.Model):
    class Meta:
        permissions = [
            ("view_transfer", "Can view stock transfer"),
            ("approve_transfer", "Can approve stock transfer"),
        ]
