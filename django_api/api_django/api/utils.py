import pandas as pd


# Valiadacion de la extension de archivos subidos por el usuario

def is_valid_extension_file(filename, allowed_extensions):
    extension = filename.split('.')[-1].lower()
    return extension in allowed_extensions


# Validar contenido del archivo (excel, csv)
def validate_file_content(file, file_type):
    if file_type == 'csv':
        try:
            data_file = pd.read_csv(file)
            return not data_file.empty and data_file.shape[1] > 0
        except Exception:
            return False
    elif file_type == 'xlsx':
        try:
            data_file = pd.read_excel(file)
            return not data_file.empty and data_file.shape[1] > 0
        except Exception:
            return False
    return False
