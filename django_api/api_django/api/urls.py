from django.urls import path
from .views import test_api, process_document_and_prompt

urlpatterns = [
    path('test/', test_api, name='test_api'),
    path('process/', process_document_and_prompt, name='process_document_and_prompt')
]