import requests
from django.shortcuts import render, redirect
from django.conf import settings  # Asegúrate de que tienes tus configuraciones aquí
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Crear tu vista de inicio de sesión exitoso
def login_successfull(request):
    code = request.GET.get('code')  # Captura el código de autorización de la URL
    if code:
        # Intercambiar el código por un token de acceso
        token_url = f'https://login.microsoftonline.com/{settings.tenant_id}/oauth2/v2.0/token'
        payload = {
            'client_id': settings.client_id,
            'client_secret': settings.client_secret,
            'code': code,
            'redirect_uri': settings.login_redirect_url,
            'grant_type': 'authorization_code'
        }

        # Realizar la solicitud para obtener el token
        response = requests.post(token_url, data=payload)
        token_data = response.json()
        print("Respuesta de token:", token_data)

        # Captura el token de acceso
        access_token = token_data.get('access_token')

        if access_token:
            # Almacena el token en la sesión (o en tu preferido)
            request.session['access_token'] = access_token
            print('-' * 60)
            print("     Login con Microsoft AD exitoso")
            print(f"     Token de acceso: {access_token}")
            print('-' * 60)
        else:
            print("Error al obtener el token de acceso:", token_data)

    access_token = request.session.get('access_token')  # Usar .get() para evitar KeyError
    print("     Redirigiendo a la página de inicio")
    print("data: ", )  # No causará un error si el token no está presente

    return render(request, 'home.html')



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
