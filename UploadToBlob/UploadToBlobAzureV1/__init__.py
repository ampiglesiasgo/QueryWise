import logging
import azure.functions as func
from azure.storage.blob import BlobServiceClient
import os

# Cadena de conexión de la cuenta de almacenamiento (almacenada en configuración de aplicación)
connection_string = os.getenv("AzureWebJobsStorage")
blob_service_client = BlobServiceClient.from_connection_string(connection_string)

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Función HTTP para carga de archivos en Blob Storage invocada')

    # Obtener el archivo desde la solicitud HTTP
    try:
        file = req.files['file']
        file_name = file.filename
        
        # Definir el contenedor y el blob (archivo) donde se almacenará
        container_name = "excel"
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=file_name)

        # Cargar el archivo
        blob_client.upload_blob(file.stream, overwrite=True)

        return func.HttpResponse(f"Archivo '{file_name}' cargado con éxito", status_code=200)
    except Exception as e:
        logging.error(f"Error al cargar archivo: {e}")
        return func.HttpResponse("Error al cargar archivo", status_code=500)
