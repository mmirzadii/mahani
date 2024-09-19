
from mainapp.models import Message
from mainapp.serializers import MessageSerializer
from rest_framework.permissions import IsAuthenticated
import json


class MessageConsumer():
    """Message consumer that extends the base model consumer."""
    model = Message
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can interact

    async def connect(self):
        self.assignment_id = self.scope["url_route"]["kwargs"]["assignment_id"]
        self.room_group_name = f'assignment_chat_{self.assignment_id}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await super().connect()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        await super().disconnect(code)

    async def receive(self, text_data=None, bytes_data=None):
        """Handle receiving messages specifically for Message model."""
        data = json.loads(text_data)
        sent_data = await super().receive(text_data=text_data)

        # Custom logic for broadcasting messages
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'data': sent_data,
                'action': data.get('action', 'create')
            }
        )

    async def chat_message(self, event):
        """Send message to WebSocket."""
        await self.send(text_data=json.dumps({
            'data': event['data'],
            'action': event['action'],
        }))
