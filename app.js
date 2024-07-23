import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import errorMiddleWare from "./middlewares/errors.js";
import pageNotFound from "./middlewares/pageNotFound.js";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import schedule from "node-schedule";

// IMPORTING ALL ROUTERS
import users from "./routes/user.js";
import bookingRoutes from "./routes/booking.js";
import cars from "./routes/cars.js";
import staffRoutes from "./routes/staff.js";
import garageRoutes from "./routes/garage.js";
import fuelRoutes from "./routes/fuel.js";
import assetRoutes from "./routes/asset.js";
import carTools from "./routes/carTool.js";
import salaries from "./routes/salaries.js";
import jobs from "./routes/jobs.js";
import notification from "./routes/notification.js";
import activities from "./routes/activities.js";
import holiday from "./routes/holiday.js";
import chat from "./routes/chat.js";
import payment from "./routes/payment.js"
import session from "./routes/sessions.js";
import accounts from "./routes/accounts.js";
import cookieParser from 'cookie-parser';
import companies from "./routes/companies.js";

import { swaggerDocumentation } from "./docs/swagger.js";
import { corsOptionsDelegate } from "./config/corsOptions.js";
import { handleTriggers } from "./utils/runTriggers.js";


//setting up Configurations
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("./uploads"));

//configuration of cors policy
app.use(
  cors(corsOptionsDelegate)
);

//cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Schedule the handleTriggers function to run periodically
schedule.scheduleJob('*/10 * * * *', handleTriggers); // Runs every 10 minutes

//CALLING ALL ROUTES
app.use("/api/v1", users);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1", cars);
app.use("/api/v1/staff", staffRoutes);
app.use("/api/v1/garages", garageRoutes);
app.use("/api/v1/fuels", fuelRoutes);
app.use("/api/v1/assets", assetRoutes);
app.use("/api/v1/car-tools", carTools);
app.use("/api/v1/salaries", salaries);
app.use("/api/v1/notifications", notification);
app.use("/api/v1/activities", activities);
app.use("/api/v1/jobs", jobs);
app.use("/api/v1/holidays", holiday);
app.use("/api/v1/chat", chat);
app.use("/api/v1/payment",payment);
app.use("/api/v1/accounts", accounts);
app.use("/api/v1/sessions", session);
app.use("/api/v1/companies", companies);

//SWAGGER DOCUMENTATION(/api/docs)
swaggerDocumentation(app);

// Error Handling Middleware
app.use(pageNotFound);
app.use(errorMiddleWare);

export default app;
