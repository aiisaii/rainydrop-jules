from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

user = User.objects.get(username='testuser3')
uid = urlsafe_base64_encode(force_bytes(user.pk))
token = default_token_generator.make_token(user)
verification_url = f"http://localhost:8000/api/verify-email/{uid}/{token}/"
print(verification_url)
