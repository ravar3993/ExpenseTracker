import traceback
from expense_tracker import constants as c
from rest_framework import status
from rest_framework.response import Response
from .utils import register_user, check_user_exists, validate_user
from rest_framework.views import APIView


class SignUp(APIView):
    resp_header = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": '*'
    }
    message = None
    response_code = None
    status_code = None

    def post(self, request, *args, **kwargs):
        try:
            if request.data['password'] != request.data['confirm_password']:
                self.response_code = c.LOGIN_RESPONSE_CODE[2]
                self.status_code = status.HTTP_400_BAD_REQUEST
                self.message = c.LOGIN_RESPONSE_MSG[self.response_code]
            elif request.data['email'] and request.data['username'] and request.data['password']:
                if not check_user_exists(request.data):
                    user_registered = register_user(request.data)
                    if user_registered:
                        self.response_code = c.LOGIN_RESPONSE_CODE[4]
                        self.status_code = status.HTTP_200_OK
                        self.message = c.LOGIN_RESPONSE_MSG[self.response_code]
                    else:
                        self.response_code = c.LOGIN_RESPONSE_CODE[5]
                        self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
                        self.message = c.LOGIN_RESPONSE_MSG[self.response_code]
                else:
                    self.response_code = c.LOGIN_RESPONSE_CODE[3]
                    self.status_code = status.HTTP_200_OK
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

        return Response(data={"resp_msg": self.message, "resp_code": self.response_code},
                        status=self.status_code,
                        headers=self.resp_header)


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
                self.status_code = status.HTTP_200_OK

        except Exception as e:
            print(e)
            traceback.print_exc()
            self.response_code = c.LOGIN_RESPONSE_CODE[2]
            self.message = c.LOGIN_RESPONSE_MSG[self.response_code]
            self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR

        resp_data = {"resp_msg": self.message, "resp_code": self.response_code, "token": self.session_token}
        return Response(data=resp_data, status=self.status_code, headers=self.resp_header)



