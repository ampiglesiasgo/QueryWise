from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import FilePromptSerializer
from .azure_services import get_blob_service_client, get_openai_client
from .utils import is_valid_extension_file, validate_file_content

# Create your views here.

@api_view(['GET'])
def test_api(request):
    return Response({"message": "Api en Django con Rest Framework ACTIVA"})

@api_view(['POST'])
def process_document_and_prompt(request):
    serializer = FilePromptSerializer(data=request.data)

    if serializer.is_valid():
        file = serializer.validated_data['file']
        prompt = serializer.validated_data['prompt']

        # Validar extension del archivo
        allowed_extensions = ['csv', 'xlsx']
        if not is_valid_extension_file(file.name, allowed_extensions):
            return Response ({"error de extension en el archivo": "El archivo no tiene una extensión válida"}, status=status.HTTP_400_BAD_REQUEST)

        # Validar el contenido del archivo
        file_type = file.name.split('.')[-1].lower()
        if not validate_file_content(file, file_type):
            return Response ({"error de archivo subido": "El archivo no tiene un contenido válido"}, status=status.HTTP_400_BAD_REQUEST)

        # Subir el archivo a Azure Blob Storage
        blob_service_client = get_blob_service_client()
        blob_client = blob_service_client.get_blob_client(container='uploaded_files', blob=file.name)
        blob_client.upload_blob(file)
        file_url = blob_client.url

        #Extraer la estructura de la base de datos (implementación)
        database_structure = 'estructura de la base de datos extraida'
        sql_query, token_used = get_openai_client(prompt, database_structure)

        return Response({
            "file_url": file_url,
            "sql_query": sql_query,
            "token_used": token_used
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Bad Request