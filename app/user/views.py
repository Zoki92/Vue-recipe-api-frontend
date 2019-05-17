from .serializers import UserSerializer, AuthTokenSerializer
from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token


class CreateUserView(generics.CreateAPIView):
    # Create a new user in the system
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    # Create a new auth token for user
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    # Manage the authenticated user
    serializer_class = UserSerializer
    authentication_class = (authentication.TokenAuthentication,)

    def get_object(self):
        # retrieve and return authenticated user
        request_token = self.request.META['HTTP_AUTHORIZATION'].split(" ")[1]
        token = Token.objects.filter(
            key=request_token)

        user = token[0].user

        return user
