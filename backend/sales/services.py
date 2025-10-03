from simple_history.utils import update_change_reason
from stock.services import create_stock_transfer

from .models import SalesOrder


def create_sales_order(product, quantity, customer):
    order = SalesOrder.objects.create(product=product, quantity=quantity, customer=customer, status="pending")
    update_change_reason(order, "Created sales order")
    order.save()

    # کاهش موجودی async
    create_stock_transfer(product, quantity, "warehouse", "customer")
    return order


def approve_sales_order(order):
    update_change_reason(order, "Approved sales order")
    order.status = "approved"
    order.save()
    return order
