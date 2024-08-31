from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=30)
    manager = models.ForeignKey("mainapp.CustomUser", on_delete=models.CASCADE)
    members = models.ManyToManyField("mainapp.CustomUser", related_name="teams")
    event = models.ForeignKey("mainapp.Event", on_delete=models.CASCADE)
