# Generated by Django 5.0.3 on 2024-09-19 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0004_remove_sentquestionanswer_max_score_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='context',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
