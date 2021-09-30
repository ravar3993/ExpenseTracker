from django.urls import path
from .views import WalletBalance, WalletTransactionView

urlpatterns = [
    path('balance/', WalletBalance.as_view()),
    path('transactions', WalletTransactionView.as_view())
]