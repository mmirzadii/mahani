from django.db import models
from django.utils import timezone


class Assignment(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=30)
    content = models.FileField(null=True)
    event = models.ForeignKey("mainapp.Event", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)

