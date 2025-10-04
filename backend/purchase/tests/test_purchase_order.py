import pytest
from companies.models import Company
from django.contrib.auth import get_user_model
from products.models import Product
from purchase.models import PurchaseOrder

User = get_user_model()


@pytest.mark.django_db
def test_create_purchase_order():
    company = Company.objects.create(name="Test Co")
    user = User.objects.create(username="admin", role="admin", company=company)
    product = Product.objects.create(name="Test Product", price=100, company=company)

    po = PurchaseOrder.objects.create(
        company=company, created_by=user, product=product, quantity=2, price=product.price, status="draft"
    )

    assert po.total_price == 200
    assert po.company == company
    assert po.created_by == user


@pytest.mark.django_db
def test_queryset_filtered_by_company():
    company1 = Company.objects.create(name="Co1")
    company2 = Company.objects.create(name="Co2")
    user1 = User.objects.create(username="user1", role="manager", company=company1)
    product1 = Product.objects.create(name="Product1", price=50, company=company1)
    product2 = Product.objects.create(name="Product2", price=60, company=company2)

    PurchaseOrder.objects.create(company=company1, created_by=user1, product=product1, quantity=1, price=50)
    PurchaseOrder.objects.create(company=company2, created_by=user1, product=product2, quantity=1, price=60)

    filtered = PurchaseOrder.objects.filter(company=user1.company)
    assert all(po.company == company1 for po in filtered)
