import pytest
from companies.models import Company
from django.contrib.auth import get_user_model
from products.models import Product
from rest_framework.test import APIClient

User = get_user_model()


@pytest.mark.django_db
class TestProductPermissions:
    def setup_method(self):
        self.client = APIClient()
        # ساخت دو شرکت مختلف
        self.company1 = Company.objects.create(name="Company A")
        self.company2 = Company.objects.create(name="Company B")

        # کاربران مختلف
        self.admin = User.objects.create_user(
            username="admin", password="admin123", role="Admin", company=self.company1
        )
        self.manager = User.objects.create_user(
            username="manager", password="manager123", role="Manager", company=self.company1
        )
        self.staff = User.objects.create_user(
            username="staff", password="staff123", role="Staff", company=self.company1
        )
        self.other_admin = User.objects.create_user(
            username="otheradmin", password="other123", role="Admin", company=self.company2
        )

        # یک محصول برای شرکت ۱
        self.product = Product.objects.create(name="Test Product", price=100, stock=10, company=self.company1)

    def test_admin_can_update_own_company_product(self):
        self.client.login(username="admin", password="admin123")
        response = self.client.patch(
            f"/api/products/{self.product.id}/",
            {"price": 200},
            format="json",
        )
        assert response.status_code == 200
        self.product.refresh_from_db()
        assert float(self.product.price) == 200.0

    def test_manager_cannot_update_product(self):
        self.client.login(username="manager", password="manager123")
        response = self.client.patch(
            f"/api/products/{self.product.id}/",
            {"price": 300},
            format="json",
        )
        assert response.status_code == 403  # Forbidden

    def test_staff_cannot_update_product(self):
        self.client.login(username="staff", password="staff123")
        response = self.client.patch(
            f"/api/products/{self.product.id}/",
            {"price": 400},
            format="json",
        )
        assert response.status_code == 403

    def test_admin_cannot_update_other_company_product(self):
        self.client.login(username="otheradmin", password="other123")
        response = self.client.patch(
            f"/api/products/{self.product.id}/",
            {"price": 500},
            format="json",
        )
        assert response.status_code == 403
