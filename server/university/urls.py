from django.urls import path

from . import views

urlpatterns = [
    path("University/", views.UniversityList.as_view()),
    path("University/<int:pk>", views.UniversityDetail.as_view()),
    path("UniversityFeed/", views.UniversityFeed.as_view())
]