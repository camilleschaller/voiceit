const debug = require('debug')('my-app:messaging');
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:3000');

// Array of currently connected WebSocket clients.
const clients = [];

// Create a WebSocket server using the specified HTTP server.
exports.createWebSocketServer = function (httpServer) {
  debug('Creating WebSocket server');
  const wss = new WebSocket.Server({
    server: httpServer
  });

  // Handle new client connections.
  wss.on('connection', function (ws) {
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
exports.broadcastMessage = function (message) {
  debug(`Broadcasting message to all connected clients: ${JSON.stringify(message)}`);
  // Wait for the connection to open.
  ws.addEventListener('open', function (event) {
    // Send something to the server.
    ws.send('Hello Server!');
  });

  // Listen for message from the server.
  ws.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
  });
};

function onMessageReceived(ws, message) {
  debug(`Received WebSocket message: ${JSON.stringify(message)}`);
}