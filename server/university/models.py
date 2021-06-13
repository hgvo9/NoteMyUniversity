from django.db import models

# Create your models here.
class University(models.Model):
    name = models.CharField(("Name"), max_length=50)
    description = models.CharField(("Description"), max_length=50)
    city = models.CharField(("City"), max_length=50)
    country = models.CharField(("Country"), max_length=50)
    latitude = models.CharField(("Latitude"), max_length=50)
    longtitude = models.CharField(("Longtitude"), max_length=50)
    website = models.CharField(("Website"), max_length=50)

    def __str__(self):
        return self.name
    