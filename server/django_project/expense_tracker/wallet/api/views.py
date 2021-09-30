import traceback

import jwt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from expense_tracker import settings
from user.utils import authorize_user_jwt
from wallet.models import Wallet, WalletTransaction


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


class WalletTransactionView(APIView):
    resp_header = {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": '*'
    }
    status_code = None
    result_data = []

    def get(self, request, *args, **kwargs):
        try:

            # Retrieve all data from request
            is_authorized, user_obj = authorize_user_jwt(jwt_token=request.headers['Authorization'])
            if is_authorized:
                # Get all transaction data for a user
                trans_data = WalletTransaction.objects.filter(user=user_obj)
                for data in trans_data:
                    data_row = {
                        'transaction_id': data.transaction_id,
                        'amount': data.amount,
                        'source': data.source,
                        'type': WalletTransaction.TRANSACTION_CODE_TYPE[data.type]
                    }
                    self.result_data.append(data_row)
                self.status_code = status.HTTP_200_OK
            else:
                self.status_code = status.HTTP_401_UNAUTHORIZED

        except Exception as e:
            print(e)
            traceback.print_exc()

        return Response(data={"data_source": self.result_data},
                        status=self.status_code,
                        headers=self.resp_header)

