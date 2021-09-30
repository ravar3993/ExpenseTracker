from django.urls import path
from .views import SignIn, SignUp, Profile

urlpatterns = [
    path('sign_up/', SignUp.as_view()),
    path('sign_in/', SignIn.as_view()),
    path('profile/', Profile.as_view()),
]
