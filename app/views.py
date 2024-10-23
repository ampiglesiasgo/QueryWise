from django.shortcuts import render
# from django.http import HttpResponse

# Create your views here.

def login_successfull(request):
    print('-'*60)
    print("     Login con Microsoft AD exitoso")
    print('-' * 60)
    return render(request, 'home.html')
