# backend/products/tasks.py
from celery import shared_task
from django.core.mail import send_mail

from .models import Product


@shared_task
def send_price_change_email(product_id, new_price):
    # در عمل: اطلاعات محصول از DB گرفته می‌شود
    send_mail(
        subject=f"Price Update for Product {product_id}",
        message=f"The new price is {new_price}",
        from_email="noreply@example.com",
        recipient_list=["user@example.com"],
        fail_silently=False,
    )


@shared_task
def notify_product_change(product_id, field, new_value):
    product = Product.objects.get(id=product_id)
    message = f"Product '{product.name}' updated: {field} changed to {new_value}"

    # Email Notification
    send_mail(
        subject=f"Product Update: {product.name}",
        message=message,
        from_email="noreply@example.com",
        recipient_list=["user@example.com"],
        fail_silently=False,
    )

    # اینجا می‌توان SMS یا Webhook هم اضافه کرد
    return f"Notification sent for Product {product_id}"
