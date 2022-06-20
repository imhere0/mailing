from dataclasses import fields
import email
from time import strftime
from rest_framework import serializers
from .models import User, Email
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator
from django.db import IntegrityError

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True
            )

    class Meta:
        model = User
        fields = ['id','email', 'password','username']
        write_only_fields = ['password']
        read_only_fields = ['id']

    def create(self, validated_data):        
        user = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            password = make_password(validated_data['password'])
            ) 
        return user

    def validate_email(self, value):
        try:
            user=User.objects.get(email = value)
        except:
            return value
        raise serializers.ValidationError("A user with this email already exist")    
    
    def validate_username(self, value):
        try:
            user=User.objects.get(username = value)
        except:
            return value
        raise serializers.ValidationError("A user with this email already exist")


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        email = data.get("email", None)
        password = data.get("password", None)
        try:
            user = User.objects.get(email = email)
        except:
            raise serializers.ValidationError('A user with this email is not found.')
        if user.check_password(password):
            return user
        else:
            raise serializers.ValidationError('The combination of email and password did not match.')

        
class EmailSerializers(serializers.ModelSerializer):
    
    recipients = serializers.SlugRelatedField(many = True, slug_field='email', queryset = User.objects.all())
    sender = serializers.SlugRelatedField(slug_field='email', read_only = True)
    timestamp = serializers.DateTimeField(format= '%m/%d/%Y %H:%M:%S',read_only = True)
    class Meta:
        model = Email
        fields = ['id','sender','subject','body','recipients','read','archived','timestamp', 'user']
        read_only_fields = ['sender', 'timestamp','id']
    

    
    


        
         
    
   
        

    
