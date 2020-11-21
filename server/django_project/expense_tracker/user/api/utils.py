import traceback

from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned

from ..models import User


def register_user(user_data):
    """
    This is used to create a user instance in User table
    :param user_data: <QuerySet> form data contains relevant user info
    :return: boolean
    """

    try:
        user_email = user_data['email']
        user_name = user_data['username']
        user_password = user_data['password']
        # create a user in the database
        User.objects.create(email=user_email, name=user_name, password=user_password)
        return True
    except Exception as e:
        print(e)
        traceback.print_exc()
        return False


def check_user_exists(user_data):
    """
    This is used to check whether a username/email already exists or not
    :param user_data: <QuerySet> form data contains relevant user info
    :return: boolean
    """

    try:
        user_email = user_data['email']
        user_name = user_data['username']
        # Check if username exists or not
        if User.objects.filter(name=user_name).count() > 0:
            return True
        # Check if email exists or not
        elif User.objects.filter(email=user_email).count() > 0:
            return True
        # Check if both email and username exists or not
        elif User.objects.filter(name=user_name).count() > 0 and User.objects.filter(email=user_email).count() > 0:
            return True
        else:
            return False
    except Exception as e:
        print(e)
        traceback.print_exc()
        raise


def validate_user(user_data):
    """
    This is used to validate the sign in credentials
    :param user_data: <QuerySet> form data contains relevant user info
    :return: boolean
    """

    try:
        user_name = user_data['username']
        user_password = user_data['password']
        # Return true if a user exists with given credentials

        if User.objects.filter(name=user_name, password=user_password).count() > 0:
            print("User Validated")
            return True
        else:
            print("User Invalid")
            return False

    except Exception as e:
        print(e)
        traceback.print_exc()
        raise
