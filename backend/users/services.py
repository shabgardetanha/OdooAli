from django.contrib.auth.models import Permission, User

from .models import Role


def assign_role(user: User, role_name: str):
    role = Role.objects.get(name=role_name)
    role.users.add(user)
    return role


def add_permission_to_role(role: Role, perm_codename: str):
    perm = Permission.objects.get(codename=perm_codename)
    role.permissions.add(perm)
    return perm
