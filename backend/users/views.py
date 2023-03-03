from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404

from .serializers import UserSerializer
from .models import User
import jwt
import datetime

# Create your views here.


class UsersView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CreateUserView(APIView):
    # permission_classes=[AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        if email.isnumeric():
            user = get_object_or_404(User, id=email)
        else:
            user = get_object_or_404(User, email=email.lower())

        if user is None:
            raise AuthenticationFailed("User not found!")
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            "jwt": token
        }

        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed("unauthenticated! (NO TOKEN)")

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            print(payload)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("unauthenticated! (EXPIRED)")

        user = get_object_or_404(User, id=payload['id'])
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            "message": "success"
        }
        return response
