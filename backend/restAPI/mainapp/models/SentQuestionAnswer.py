from django.db import models


class SentQuestionAnswer(models.Model):
    group = models.ForeignKey("mainapp.CustomUser", related_name="sent_question_answer", on_delete=models.CASCADE)
    question = models.ForeignKey("mainapp.Question", related_name="sent_assignments", on_delete=models.CASCADE)
    content = models.FileField()
    score = models.IntegerField(default=0)
    max_score = models.IntegerField(default=0)
