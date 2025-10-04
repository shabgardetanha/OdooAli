from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer


class ProductConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.group_name = f"company_{self.scope['user'].company_id}"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def product_update(self, event):
        await self.send_json(event["data"])
