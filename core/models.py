from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    USER_ROLES = (
        ('admin', 'Admin'),
        ('member', 'Member'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=USER_ROLES, default='member')

    def __str__(self):
        return self.user.username


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=255, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True) # Null for default categories

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Bookmark(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    url = models.URLField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Influencer(models.Model):
    name = models.CharField(max_length=255)
    avatar = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    social_links = models.JSONField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bookmarks = models.ManyToManyField(Bookmark, blank=True)

    def __str__(self):
        return self.name


class Torrent(models.Model):
    magnet_link = models.URLField()
    metadata = models.JSONField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bookmarks = models.ManyToManyField(Bookmark, blank=True)

    def __str__(self):
        return self.magnet_link

class Collection(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bookmarks = models.ManyToManyField(Bookmark, blank=True)

    def __str__(self):
        return self.name

class SharedCollection(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    shared_with = models.ForeignKey(User, on_delete=models.CASCADE)
    permission = models.CharField(max_length=10, choices=[('read', 'Read'), ('write', 'Write')])

    class Meta:
        unique_together = ('collection', 'shared_with')

class PublicLink(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    token = models.CharField(max_length=32, unique=True)
    password = models.CharField(max_length=128, blank=True, null=True)
    expiration_date = models.DateTimeField(blank=True, null=True)
