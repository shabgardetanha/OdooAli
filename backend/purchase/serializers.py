from rest_framework import serializers

from .models import PurchaseOrder


class PurchaseOrderSerializer(serializers.ModelSerializer):
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = PurchaseOrder
        fields = [
            "id",
            "company",
            "created_by",
            "product",
            "quantity",
            "price",
            "total_price",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_by", "company", "created_at", "updated_at"]
