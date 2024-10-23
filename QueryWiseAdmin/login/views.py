from django.contrib.auth import login as auth_login
from django.shortcuts import render, redirect
from allauth.account.forms import LoginForm


# Create your views here.

def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('home')
    else:
        form = LoginForm()

    return render(request, 'login/login.html', {'form': form})
