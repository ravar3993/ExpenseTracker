# Generated by Django 3.0.5 on 2020-11-21 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='slug',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
