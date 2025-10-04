from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .models import PurchaseOrder
from .serializers import PurchaseOrderSerializer


class PurchaseOrderConsumer(AsyncJsonWebsocketConsumer):
    """
    WebSocket consumer for live updates of Purchase Orders.
    """

    async def connect(self):
        user = self.scope["user"]
        if not user.is_authenticated:
            await self.close()
        else:
            self.group_name = f"company_{user.company.id}_purchase_orders"
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive_json(self, content):
        # Example: client sends {"action": "fetch"}
        if content.get("action") == "fetch":
            orders = await self.get_orders()
            await self.send_json({"purchase_orders": orders})

    async def purchase_order_update(self, event):
        # Send updated PurchaseOrder to clients
        await self.send_json({"purchase_order": event["data"]})

    @database_sync_to_async
    def get_orders(self):
        user = self.scope["user"]
        queryset = PurchaseOrder.objects.filter(company=user.company)
        return PurchaseOrderSerializer(queryset, many=True).data
