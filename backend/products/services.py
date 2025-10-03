from simple_history.utils import update_change_reason

from .models import Product


def create_product(name, sku, price, description=""):
    product = Product.objects.create(name=name, sku=sku, price=price, description=description)
    update_change_reason(product, "Created via service")
    product.save()
    return product


def update_product(product, **kwargs):
    update_change_reason(product, "Updated via service")
    for field, value in kwargs.items():
        setattr(product, field, value)
    product.save()
    return product


def delete_product(product):
    update_change_reason(product, "Deleted via service")
    product.delete()
