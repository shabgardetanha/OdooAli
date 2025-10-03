from companies.models import Company
from django.contrib.auth.models import AbstractUser, User
from django.db import models


class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    users = models.ManyToManyField(User, related_name="roles", blank=True)

    def __str__(self):
        return self.name


class User(AbstractUser):
    role = models.CharField(max_length=50, choices=[("Admin", "Admin"), ("Manager", "Manager"), ("Staff", "Staff")])
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
