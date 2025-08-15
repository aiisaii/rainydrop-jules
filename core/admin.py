from django.contrib import admin
from .models import (
    UserProfile,
    Category,
    Tag,
    Bookmark,
    Influencer,
    Torrent,
    Collection,
    SharedCollection,
    PublicLink,
)

admin.site.register(UserProfile)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Bookmark)
admin.site.register(Influencer)
admin.site.register(Torrent)
admin.site.register(Collection)
admin.site.register(SharedCollection)
admin.site.register(PublicLink)
