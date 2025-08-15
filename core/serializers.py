from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from rest_framework import serializers
from .models import Category, Tag, Bookmark, Influencer, Torrent, Collection, SharedCollection, PublicLink

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=False
        )
        # Send verification email
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        verification_url = f"http://localhost:8000/api/verify-email/{uid}/{token}/"
        message = f"Hello {user.username},\n\nPlease click the following link to verify your email address:\n{verification_url}"
        send_mail(
            'Verify your email address',
            message,
            'from@example.com',
            [user.email],
            fail_silently=False,
        )
        return user

class PasswordResetSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ('user',)

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'
        read_only_fields = ('user',)

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'
        read_only_fields = ('user',)

class InfluencerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Influencer
        fields = '__all__'
        read_only_fields = ('user',)

class TorrentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Torrent
        fields = '__all__'
        read_only_fields = ('user',)

class MergeTagsSerializer(serializers.Serializer):
    source_tags = serializers.ListField(
        child=serializers.IntegerField()
    )
    target_tag = serializers.IntegerField()

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'
        read_only_fields = ('user',)

class SharedCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedCollection
        fields = '__all__'

class PublicLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicLink
        fields = '__all__'
