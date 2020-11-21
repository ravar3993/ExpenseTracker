import traceback
from expense_tracker import constants as c
from rest_framework import status
from rest_framework.response import Response
from .utils import register_user, check_user_exists, validate_user
from rest_framework.views import APIView


class SignUp(APIView):
    headers = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": '*'
    }
    message = None
    response_code = None
    status_code = None

    def post(self, request, *args, **kwargs):
        try:
            if request.data['password'] != request.data['confirm_password']:
                self.message = c.LOGIN_RESPONSE_MSG[2]
                self.status_code = status.HTTP_400_BAD_REQUEST
                self.response_code = c.LOGIN_RESPONSE_CODE[self.message]
            elif request.data['email'] and request.data['username'] and request.data['password']:
                if not check_user_exists(request.data):
                    user_registered = register_user(request.data)
                    if user_registered:
                        self.message = c.LOGIN_RESPONSE_MSG[4]
                        self.status_code = status.HTTP_200_OK
                        self.response_code = c.LOGIN_RESPONSE_CODE[self.message]
                    else:
                        self.message = c.LOGIN_RESPONSE_MSG[5]
                        self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
                        self.response_code = c.LOGIN_RESPONSE_CODE[self.message]
                else:
                    self.message = c.LOGIN_RESPONSE_MSG[3]
                    self.status_code = status.HTTP_200_OK
                    self.response_code = c.LOGIN_RESPONSE_CODE[self.message]
            else:
                self.message = c.LOGIN_RESPONSE_MSG[6]
                self.status_code = status.HTTP_400_BAD_REQUEST
                self.response_code = c.LOGIN_RESPONSE_CODE[self.message]
        except Exception as e:
            print(e)
            traceback.print_exc()
            message = c.LOGIN_RESPONSE_MSG[7]
            self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            self.response_code = c.LOGIN_RESPONSE_CODE[message]

        return Response(data={"resp_msg": self.message, "resp_code": self.response_code},
                        status=self.status_code,
                        headers=self.headers)


class SignIn(APIView):
    headers = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": '*'
    }
    message = None
    response_code = None
    status_code = None

    def post(self, request, *args, **kwargs):
        try:
            if validate_user(request.data):
                self.message = c.LOGIN_RESPONSE_MSG[0]
                self.response_code = c.LOGIN_RESPONSE_CODE[self.message]
                self.status_code = status.HTTP_200_OK
            else:
                self.message = c.LOGIN_RESPONSE_MSG[1]
                self.response_code = c.LOGIN_RESPONSE_CODE[self.message]
                self.status_code = status.HTTP_200_OK

        except Exception as e:
            print(e)
            traceback.print_exc()
            self.message = c.LOGIN_RESPONSE_MSG[2]
            self.response_code = c.LOGIN_RESPONSE_CODE[self.message]
            self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR

        return Response(data={"resp_msg": self.message, "resp_code": self.response_code},
                        status=self.status_code,
                        headers=self.headers)



