from django.urls import path
from . import views

urlpatterns = [
    path("/index2", views.login_successfull, name="login_successfull"),
    path("", views.index, name="index"),
]