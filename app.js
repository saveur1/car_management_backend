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


//CALLING ALL ROUTES
app.use("/api/v1",users);
app.use('/api/v1/bookings', bookingRoutes);
app.use("/api/v1", cars);
app.use("/api/v1/staff", staffRoutes);
app.use('/api/v1/garages', garageRoutes); 
app.use("/api/v1/fuels", fuelRoutes); 
app.use("/api/v1/assets", assetRoutes);


//SWAGGER DOCUMENTATION
swaggerDocumentation(app);


// Error Handling Middleware
app.use(pageNotFound);
app.use(errorMiddleWare);


export default app;