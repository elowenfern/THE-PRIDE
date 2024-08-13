from rest_framework import serializers
from .models import CustomUser  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','username', 'email', 'password', 'user_type', 'profile_picture', 'qualification', 'skills', 'mobile_no']
        extra_kwargs = {
            'password': {'write_only': True},
            'profile_picture': {'required': False} 
        }
    
    def validate_email(self, value):
        if self.instance and self.instance.email == value:
            return value
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url
        return None
    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            user_type=validated_data['user_type']
        )
        user.set_password(validated_data['password'])
        if 'profile_picture' in validated_data:
            user.profile_picture = validated_data['profile_picture']
        user.save()
        return user
    def update(self, instance, validated_data):
        email = validated_data.get('email', None)
        if email and email != instance.email:
            if CustomUser.objects.filter(email=email).exists():
                raise serializers.ValidationError({'email': 'A user with this email already exists.'})
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
    
