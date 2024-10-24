import requests
from django.shortcuts import render, redirect
from django.conf import settings  # Asegúrate de que tienes tus configuraciones aquí
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Crear tu vista de inicio de sesión exitoso
def index(request):
    return render(request, 'index.html')


def login_successfull(request):
    if request.user.is_authenticated:
        print('-'*60)
        print("     Login con Microsoft AD exitoso")
        print('-' * 60)
        return render(request, 'home.html')
    else:
        return redirect('index')



# Vista API para manejar el chat
class ChatAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Asegura que solo usuarios autenticados puedan usar la API

    def post(self, request):
        user_message = request.data.get('message')  # Obtener el mensaje del usuario desde la petición
        if not user_message:
            return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Aquí puedes añadir la lógica para procesar el mensaje y generar una respuesta
        response_message = self.generate_response(user_message)

        return Response({'response': response_message}, status=status.HTTP_200_OK)

    def generate_response(self, message):
        # Lógica para generar una respuesta (puedes conectar a un modelo de IA, reglas, etc.)
        return f"Respuesta generada para: {message}"
