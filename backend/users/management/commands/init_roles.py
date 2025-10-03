from django.contrib.auth.models import Permission
from django.core.management.base import BaseCommand
from users.models import Role


class Command(BaseCommand):
    help = "Initialize default roles and permissions"

    def handle(self, *args, **kwargs):
        roles = ["Admin", "Sales Manager", "Stock Manager", "Accountant"]
        for role_name in roles:
            Role.objects.get_or_create(name=role_name)

        self.stdout.write(self.style.SUCCESS("✅ Default roles created."))
