from rest_framework import serializers
from .models import Authentication, User

class ListUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'gender', 'qualification', 'occupation']


class AuthenticationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Authentication
        fields = ['first_name', 'last_name', 'email', 'password']


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'email','phone', 'gender', 'qualification', 'occupation']


