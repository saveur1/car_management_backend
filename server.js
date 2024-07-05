import http from "http";
import app from "./app.js";
import connectDatabase from "./config/database.js";
import { Server as SocketServer } from "socket.io"; 




//setting up database
connectDatabase();

const server = http.createServer(app);


// Initialize socket.io on the server
const io = new SocketServer(server);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  // Handle chat events here (send/receive messages, etc.)
  socket.on('chatMessage', (message) => {
    io.emit('message', message); // Broadcast to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User has left');
    io.emit('message', 'User has left'); // Broadcast user disconnection
  });
});

server.listen(process.env.PORT, () => {
  console.log(
    `Server is running at ${process.env.PORT} PORT in ${process.env.NODE_ENV} mode`
  );
});
process.on("uncaughtException", (error) => {
  console.log("ERROR: " + error.stack);
  console.log("Shuting down due to uncaught exception");
  process.exit(1);
});
process.on("unhandledRejection", (error) => {
  console.log("ERROR: " + error.message);
  console.log("Shutting down server due to unhandled Promise rejections");
  server.close(() => {
    process.exit(1);
  });
});

export default server;