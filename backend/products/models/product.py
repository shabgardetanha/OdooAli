from companies.models import Company
from django.db import models


class Product(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_qty = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.company.name})"
