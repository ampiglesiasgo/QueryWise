# QueryWise
Creación de consultas SQL a partir de lenguaje natural

## Descripción
Hoy en día, la capacidad de orientar, recuperar, manipular, comprender y analizar datos está siendo democratizada rápidamente por la IA. Al habilitar escenarios como la creación de consultas SQL a partir de indicaciones en lenguaje natural, las empresas ahora pueden capacitar unidades de negocio enteras de maneras que antes requerían especialistas dedicados. Sin embargo, es importante que las empresas puedan controlar sus costos sin incurrir en gastos inesperadamente grandes. 

### Objetivo
El objetivo de este desafío es crear una prueba de concepto de lenguaje natural a consulta de datos que rastree y muestre el uso de tokens y los costos por cada indicación y respuesta del usuario, proporcionando transparencia en el consumo de tokens.

# Instalación
Para instalar las dependencias necesarias, ejecute el siguiente comando:
```bash
pip install -r requirements.txt
```

### Recomendaciones
1. Se recomienda el uso de un entorno virtual para la instalación de las dependencias.
``` python
 python -m venv venv
```
2. Para activar el entorno virtual, ejecute el siguiente comando:
- En Windows
```bash
env\Scripts\activate
```
- En Linux o macOS
```bash
source env/bin/activate
```

# Uso
Para ejecutar el programa situese en la raiz y ejecute el siguiente comando:
```bash
python manage.py runserver -localohost:8000
```
> ⚠️ **Advertencia:** El uso de locahost:8000 es obligatorio para el correcto funcionamiento del login 
>ya que esta configurado asi por norma de Azure y la redireccion de contenido luego de iniciar sesion.

> ⚠️ **Advertencia:** Tengan en cuenta que las credenciales de la app de azure estan en un archivo .env que no esta en el repositorio por seguridad.

### Archivo dotenv (.env)
1. Ubicarlo en la raiz del modulo 'QueryWise_App'

```bash
client_id = client_id
client_secret = client_secret
tenant_id = tenant_id_
```

