import traceback
from expense_tracker import constants as c
from rest_framework import status
from rest_framework.response import Response

from wallet.models import Wallet
from .utils import register_user, check_user_exists, validate_user
from rest_framework.views import APIView

from ..utils import authorize_user_jwt


class SignUp(APIView):
    resp_header = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": '*'
    }
    message = None
    response_code = None
    status_code = None
    session_token = None

    def post(self, request, *args, **kwargs):
        try:
            if request.data['password'] != request.data['confirm_password']:
                self.response_code = c.LOGIN_RESPONSE_CODE[2]
                self.status_code = status.HTTP_400_BAD_REQUEST
                self.message = c.LOGIN_RESPONSE_MSG[self.response_code]
            elif request.data['email'] and request.data['username'] and request.data['password']:
                if not check_user_exists(request.data):
                    user_registered = register_user(request.data)
                    is_validated, session_token = validate_user(request.data)
                    if user_registered and is_validated:
                        self.response_code = c.LOGIN_RESPONSE_CODE[4]
                        self.status_code = status.HTTP_200_OK
                        self.message = c.LOGIN_RESPONSE_MSG[self.response_code]
                        self.session_token = session_token
                    else:
                        self.response_code = c.LOGIN_RESPONSE_CODE[5]
                        self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
                        self.message = c.LOGIN_RESPONSE_MSG[self.response_code]
                else:
                    is_validated, session_token = validate_user(request.data)
                    if is_validated:
                        self.response_code = c.LOGIN_RESPONSE_CODE[3]
                        self.status_code = status.HTTP_200_OK
                        self.message = c.LOGIN_RESPONSE_MSG[self.response_code]
                        self.session_token = session_token
                    else:
                        self.response_code = c.LOGIN_RESPONSE_CODE[6]
                        self.status_code = status.HTTP_400_BAD_REQUEST
                        self.message = c.LOGIN_RESPONSE_MSG[self.response_code]

            else:
                self.response_code = c.LOGIN_RESPONSE_CODE[6]
                self.status_code = status.HTTP_400_BAD_REQUEST
                self.message = c.LOGIN_RESPONSE_MSG[self.response_code]

        except Exception as e:
            print(e)
            traceback.print_exc()
            self.response_code = c.LOGIN_RESPONSE_CODE[7]
            self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            self.message = c.LOGIN_RESPONSE_MSG[self.response_code]

        resp_data = {"resp_msg": self.message, "resp_code": self.response_code, "token": self.session_token}
        return Response(data=resp_data, status=self.status_code, headers=self.resp_header)


class SignIn(APIView):
    resp_header = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": '*'
    }
    message = None
    response_code = None
    status_code = None
    session_token = None

    def post(self, request, *args, **kwargs):
        try:
            is_validated, session_token = validate_user(request.data)
            if is_validated:
                self.response_code = c.LOGIN_RESPONSE_CODE[0]
                self.message = c.LOGIN_RESPONSE_MSG[self.response_code]
                self.status_code = status.HTTP_200_OK
                self.session_token = session_token
            else:
                self.response_code = c.LOGIN_RESPONSE_CODE[1]
                self.message = c.LOGIN_RESPONSE_MSG[self.response_code]
                self.status_code = status.HTTP_401_UNAUTHORIZED

        except Exception as e:
            print(e)
            traceback.print_exc()
            self.response_code = c.LOGIN_RESPONSE_CODE[2]
            self.message = c.LOGIN_RESPONSE_MSG[self.response_code]
            self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR

        resp_data = {"resp_msg": self.message, "resp_code": self.response_code, "token": self.session_token}
        return Response(data=resp_data, status=self.status_code, headers=self.resp_header)


class Profile(APIView):
    resp_header = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": '*'
    }
    status_code = None
    profile_data = {}

    def options(self, request, *args, **kwargs):
        self.status_code = status.HTTP_200_OK
        return Response(status=self.status_code,
                        headers=self.resp_header)

    def get(self, request, *args, **kwargs):
        try:
            # Retrieve all data from request
            is_authorized, user_obj = authorize_user_jwt(jwt_token=request.headers['Authorization'])
            if is_authorized:
                wallet = Wallet.objects.get(user=user_obj)
                self.profile_data = {
                    "username": user_obj.name,
                    "email": user_obj.email,
                    "wallet_balance": wallet.amount
                }
                self.status_code = status.HTTP_200_OK
            else:
                self.status_code = status.HTTP_401_UNAUTHORIZED

        except Exception as e:
            print(e)
            traceback.print_exc()

        return Response(data=self.profile_data,
                        status=self.status_code,
                        headers=self.resp_header)

