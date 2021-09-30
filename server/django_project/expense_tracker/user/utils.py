import jwt
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned

from expense_tracker import settings
from user.models import User


def authorize_user_jwt(jwt_token):
    try:
        token_data = jwt.decode(eval(jwt_token), settings.SECRET_KEY, algorithms=['HS256'])
    except Exception as e:
        print(e)
        raise
    else:
        # Return true if a user exists with given credentials
        try:
            user = User.objects.get(name=token_data['username'], password=token_data['password'])
        except (ObjectDoesNotExist, MultipleObjectsReturned):
            return False, None
        else:
            return True, user

