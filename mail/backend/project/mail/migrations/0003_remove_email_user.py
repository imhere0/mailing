# Generated by Django 3.1.4 on 2022-05-25 16:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mail', '0002_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='email',
            name='user',
        ),
    ]