from .views import Register, Login, Compose, Mailbox, EmailView, Predict

from django.urls import path

urlpatterns = [
    
    path('register',Register.as_view(), name = "register"),
    path('login',Login.as_view(), name = "login"),
    path('compose', Compose.as_view(), name = "compose"),
    path('mailbox/<str:mailbox>',Mailbox.as_view(), name = "mailbox"),
    path('emailview/<int:email_id>', EmailView.as_view(), name = "emailview"),
    path('predict/',Predict.as_view(), name = "predict"),
]