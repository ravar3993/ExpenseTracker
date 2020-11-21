from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def test(request):
    data = {'Result': 'success1'}
    return Response(data=data, status=status.HTTP_200_OK)