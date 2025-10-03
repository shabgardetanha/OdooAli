# backend/products/permissions.py
from rest_framework.permissions import BasePermission


class IsCompanyAdminOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True
        return request.user.role == "Admin" and request.user.company == obj.company


class IsAdminOrManager(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True
        return request.user.role == "Admin" and request.user.company == obj.company
