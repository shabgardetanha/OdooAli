from rest_framework.response import Response
from rest_framework.views import APIView


class NotificationList(APIView):
    def get(self, request):
        # نمونه ساده: Notificationها را از DB یا Cache می‌خوانیم
        notifications = [{"message": "Product X price updated to 200"}, {"message": "Product Y stock updated to 50"}]
        return Response(notifications)
