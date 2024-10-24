"""
URL configuration for QueryWise_App project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from app.views import ChatAPIView  # Asegúrate de importar la vista de tu API

urlpatterns = [
    path("admin/", admin.site.urls),
    path('oauth2/', include('django_auth_adfs.urls')),
    path("", include("app.urls")),
    path('api-auth/', include('rest_framework.urls')),
    path('api/chat/', ChatAPIView.as_view(), name='chat-api'),  # Ruta para tu API de chat
]
