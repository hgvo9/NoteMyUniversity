from rest_framework import generics
from .models import University
from .serializers import UniversitySerializer
import requests
import json
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.
class UniversityList(generics.ListCreateAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class UniversityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer

class UniversityFeed(APIView):

    queryset = University.objects.all()
    serializer_class = UniversitySerializer

    def get(self, request, format=None):
        response = requests.get("https://api.tekfeed.epitech.eu/university", headers={'Content-Type': 'application/json'})
        data = json.loads(response.text.splitlines()[1])

        for university in data:
            University.objects.create(
                name=university["University"]["name"],
                description=university["University"]["short_desc"],
                city=university["University"]["city"],
                country=university["University"]["country"],
                latitude=university["University"]["latitude"],
                longtitude=university["University"]["longitude"],
                website=university["University"]["website"]
            )
        return Response(data)