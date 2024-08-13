
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from .serializer import UserSerializer
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework import status
from .models import CustomUser

from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny






User = get_user_model()

class RegisterUserView(generics.CreateAPIView):
    permission_classes = [AllowAny] 
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    def post(self, request, *args, **kwargs):
        print("Request data:", request.data)  # Debugging
        return super().post(request, *args, **kwargs)


class LoginView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            user_data = {
            'id': user.id,
            'fullname': user.get_full_name(),
            'email': user.email,
            'userType': user.user_type,
            'profilePicture': user.profile_picture.url if user.profile_picture else None  # Handle profile picture URL
        }
            return Response({'token': token.key,'user':user_data}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    def patch(self, request, *args, **kwargs):
        partial = True
        serializer = self.get_serializer(self.get_object(), data=request.data, partial=partial)
        if not serializer.is_valid():
            print("Serializer errors:", serializer.errors)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    




