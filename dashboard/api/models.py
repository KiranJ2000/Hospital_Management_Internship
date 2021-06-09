from django.db import models

# Create your models here.

class Authentication(models.Model):  
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=60, unique=True)
    password = models.CharField(max_length=80)


class User(models.Model):
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=60)
    phone = models.IntegerField()
    gender = models.CharField(max_length=8)
    qualification = models.CharField(max_length=20)
    occupation = models.CharField(max_length=20)


