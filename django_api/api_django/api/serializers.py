from rest_framework import serializers

class FilePromptSerializer(serializers.Serializer):
    file = serializers.FileField()
    prompt = serializers.CharField(max_length=500)