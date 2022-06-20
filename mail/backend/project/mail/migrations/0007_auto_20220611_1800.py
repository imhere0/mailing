# Generated by Django 3.1.4 on 2022-06-11 12:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mail', '0006_email_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='email',
            name='user',
            field=models.ForeignKey(default=420, on_delete=django.db.models.deletion.CASCADE, related_name='emails', to=settings.AUTH_USER_MODEL),
        ),
    ]