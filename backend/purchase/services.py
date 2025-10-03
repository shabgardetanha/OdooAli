from simple_history.utils import update_change_reason
from stock.services import create_stock_transfer

from .models import PurchaseOrder


def create_purchase_order(product, quantity, supplier):
    order = PurchaseOrder.objects.create(product=product, quantity=quantity, supplier=supplier, status="pending")
    update_change_reason(order, "Created purchase order")
    order.save()

    # ورود موجودی async
    create_stock_transfer(product, quantity, "supplier", "warehouse")
    return order


def approve_purchase_order(order):
    update_change_reason(order, "Approved purchase order")
    order.status = "approved"
    order.save()
    return order
