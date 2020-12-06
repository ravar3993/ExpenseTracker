from django.urls import path
from .views import GetWalletBalance

urlpatterns = [
    path('balance/', GetWalletBalance.as_view())
]