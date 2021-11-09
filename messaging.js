const debug = require('debug')('my-app:messaging');
const WebSocket = require('ws');

// Array of currently connected WebSocket clients.
const clients = [];

// Create a WebSocket server using the specified HTTP server.
exports.createWebSocketServer = function(httpServer) {
  debug('Creating WebSocket server');
  const wss = new WebSocket.Server({
    server: httpServer
  });

  // Handle new client connections.
  wss.on('connection', function(ws) {
    debug('New WebSocket client connected');

    // Keep track of clients.
    clients.push(ws);

    // Listen for messages sent by clients.
    ws.on('message', message => onMessageReceived(
      ws,
      JSON.parse(message)
    ));

    // Clean up disconnected clients.
    ws.on('close', () => {
      clients.splice(clients.indexOf(ws), 1);
      debug('WebSocket client disconnected');
    });
  });
};

// Broadcast a message to all connected clients.
exports.broadcastMessage = function(message) {
  debug(`Broadcasting message to all connected clients: ${JSON.stringify(message)}`);
  // You can easily iterate over the "clients" array to send a message to all
  // connected clients.
};

function onMessageReceived(ws, message) {
  debug(`Received WebSocket message: ${JSON.stringify(message)}`);
  // Do something with message...
}