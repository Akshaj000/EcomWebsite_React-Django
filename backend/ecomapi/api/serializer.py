from rest_framework import  serializers
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth import get_user_model
from ..models import Customer
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

UserModel = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = UserModel.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        Customer.objects.create(user=user)
        return user

    class Meta:
        model = UserModel
        fields = ( "id", "username", "password", )


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)