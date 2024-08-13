from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from main.models import CustomUser
from rest_framework.permissions import AllowAny
from .serializer import AdminCustomSerializers
from rest_framework.permissions import IsAdminUser,IsAuthenticated

class AdminLogin(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({'error': 'Both email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = CustomUser.objects.get(email=email, is_staff=True)
        except CustomUser.DoesNotExist:
            return Response({'error': 'Admin Access is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.check_password(password):
            return Response({'error': 'Incorrect Password'}, status=status.HTTP_400_BAD_REQUEST)
        
        token, created = Token.objects.get_or_create(user=user)
        user_data = {
            'id': user.id,
            'fullname': user.get_full_name(),
            'email': user.email,
            'userType': user.user_type,
            'profilePicture': user.profile_picture.url if user.profile_picture else None  # Handle profile picture URL
        }
        
        return Response({'token': token.key, 'user': user_data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)
    except (AttributeError, Token.DoesNotExist):
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class StudentListView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        # Filter users with user_type 'student'
        students = CustomUser.objects.filter(user_type='student')
        serializer = AdminCustomSerializers(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TeacherListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # Filter users with user_type 'teacher'
        teachers = CustomUser.objects.filter(user_type='teacher')
        serializer = AdminCustomSerializers(teachers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class AdminUpdateUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request, pk):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        mobile_no = request.data.get('mobile_no')  # Update mobile_no instead of phone

        user_obj = CustomUser.objects.filter(pk=pk).first()
        if user_obj:
            if first_name is not None:
                user_obj.first_name = first_name
            if last_name is not None:
                user_obj.last_name = last_name
            if email is not None:
                user_obj.email = email
            if mobile_no is not None:
                user_obj.mobile_no = mobile_no
            user_obj.save()
            return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class AdminBlockUser(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        user_obj = CustomUser.objects.filter(pk=pk).first()
        if user_obj:
            name = user_obj.get_full_name() 
            user_obj.is_active = False
            user_obj.save()
            return Response({"message": f"User {name} has been blocked successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class AdminUnblockUser(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        user_obj = CustomUser.objects.filter(pk=pk).first()
        if user_obj:
            name = user_obj.get_full_name() 
            user_obj.is_active = True
            user_obj.save()
            return Response({"message": f"User {name} has been unblocked successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
# class AdminSearchUser(APIView):
#     def get(self,request):
#         name = request.query_params.get('name')
#         name = name.strip()
#         if not name:
#             user_obj = CustomUser.objects.filter(is_staff=False)
#         else:
#             user_obj = CustomUser.objects.filter(Q(first_name__icontains=name) | Q(last_name__icontains=name) | Q(email__icontains=name),is_staff = False)
#         serializer = AdminCustomSerializers(user_obj,many=True)
#         return Response(serializer.data)
        
