from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=30)
    manager = models.ForeignKey("mainapp.CustomUser",related_name="_groups", on_delete=models.CASCADE)
    members = models.ManyToManyField("mainapp.CustomUser", related_name="event_groups")
    event = models.ForeignKey("mainapp.Event",related_name="_groups",on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
