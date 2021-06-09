from django.contrib import admin
from .models import Authentication, User
# Register your models here.

admin.site.register(Authentication)
admin.site.register(User)