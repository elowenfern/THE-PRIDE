
from rest_framework import serializers
from main.models import CustomUser

class AdminCustomSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'mobile_no', 'user_type', 'qualification', 'skills','is_active', 'profile_picture']
        extra_kwargs = {
            'profile_picture': {'required': False}  # Optional field
        }
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
