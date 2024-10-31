from django.shortcuts import get_object_or_404
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import GroupMessage, MentorshipRequest, User, IGroup, IActivity
from .serializers import GroupMessageSerializer, MentorshipRequestSerializer, UserSerializer, BasicUserSerializer, IGroupSerializer, IActivitySerializer
from .filters import UserFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from rest_framework import generics
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, Connection, ConnectionRequest, Message
from .serializers import (
    UserSerializer,
    BasicUserSerializer,
    ConnectionRequestSerializer,
    ConnectionSerializer,
    MessageSerializer,
)
from django.db.models import Q, Count, F

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = BasicUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.action in ['partial_update']:
            return User.objects.all()
        search_query = self.request.query_params.get('search', '')
        if not search_query:
            return User.objects.exclude(id=self.request.user.id)
        return User.objects.filter(
            Q(username__icontains=search_query) |
            Q(jobTitle__icontains=search_query) |
            Q(city__icontains=search_query) |
            Q(country__icontains=search_query) |
            Q(interests__icontains=search_query)
        ).exclude(id=self.request.user.id)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def available_mentors(self, request):
        mentors = User.objects.filter(
            isMentor=True
        ).annotate(
            mentee_count=Count('mentees')
        ).filter(
            mentee_count__lt=F('max_mentees')
        )
        serializer = BasicUserSerializer(mentors, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def mentees(self, request):
        user = request.user
        if not user.isMentor:
            return Response({'detail': 'Not a mentor.'}, status=status.HTTP_403_FORBIDDEN)
        mentees = user.mentees.all()
        serializer = BasicUserSerializer(mentees, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def dashboard(self, request, pk=None):
        user = request.user
        mentee = get_object_or_404(User, pk=pk)
        if mentee.mentor != user:
            return Response({'detail': 'You do not have permission to view this user\'s dashboard.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = UserSerializer(mentee)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def mentor(self, request):
        user = request.user
        mentor = user.mentor
        if not mentor:
            return Response({'detail': 'No mentor assigned.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(mentor)
        return Response(serializer.data)
    
class GroupMessageViewSet(viewsets.ModelViewSet):
    queryset = GroupMessage.objects.all()
    serializer_class = GroupMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        group_id = self.request.query_params.get('group_id')
        group = get_object_or_404(IGroup, id=group_id)
        if not group.is_member(self.request.user):
            raise PermissionDenied("You're not a member of this group.")
        return group.messages.all()

    def perform_create(self, serializer):
        group = serializer.validated_data['group']
        if not group.is_member(self.request.user):
            raise PermissionDenied("You're not a member of this group.")
        serializer.save(sender=self.request.user)

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
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"detail": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        username = email.split('@')[0]
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

class ConnectionRequestViewSet(viewsets.ModelViewSet):
    queryset = ConnectionRequest.objects.all()
    serializer_class = ConnectionRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ConnectionRequest.objects.filter(recipient=self.request.user, status='pending')

    def create(self, request):
        recipient_id = request.data.get('recipient_id')
        if not recipient_id:
            return Response({'error': 'Recipient ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        recipient = User.objects.get(id=recipient_id)
        if ConnectionRequest.objects.filter(sender=request.user, recipient=recipient).exists():
            return Response({'error': 'Connection request already sent.'}, status=status.HTTP_400_BAD_REQUEST)
        ConnectionRequest.objects.create(sender=request.user, recipient=recipient)
        return Response({'status': 'Connection request sent.'}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def accept(self, request):
        print(request, "<----------------")
        request_id = request.data.get('request_id')
        connection_request = ConnectionRequest.objects.get(id=request_id, recipient=request.user)
        connection_request.status = 'accepted'
        connection_request.save()
        Connection.objects.create(user1=request.user, user2=connection_request.sender)
        return Response({'status': 'Connection accepted.'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def reject(self, request):
        request_id = request.data.get('request_id')
        connection_request = ConnectionRequest.objects.get(id=request_id, recipient=request.user)
        connection_request.status = 'rejected'
        connection_request.save()
        return Response({'status': 'Connection rejected.'}, status=status.HTTP_200_OK)

class ConnectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Connection.objects.all()
    serializer_class = BasicUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        connections = Connection.objects.filter(
            Q(user1=self.request.user) | Q(user2=self.request.user)
        )

        connected_user_ids = connections.values_list('user1', 'user2')
        connected_user_ids = set(
            uid for pair in connected_user_ids for uid in pair if uid != self.request.user.id
        )
        print(connected_user_ids,User.objects.filter(id__in=connected_user_ids))

        return User.objects.filter(id__in=connected_user_ids)

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        return Message.objects.filter(
            (Q(sender=self.request.user) & Q(recipient__id=user_id)) |
            (Q(sender__id=user_id) & Q(recipient=self.request.user))
        ).order_by('sent_at')

    def create(self, request):
        recipient_id = request.data.get('recipient_id')
        content = request.data.get('content')
        recipient = User.objects.get(id=recipient_id)
        message = Message.objects.create(sender=request.user, recipient=recipient, content=content)
        serializer = self.get_serializer(message)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class MentorshipRequestViewSet(viewsets.ModelViewSet):
    queryset = MentorshipRequest.objects.all()
    serializer_class = MentorshipRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if self.action == 'list':
            return MentorshipRequest.objects.filter(mentor=user, status='pending')
        return MentorshipRequest.objects.none()

    def create(self, request):
        mentor_id = request.data.get('mentor_id')
        if not mentor_id:
            return Response({'error': 'Mentor ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            mentor = User.objects.get(id=mentor_id, isMentor=True)
        except User.DoesNotExist:
            return Response({'error': 'Mentor not found.'}, status=status.HTTP_404_NOT_FOUND)
        if MentorshipRequest.objects.filter(sender=request.user, mentor=mentor).exists():
            return Response({'error': 'Mentorship request already sent.'}, status=status.HTTP_400_BAD_REQUEST)
        MentorshipRequest.objects.create(sender=request.user, mentor=mentor)
        return Response({'status': 'Mentorship request sent.'}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def accept(self, request):
        request_id = request.data.get('request_id')
        mentorship_request = MentorshipRequest.objects.get(id=request_id, mentor=request.user)
        mentorship_request.status = 'accepted'
        mentorship_request.save()
        mentee = mentorship_request.sender
        mentee.mentor = request.user
        mentee.save()
        return Response({'status': 'Mentorship request accepted.'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def reject(self, request):
        request_id = request.data.get('request_id')
        mentorship_request = MentorshipRequest.objects.get(id=request_id, mentor=request.user)
        mentorship_request.status = 'rejected'
        mentorship_request.save()
        return Response({'status': 'Mentorship request rejected.'}, status=status.HTTP_200_OK)