from .models import SalesOrder


def create_sales_order(company, customer, total_amount):
    order = SalesOrder.objects.create(company=company, customer=customer, total_amount=total_amount)
    return order
