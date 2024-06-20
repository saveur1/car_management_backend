import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import errorMiddleWare from "./middlewares/errors.js";
import pageNotFound from "./middlewares/pageNotFound.js";
import cors from "cors";
import dotenv from "dotenv";

// IMPORTING ALL ROUTERS
import users from "./routes/user.js";
import bookingRoutes from './routes/booking.js';
import cars from "./routes/cars.js";
import staffRoutes from "./routes/staff.js";
import garageRoutes from './routes/garage.js'; 
import fuelRoutes from "./routes/fuel.js"; 
import assetRoutes from "./routes/asset.js";
import carTools from "./routes/carTool.js";
import cloudinary from "cloudinary";

import { swaggerDocumentation } from "./docs/swagger.js";



//setting up Configurations
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/uploads",express.static("./uploads"));
app.use(cors({
    origin: '*'
}));

//cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


//CALLING ALL ROUTES
app.use("/api/v1",users);
app.use('/api/v1/bookings', bookingRoutes);
app.use("/api/v1", cars);
app.use("/api/v1/staff", staffRoutes);
app.use('/api/v1/garages', garageRoutes); 
app.use("/api/v1/fuels", fuelRoutes); 
app.use("/api/v1/assets", assetRoutes);
app.use("/api/v1/car-tools", carTools);


//SWAGGER DOCUMENTATION
swaggerDocumentation(app);


// Error Handling Middleware
app.use(pageNotFound);
app.use(errorMiddleWare);


export default app;