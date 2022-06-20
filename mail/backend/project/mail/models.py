import email
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    id = models.AutoField(primary_key= True)
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=255)


class Email(models.Model):
    id = models.AutoField(primary_key= True)
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="emails", default= 420)
    sender = models.ForeignKey("User", on_delete= models.PROTECT, related_name="emails_sent")
    subject = models.CharField(max_length= 255)
    body = models.TextField(blank= True)
    recipients = models.ManyToManyField("User", related_name="emails_received")
    timestamp = models.DateTimeField(auto_now_add= True)
    read = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)


