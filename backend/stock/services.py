from simple_history.utils import update_change_reason

from .models import StockTransfer
from .tasks import process_stock_transfer


def create_stock_transfer(product, quantity, source, destination):
    transfer = StockTransfer.objects.create(
        product=product, quantity=quantity, source=source, destination=destination, status="pending"
    )
    update_change_reason(transfer, "Created stock transfer")
    transfer.save()

    # اجرای async job
    process_stock_transfer.delay(transfer.id)
    return transfer


def approve_stock_transfer(transfer):
    update_change_reason(transfer, "Approved stock transfer")
    transfer.status = "done"
    transfer.save()
    return transfer
