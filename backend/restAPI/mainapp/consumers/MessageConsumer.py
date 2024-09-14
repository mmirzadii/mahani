import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework.exceptions import ValidationError

from mainapp.models import Assignment
from mainapp.serializers import MessageSerializer


class MessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.assignment_id = self.scope["url_route"]["kwargs"]["assignment_id"]
        self.room_group_name = f'assignment_chat_{self.assignment_id}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, code):
        self.channel_layer.discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data["message"]
        user = self.scope["user"]
        if user.is_authenticated:
            try:
                await self.create_message(user, self.assignment_id, message)
            except ValidationError as e:
                await self.send(json.dumps({
                    'error': e.detail
                }))
                return
            self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'user': user.username
                }
            )

    async def chat_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({
            'message': message,
            'user': event["user"]
        }))

    @database_sync_to_async
    def create_message(self, user, assignment_id, message_content):
        # Fetch assignment and serialize the message
        try:
            assignment = Assignment.objects.get(id=assignment_id)
        except Assignment.DoesNotExist:
            raise ValidationError("Assignment does not exist")

        # Prepare the data for the serializer
        message_data = {
            'sender': user.id,  # Need to use the user ID
            'content': message_content,
            'assignment': assignment.id,  # Need to use the assignment ID
        }

        # Use the serializer to validate and save the message
        serializer = MessageSerializer(data=message_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
