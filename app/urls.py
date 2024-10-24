from django.urls import path
from . import views

urlpatterns = [
    path("home", views.login_successfull, name="home"),
    path("", views.index, name="index"),
]