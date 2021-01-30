import traceback

import jwt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from expense_tracker import settings
from user.utils import authorize_user_jwt
from wallet.models import Wallet


class WalletBalance(APIView):
    resp_header = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": '*'
    }
    balance = None
    status_code = None

    def get(self, request, *args, **kwargs):
        try:
            # Retrieve all data from request
            is_authorized, user_obj = authorize_user_jwt(jwt_token=request.headers['Authorization'])
            if is_authorized:
                wallet = Wallet.objects.get(user=user_obj)
                self.balance = wallet.amount
                self.status_code = status.HTTP_200_OK
            else:
                self.status_code = status.HTTP_401_UNAUTHORIZED

        except Exception as e:
            print(e)
            traceback.print_exc()

        return Response(data={"balance": self.balance},
                        status=self.status_code,
                        headers=self.resp_header)

    def post(self, request, *args, **kwargs):
        try:
            new_balance = request.data['wallet_balance']
            # Retrieve all data from request
            is_authorized, user_obj = authorize_user_jwt(jwt_token=request.headers['Authorization'])
            if is_authorized:
                wallet = Wallet.objects.get(user=user_obj)
                wallet.amount = new_balance
                wallet.save()
                self.balance = wallet.amount
                self.status_code = status.HTTP_200_OK
            else:
                self.status_code = status.HTTP_401_UNAUTHORIZED

        except Exception as e:
            print(e)
            traceback.print_exc()

        return Response(data={"balance": self.balance},
                        status=self.status_code,
                        headers=self.resp_header)
