# users/permissions.py
from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    اجازه دسترسی فقط برای کاربرانی با نقش Admin
    """

    def has_permission(self, request, view):
        return hasattr(request.user, "role") and request.user.role == "admin"


class IsManager(BasePermission):
    """
    اجازه دسترسی فقط برای کاربرانی با نقش Manager
    """

    def has_permission(self, request, view):
        return hasattr(request.user, "role") and request.user.role == "manager"


class IsStaff(BasePermission):
    """
    اجازه دسترسی فقط برای کاربرانی با نقش Staff
    """

    def has_permission(self, request, view):
        return hasattr(request.user, "role") and request.user.role == "staff"


class IsAdminOrManager(BasePermission):
    """
    اجازه دسترسی برای Admin یا Manager
    """

    def has_permission(self, request, view):
        return hasattr(request.user, "role") and request.user.role in ("admin", "manager")
