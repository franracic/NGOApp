from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from users.models import IGroup
from users.serializers import IGroupSerializer
from .models import IEvent, IResource, Notification, TrophyTemplate
from .serializers import (
    IEventSerializer,
    IResourceSerializer,
    IDiscussionSerializer,
    NotificationSerializer,
    TrophyTemplateSerializer,
    UserTrophySerializer,
)
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from rest_framework import viewsets, permissions
from .models import Trophy, UserInput
from courses.models import IComment, IDiscussion
from courses.serializers import CommentSerializer
from .serializers import UserInputSerializer

class IResourceViewSet(viewsets.ModelViewSet):
    queryset = IResource.objects.all()
    serializer_class = IResourceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticatedOrReadOnly])
    def like(self, request, pk=None):
        resource = self.get_object()
        user = request.user
        if user in resource.likes.all():
            resource.likes.remove(user)
            return Response({'status': 'resource unliked'})
        else:
            resource.likes.add(user)
            return Response({'status': 'resource liked'})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def increment_views(self, request, pk=None):
        resource = self.get_object()
        resource.views += 1
        resource.save()
        return Response({'status': 'views incremented', 'views': resource.views})
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def get_multiple(self, request):
        ids = request.data.get('ids', [])
        if not ids:
            return Response({'detail': 'No IDs provided.'}, status=status.HTTP_400_BAD_REQUEST)

        resources = IResource.objects.filter(id__in=ids)
        if not resources.exists():
            return Response({'detail': 'Resources not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(resources, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TrophyViewSet(viewsets.ModelViewSet):
    queryset = Trophy.objects.all()
    serializer_class = UserTrophySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Trophy.objects.filter(user=self.request.user)

class UserInputViewSet(viewsets.ModelViewSet):
    queryset = UserInput.objects.all()
    serializer_class = UserInputSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.method in permissions.SAFE_METHODS:
            return UserInput.objects.all()
        else:
            return UserInput.objects.filter(user=self.request.user)

class IDiscussionViewSet(viewsets.ModelViewSet):
    queryset = IDiscussion.objects.all()
    serializer_class = IDiscussionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticatedOrReadOnly])
    def comments(self, request, pk=None):
        discussion = self.get_object()
        comments = discussion.comments.filter(parent__isnull=True).order_by('-timestamp')
        serializer = CommentSerializer(comments, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_comment(self, request, pk=None):
        discussion = self.get_object()
        content = request.data.get('content')
        parent_id = request.data.get('parent_id')
        parent = None
        if parent_id:
            parent = IComment.objects.get(id=parent_id)

        comment = IComment.objects.create(
            discussion=discussion,
            user=request.user,
            content=content,
            parent=parent
        )
        serializer = CommentSerializer(comment, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class TrophyTemplateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TrophyTemplate.objects.all()
    serializer_class = TrophyTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def with_user_progress(self, request):
        user = request.user
        trophy_templates = TrophyTemplate.objects.all()
        user_trophies = {t.trophy_template_id: t for t in Trophy.objects.filter(user=user)}

        trophy_data = []
        for trophy_template in trophy_templates:
            user_trophy = user_trophies.get(trophy_template.id)
            trophy_info = {
                'id': trophy_template.id,
                'title': trophy_template.title,
                'description': trophy_template.description,
                'icon': trophy_template.icon,
                'trophy_type': trophy_template.trophy_type,
                'target_value': trophy_template.target_value,
                'difficulty': trophy_template.difficulty,
                'progress': user_trophy.progress if user_trophy else 0,
                'is_earned': user_trophy.is_earned if user_trophy else False,
            }
            trophy_data.append(trophy_info)

        return Response(trophy_data)

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(recipient=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def markRead(self, request, pk=None):
        try:
            notification = self.get_object()
            notification.is_read = True
            notification.save()

            return Response({'status': 'Notification marked as read.'}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({'detail': 'Notification not found.'}, status=status.HTTP_404_NOT_FOUND)
        
class IGroupViewSet(viewsets.ModelViewSet):
    queryset = IGroup.objects.all()
    serializer_class = IGroupSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.action in ['list', 'retrieve', 'join', 'leave']:
            return IGroup.objects.all()
        return IGroup.objects.filter(members=self.request.user)

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        try:
            group = self.get_object()
        except IGroup.DoesNotExist:
            return Response({'detail': 'Group not found.'}, status=status.HTTP_404_NOT_FOUND)

        if group.is_member(request.user):
            return Response({'detail': 'Already a member.'}, status=status.HTTP_400_BAD_REQUEST)

        group.members.add(request.user)
        return Response({'status': 'Joined the group.'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        group = self.get_object()
        if not group.is_member(request.user):
            return Response({'detail': 'Not a member.'}, status=status.HTTP_400_BAD_REQUEST)
        group.members.remove(request.user)
        return Response({'status': 'Left the group.'}, status=status.HTTP_200_OK)
    

class IEventViewSet(viewsets.ModelViewSet):
    queryset = IEvent.objects.all()
    serializer_class = IEventSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def attend(self, request, pk=None):
        event = self.get_object()
        user = request.user
        if event.attendees.filter(id=user.id).exists():
            return Response({'detail': 'You are already attending this event.'}, status=status.HTTP_400_BAD_REQUEST)
        event.attendees.add(user)
        return Response({'status': 'You are now attending this event.'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unattend(self, request, pk=None):
        event = self.get_object()
        user = request.user
        if not event.attendees.filter(id=user.id).exists():
            return Response({'detail': 'You are not attending this event.'}, status=status.HTTP_400_BAD_REQUEST)
        event.attendees.remove(user)
        return Response({'status': 'You are no longer attending this event.'}, status=status.HTTP_200_OK)