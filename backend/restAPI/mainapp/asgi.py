import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from mainapp.routing import websocket_urlpatterns

import mainapp.routing
from mainapp.consumers import MessageConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # HTTP protocol
    "websocket": AuthMiddlewareStack(
        URLRouter([
            websocket_urlpatterns
        ])
    ),
})
