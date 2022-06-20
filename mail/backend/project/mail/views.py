from asyncio.windows_events import NULL
from django.shortcuts import render
from .apps import ClassifierConfig
# Create your views here.
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer, LoginSerializer, EmailSerializers
from .models import User,Email
from django.http import HttpResponse, JsonResponse

class Register(APIView):
    permission_classes = (AllowAny,)
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data = request.data) 
        if serializer.is_valid():
            serializer.save()    
            
            Response.status_code = 200
        
            return Response({
            
                "message":"User Registered sucessfully",
                  
            }
            )
        Response.status_code = 400
        return Response({
            "message":serializer.errors,
            
        })

class Login(APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data = request.data)

        if serializer.is_valid():
            user = serializer.validated_data
            Response.status_code = 200
            try:
                token = Token.objects.get(user = user)
            except:
                token = Token.objects.create(user = user)
            return Response({
            "message":"User logged in sucessfully.",
            "username": user.username,
            "Token": token.key,
            "user_id": user.id,
        })

        Response.status_code = 400
        return Response({
            "message":serializer.errors,
            
        })


class Compose(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = EmailSerializers(data = request.data)
        if serializer.is_valid():
            emails = serializer.data["recipients"]
            if emails == []:
                Response.status_code = 400
                return Response({
                    "error": "At least one recipient required."
                })
            recipients = []
            for email in emails:
                try:
                    user = User.objects.get(email=email)
                    recipients.append(user)
                except User.DoesNotExist:
                    Response.status_code = 400
                    return Response({
                        "error": f"User with email {email} does not exist."
                    })
            subject = serializer.data["subject"]
            body = serializer.data["body"]

            users = set()
            users.add(request.user)
            users.update(recipients)
            for user in users:
                email = Email(
                
                    user = user,
                    sender=request.user,
                    subject=subject,
                    body=body,
                    read=user == request.user
                )
                email.save()
                for recipient in recipients:
                    email.recipients.add(recipient)
                email.save()
            Response.status_code = 201
            return Response({"message": "Email sent successfully."})

        Response.status_code = 400
        return Response({"message": serializer.errors})

class Mailbox(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, mailbox, *args, **kwargs):
        if mailbox == "inbox":
            emails = Email.objects.filter(recipients__in = [request.user], user = request.user).distinct()
            
        elif mailbox == "sent":
            emails = Email.objects.filter(
                sender=request.user, user = request.user
            )
        
        elif mailbox == "archive":
            emails = Email.objects.filter(recipients__in = [request.user], archived = True, user = request.user).distinct()            

        else:
            Response.status_code = 400
            return Response({"errors":"Invalid Mailbox"})

        serializer = EmailSerializers(emails, many = True)
        return Response(serializer.data)

class EmailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request,email_id, *args, **kwargs):
        try:
            email = Email.objects.get(user=request.user, pk=email_id)
        except Email.DoesNotExist:
            Response.status_code = 404
            return Response({"error": "Email not found."})
        
        serializer = EmailSerializers(email)
        return Response(serializer.data)


class Predict(APIView):
    def get(self,request):
        mail = request.GET.get('mail')
        vector = ClassifierConfig.vectorizer.transform([mail])
        prediction = ClassifierConfig.classifier.predict(vector)[0]
        prediction = int(prediction)
        print(prediction)
        response = {'SpamorNot': prediction}            
        return JsonResponse(response)