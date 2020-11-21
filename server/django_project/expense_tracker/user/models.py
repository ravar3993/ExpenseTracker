from django.db import models


class User(models.Model):
    """
    Represents User
    """
    email = models.EmailField(max_length=254, unique=True, null=False, blank=False)
    name = models.CharField(max_length=30, unique=True, null=False, blank=False)
    password = models.CharField(max_length=30, null=False, blank=False)

    class Meta:
        db_table = "user"

