from datetime import datetime

import pytz
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.db.models.signals import post_save, pre_save

from expense_tracker import settings
from user.models import User


class Wallet(models.Model):
    """
    Represents wallet information and user to which it belongs
    """
    amount = models.IntegerField(default=0, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "wallet"

    def __str__(self):
        return "Wallet User : {}".format(self.user.name)


class WalletTransaction(models.Model):
    """
    Represents wallet transaction that took place with respect to a user
    """
    CREDIT = 1
    DEBIT = 2

    TRANSACTION_CODE_TYPE = {
        CREDIT: 'CREDIT',
        DEBIT: 'DEBIT'
    }

    TRANSACTION_TYPE_CODE = {
        'CREDIT': CREDIT,
        'DEBIT': DEBIT
    }

    TRANSACTION_TYPE = [
        (CREDIT, 'CREDITED'),
        (DEBIT, 'DEBITED')
    ]

    transaction_id = models.CharField(null=False,  max_length=50)
    amount = models.IntegerField(default=0, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    source = models.CharField(null=False,  max_length=50)
    type = models.IntegerField(null=False, choices=TRANSACTION_TYPE)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "wallet_transaction"

    def __str__(self):
        return "Wallet Transaction Source : {}".format(self.source)


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


def create_transaction(sender, instance, raw, using, update_fields, **kwargs):
    """
     This is sent at the end of a model’s save() method
     :param sender: The model class
     :param instance: The actual instance being saved
     :param raw: A boolean; True if the model is saved exactly as presented (i.e. when loading a fixture)
     :param using: The database alias being used
     :param update_fields: The set of fields to update as passed to Model.save()
     :return:
     """
    try:
        wallet = Wallet.objects.filter(user=instance.user)
        prev_balance = wallet.latest('modified_date').amount
    except ObjectDoesNotExist:
        prev_balance = 0
    updated_balance = instance.amount
    balance_diff = int(updated_balance) - int(prev_balance)
    if balance_diff < 0:
        transaction_type = WalletTransaction.TRANSACTION_TYPE_CODE['DEBIT']
    elif balance_diff > 0:
        transaction_type = WalletTransaction.TRANSACTION_TYPE_CODE['CREDIT']
    else:
        transaction_type = None

    if transaction_type:
        WalletTransaction.objects.create(
            amount=balance_diff,
            user=instance.user,
            source='wallet',
            type=transaction_type
        )


pre_save.connect(create_transaction, sender=Wallet)


def generate_transaction_id(sender, instance, raw, using, update_fields, **kwargs):
    """
     This is sent at the end of a model’s save() method
     :param sender: The model class
     :param instance: The actual instance being saved
     :param raw: A boolean; True if the model is saved exactly as presented (i.e. when loading a fixture)
     :param using: The database alias being used
     :param update_fields: The set of fields to update as passed to Model.save()
     :return:
     """
    if instance and not instance.transaction_id:
        try:
            try:
                last_trans = WalletTransaction.objects.latest('transaction_id').transaction_id
            except ObjectDoesNotExist:
                last_trans = 'trans-' + str(0)
            new_trans = int(last_trans[6:]) + 1
            new_trans = 'trans-' + str(new_trans)
            instance.transaction_id = new_trans
            return instance
        except Exception as e:
            print(e)
            raise


pre_save.connect(generate_transaction_id, sender=WalletTransaction)
