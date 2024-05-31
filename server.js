import http from "http";
import app from "./app.js";
import connectDatabase from "./config/database.js";

process.on("uncaughtException", (error) => {
  console.log("ERROR: " + error.stack);
  console.log("Shuting down due to uncaught exception");
  process.exit(1);
});

//setting up database
connectDatabase();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(
    `Server is running at ${process.env.PORT} PORT in ${process.env.NODE_ENV} mode`
  );
});

process.on("unhandledRejection", (error) => {
  console.log("ERROR: " + error.message);
  console.log("Shutting down server due to unhandled Promise rejections");
  server.close(() => {
    process.exit(1);
  });
});
