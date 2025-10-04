from asgiref.sync import async_to_sync
from celery import shared_task
from channels.layers import get_channel_layer

from .models.sales_order import SalesOrder


@shared_task
def notify_sales_update(sales_order_id):
    order = SalesOrder.objects.get(id=sales_order_id)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"company_{order.company_id}",
        {
            "type": "sales_update",
            "data": {"id": order.id, "status": order.status},
        },
    )
