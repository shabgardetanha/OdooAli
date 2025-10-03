import json

from channels.generic.websocket import AsyncWebsocketConsumer


class DashboardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        if user.is_authenticated:
            await self.channel_layer.group_add("dashboard", self.channel_name)
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("dashboard", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        # Example: handle inline edit or drag & drop events
        await self.channel_layer.group_send("dashboard", {"type": "dashboard.update", "message": data})

    async def dashboard_update(self, event):
        await self.send(text_data=json.dumps(event["message"]))
