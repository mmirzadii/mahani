from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=30)
    username = models.CharField(max_length=40, unique=True)
    description = models.CharField(max_length=500)
    host = models.ForeignKey("mainapp.CustomUser", on_delete=models.CASCADE)
