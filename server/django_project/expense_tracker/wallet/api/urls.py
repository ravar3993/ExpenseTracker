from django.urls import path
from .views import WalletBalance

urlpatterns = [
    path('balance/', WalletBalance.as_view())
]