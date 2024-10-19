from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import User, IGroup, IActivity
from .serializers import UserSerializer, IGroupSerializer, IActivitySerializer
from .filters import UserFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from rest_framework import generics
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = LargeResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = UserFilter
    search_fields = ['username', 'bio', 'expertise']
    ordering_fields = ['level', 'experiencePoints', 'connectionsCount']
    permission_classes = [AllowAny]

class IGroupViewSet(viewsets.ModelViewSet):
    queryset = IGroup.objects.all()
    serializer_class = IGroupSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['level']
    search_fields = ['name', 'description']
    ordering_fields = ['members', 'level']

class IActivityViewSet(viewsets.ModelViewSet):
    queryset = IActivity.objects.all()
    serializer_class = IActivitySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['userId', 'action', 'timestamp']
    search_fields = ['username', 'action']
    ordering_fields = ['timestamp']

class ValidateEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({"available": False, "message": "Email is already in use."}, status=status.HTTP_200_OK)
        else:
            return Response({"available": True, "message": "Email is available."}, status=status.HTTP_200_OK)
        

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('email').split('@')[0]
        password = request.data.get('password')

        if not username or not password:
            return Response({"detail": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        request.data["name"] = request.data["username"]
        request.data["username"] = request.data["email"].split('@')[0]


        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        response_data = serializer.data
        return Response(response_data, status=status.HTTP_201_CREATED)
    
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)