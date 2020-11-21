import secrets

from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver


class User(models.Model):
    """
    Represents User
    """
    email = models.EmailField(max_length=254, unique=True, null=False, blank=False)
    name = models.CharField(max_length=30, unique=True, null=False, blank=False)
    password = models.CharField(max_length=30, null=False, blank=False)
    slug = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = "user"

    def __str__(self):
        return "{}".format(self.name)


def update_slug(sender, instance, raw, using, update_fields, **kwargs):
    """
    This is sent at the beginning of a model’s save() method
    :param sender: The model class
    :param instance: The actual instance being saved
    :param raw: A boolean; True if the model is saved exactly as presented (i.e. when loading a fixture)
    :param using: The database alias being used
    :param update_fields: The set of fields to update as passed to Model.save()
    :return:
    """
    if not instance.slug:
        instance.slug = secrets.token_hex(16)

    return instance


pre_save.connect(update_slug, sender=User)
