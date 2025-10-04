from asgiref.sync import async_to_sync
from celery import shared_task
from channels.layers import get_channel_layer

from .models import Stock


@shared_task
def notify_stock_update(stock_id):
    stock = Stock.objects.get(id=stock_id)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"company_{stock.company_id}",
        {
            "type": "stock_update",
            "data": {"id": stock.id, "quantity": stock.quantity},
        },
    )
