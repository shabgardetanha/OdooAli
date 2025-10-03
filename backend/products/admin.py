from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from .models import Product


@admin.register(Product)
class ProductAdmin(SimpleHistoryAdmin):
    list_display = ["name", "sku", "price"]
