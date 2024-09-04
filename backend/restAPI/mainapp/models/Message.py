from django.db import models
from django.utils import timezone


class Message(models.Model):
    sender = models.ForeignKey("CustomUser",related_name="messages", on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    assignment = models.ForeignKey("Assignment", related_name="messages", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)
