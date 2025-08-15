from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView,
    LogoutView,
    VerifyEmailView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    CategoryViewSet,
    TagViewSet,
    BookmarkViewSet,
    InfluencerViewSet,
    TorrentViewSet,
    MergeTagsView,
    TagAutocompleteView,
    CollectionViewSet,
    SharedCollectionViewSet,
    PublicLinkViewSet,
    ImportView,
    ExportView,
)
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'bookmarks', BookmarkViewSet, basename='bookmark')
router.register(r'influencers', InfluencerViewSet, basename='influencer')
router.register(r'torrents', TorrentViewSet, basename='torrent')
router.register(r'collections', CollectionViewSet, basename='collection')
router.register(r'shared-collections', SharedCollectionViewSet, basename='shared-collection')
router.register(r'public-links', PublicLinkViewSet, basename='public-link')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', obtain_auth_token, name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify-email'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('merge-tags/', MergeTagsView.as_view(), name='merge-tags'),
    path('tags-autocomplete/', TagAutocompleteView.as_view(), name='tags-autocomplete'),
    path('import/', ImportView.as_view(), name='import'),
    path('export/', ExportView.as_view(), name='export'),
]
