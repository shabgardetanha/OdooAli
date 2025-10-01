from django.contrib import admin
from django.urls import path, include

from accounts.views import health

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
]
