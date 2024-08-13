# main/urls.py

from django.urls import path,include
from .views import RegisterUserView, UserDetailView, LoginView




urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('user/', UserDetailView.as_view(), name='user'),
    path('login/', LoginView.as_view(), name='login'),
    
]

