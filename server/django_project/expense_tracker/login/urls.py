from django.urls import path, include

urlpatterns = [
    path('api/', include('login.api.urls'))
]