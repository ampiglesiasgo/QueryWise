from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import openai
import os


#Configuración de la conexión con Azure Blob Storage
def get_blob_service_client():
    blob_service_client = BlobServiceClient(
        account_url=os.getenv("AZURE_STORAGE_ACCOUNT_URL"),
        credential=DefaultAzureCredential()
    )
    return blob_service_client


#Configuracion para OpenAI
def get_openai_client(prompt, database_structure):
    openai.api_key = os.getenv("AZURE_OPENAI_API_KEY")
    openai.api_base = os.getenv("AZURE_OPENAI_API_BASE")
    openai.api_type = os.getenv("AZURE_OPENAI_API_TYPE")
    openai.api_version = os.getenv("AZURE_OPENAI_API_VERSION")

    #Respuesta de OpenAi
    response = openai.Completion.create(
        engine="gpt-4",
        promtp= f'Actua como un Senior SQL Developer Data Engineer y convierte esta solicitud a SQL: {prompt}  sobre la base de datos con estructura {database_structure}',
        max_tokens=100
    )
    return response['choices'][0]['text'], response['usage']['total_tokens']