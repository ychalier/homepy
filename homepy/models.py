from django.db import models
from django.conf import settings


class HomeSettings(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    json = models.TextField(default="[]")

    def __str__(self):
        return "HomeSettings<%s>" % self.user
    
