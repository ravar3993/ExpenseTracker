from django.db import models

from user.models import User


class Wallet(models.Model):
    """
    Represents wallet information and user to which it belongs
    """
    amount = models.IntegerField(default=0, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = "wallet"

    def __str__(self):
        return "Wallet User : {}".format(self.user.name)
