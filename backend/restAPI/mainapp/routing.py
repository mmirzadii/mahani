from django.urls import re_path

websocket_urlpatterns = [
    re_path(r'ws/messages/assignment/<int:assignment_id>')
]