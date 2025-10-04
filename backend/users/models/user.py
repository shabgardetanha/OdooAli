from companies.models import Company
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True)
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("manager", "Manager"),
        ("staff", "Staff"),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
