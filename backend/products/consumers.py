# backend/products/consumers.py
import json

from channels.generic.websocket import AsyncWebsocketConsumer


class ProductConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("products", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("products", self.channel_name)

    async def product_update(self, event):
        await self.send(text_data=json.dumps(event["data"]))
