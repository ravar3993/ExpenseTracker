from django.db import models
from django.db.models.signals import post_save

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


def create_user_wallet(sender, instance, raw, using, update_fields, **kwargs):
    """
    This is sent at the end of a model’s save() method
    :param sender: The model class
    :param instance: The actual instance being saved
    :param raw: A boolean; True if the model is saved exactly as presented (i.e. when loading a fixture)
    :param using: The database alias being used
    :param update_fields: The set of fields to update as passed to Model.save()
    :return:
    """
    # Create an instance of wallet for every new user
    Wallet.objects.create(amount=0, user=instance)


post_save.connect(create_user_wallet, sender=User)
