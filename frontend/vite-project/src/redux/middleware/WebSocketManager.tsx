class WebSocketManager {
  private sockets: { [key: string]: WebSocket | null } = {};

  connect(
    key: string,
    url: string,
    onMessage: (data: any) => void,
    onError: () => void,
    onClose: () => void,
  ) {
    if (this.sockets[key]) {
      this.sockets[key]?.close();
    }
    this.sockets[key] = new WebSocket(url);
    const socket = this.sockets[key];

    socket.onopen = () => {
      console.log(`connect to url ${url}`);
    };

    socket.onmessage = (event) => {
      console.log(`message received from url ${url}`);
      onMessage(event.data);
    };

    socket.onerror = () => {
      console.log(`error connection for ${key}`);
      onError();
    };

    socket.onclose = () => {
      onClose();
    };
  }

  send(key: string, message: any) {
    if (this.sockets[key]) {
      this.sockets[key].send(JSON.stringify(message));
    }
  }

  disconnect(key: string) {
    if (this.sockets[key]) {
      this.sockets[key]?.close();
    }
    this.sockets[key] = null;
  }
}

export const wsManager = new WebSocketManager();
