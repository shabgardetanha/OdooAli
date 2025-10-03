import time

from celery import shared_task


@shared_task
def process_stock_transfer(transfer_id):
    # شبیه‌سازی پردازش سنگین
    time.sleep(5)
    print(f"✅ Stock transfer {transfer_id} processed.")
    return f"Transfer {transfer_id} done"
