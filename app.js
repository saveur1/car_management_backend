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
// Use booking routes
app.use('/api/bookings', bookingRoutes);
//SWAGGER DOCUMENTATION
swaggerDocumentation(app);


// Error Handling Middleware
app.use(pageNotFound);
app.use(errorMiddleWare);


export default app;