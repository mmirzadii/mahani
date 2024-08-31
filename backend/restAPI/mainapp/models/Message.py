from django.db import models
from django.utils import timezone


class Message(models.Model):
    sender = models.ForeignKey("CustomUser", on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    assignment = models.ForeignKey("Assignment", related_name="messages", on_delete=models.CASCADE)
    date_joined = models.DateTimeField(default=timezone.now)
