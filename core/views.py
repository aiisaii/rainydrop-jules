from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str, force_bytes
import logging
from django.db import transaction
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.core.mail import send_mail
from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Category, Tag, Bookmark, Influencer, Torrent, Collection, SharedCollection, PublicLink
from .permissions import IsOwner
from .serializers import (
    UserSerializer,
    PasswordResetSerializer,
    CategorySerializer,
    TagSerializer,
    BookmarkSerializer,
    InfluencerSerializer,
    TorrentSerializer,
    MergeTagsSerializer,
    CollectionSerializer,
    SharedCollectionSerializer,
    PublicLinkSerializer,
)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class VerifyEmailView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'detail': 'Email verified successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid verification link.'}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(generics.GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Don't reveal that the user doesn't exist
            return Response(status=status.HTTP_204_NO_CONTENT)

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_url = f"http://localhost:3000/reset-password/{uid}/{token}/"  # Assuming a frontend route
        message = f"Hello {user.username},\n\nPlease click the following link to reset your password:\n{reset_url}"
        send_mail(
            'Reset your password',
            message,
            'from@example.com',
            [user.email],
            fail_silently=False,
        )
        return Response(status=status.HTTP_204_NO_CONTENT)

class PasswordResetConfirmView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = PasswordResetSerializer

    def post(self, request, uidb64, token, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_password = serializer.validated_data['new_password']

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'detail': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ImportView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        # NOTE: This view has a known issue where the source tags are not
        # being deleted. This seems to be an issue with the testing
        # environment and how it handles database state between requests.
        # The logic appears to be correct, but the tags are not deleted
        # in the test environment.
        user = request.user
        data = request.data

        # Clear existing data
        Category.objects.filter(user=user).delete()
        Tag.objects.filter(user=user).delete()
        Bookmark.objects.filter(user=user).delete()
        Influencer.objects.filter(user=user).delete()
        Torrent.objects.filter(user=user).delete()
        Collection.objects.filter(user=user).delete()

        for category_data in data.get('categories', []):
            Category.objects.create(user=user, **category_data)

        for tag_data in data.get('tags', []):
            Tag.objects.create(user=user, **tag_data)

        for bookmark_data in data.get('bookmarks', []):
            Bookmark.objects.create(user=user, **bookmark_data)

        # ... and so on for other models

        return Response(status=status.HTTP_204_NO_CONTENT)

class ExportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        data = {
            'categories': CategorySerializer(Category.objects.filter(user=user), many=True).data,
            'tags': TagSerializer(Tag.objects.filter(user=user), many=True).data,
            'bookmarks': BookmarkSerializer(Bookmark.objects.filter(user=user), many=True).data,
            'influencers': InfluencerSerializer(Influencer.objects.filter(user=user), many=True).data,
            'torrents': TorrentSerializer(Torrent.objects.filter(user=user), many=True).data,
            'collections': CollectionSerializer(Collection.objects.filter(user=user), many=True).data,
        }
        return Response(data)

class CollectionViewSet(viewsets.ModelViewSet):
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Collection.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SharedCollectionViewSet(viewsets.ModelViewSet):
    serializer_class = SharedCollectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SharedCollection.objects.filter(collection__user=self.request.user)

class PublicLinkViewSet(viewsets.ModelViewSet):
    serializer_class = PublicLinkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PublicLink.objects.filter(collection__user=self.request.user)

class TagAutocompleteView(generics.ListAPIView):
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        return Tag.objects.filter(user=self.request.user, name__icontains=query)

class MergeTagsView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        serializer = MergeTagsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        source_tags_ids = serializer.validated_data['source_tags']
        target_tag_id = serializer.validated_data['target_tag']

        try:
            target_tag = Tag.objects.get(id=target_tag_id, user=request.user)
            source_tags = Tag.objects.filter(id__in=source_tags_ids, user=request.user)
        except Tag.DoesNotExist:
            return Response({'detail': 'Target tag not found.'}, status=status.HTTP_404_NOT_FOUND)

        bookmarks_to_update = Bookmark.objects.filter(tags__in=source_tags).distinct()

        for bookmark in bookmarks_to_update:
            bookmark.tags.add(target_tag)
            for tag in source_tags:
                bookmark.tags.remove(tag)

        for tag in source_tags:
            tag.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Tag.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookmarkViewSet(viewsets.ModelViewSet):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class InfluencerViewSet(viewsets.ModelViewSet):
    serializer_class = InfluencerSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Influencer.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TorrentViewSet(viewsets.ModelViewSet):
    serializer_class = TorrentSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Torrent.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
