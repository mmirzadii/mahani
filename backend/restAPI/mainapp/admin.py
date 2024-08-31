# mainapp/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from mainapp.models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'phone_number']