# Generated by Django 3.0.5 on 2020-11-21 18:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wallet', '0001_initial'),
        ('user', '0003_auto_20201121_1842'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserInfo',
            new_name='User',
        ),
    ]
