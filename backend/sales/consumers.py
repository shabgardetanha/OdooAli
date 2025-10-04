import json

from channels.generic.websocket import AsyncWebsocketConsumer


class SalesConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def send_update(self, event):
        await self.send(text_data=json.dumps(event["data"]))
