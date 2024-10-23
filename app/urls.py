from django.urls import path
from . import views

urlpatterns = [
    path("", views.login_successfull, name="login_successfull"),
]