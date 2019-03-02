// Read Only Websocket Driver
function WebSocketDriver(/* no sinks */) {
  return xs.create({
    start: listener => {
      this.connection = new WebSocket('ws://localhost:4000');
      connection.onerror = (err) => {
        listener.error(err)
      }
      connection.onmessage = (msg) => {
        listener.next(msg)
      }
    },
    stop: () => {
      this.connection.close();
    },
  });
}

export { WebSocketDriver };