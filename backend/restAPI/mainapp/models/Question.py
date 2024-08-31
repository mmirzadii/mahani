from django.db import models


class Question(models.Model):
    name = models.CharField(max_length=30)
    text = models.CharField(max_length=1000)
    context = models.ImageField()
    assignment = models.ForeignKey("mainapp.Assignment", related_name="questions", on_delete=models.CASCADE)
