from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=60)
    username = models.CharField(max_length=60, unique=True)
    description = models.CharField(max_length=1000)
    detailed_description = models.CharField(max_length=10000,default="")
    host = models.ForeignKey("mainapp.CustomUser", on_delete=models.CASCADE)
