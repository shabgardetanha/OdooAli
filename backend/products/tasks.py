from asgiref.sync import async_to_sync
from celery import shared_task
from channels.layers import get_channel_layer

from .models import Product


@shared_task
def notify_product_update(product_id):
    product = Product.objects.get(id=product_id)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"company_{product.company_id}",
        {
            "type": "product_update",
            "data": {"id": product.id, "name": product.name, "price": product.price},
        },
    )
