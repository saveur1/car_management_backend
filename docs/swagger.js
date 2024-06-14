import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUiOptions  from "swagger-ui-express";
import { UserDoc } from "./user.swagger.js";
import { authentication } from "./authentication.swagger.js";
import { BookingDoc } from "./booking.swagger.js";
import { CarDoc } from "./cars.swagger.js";
import { StaffDoc } from "./staff.swagger.js";
import { GarageDoc } from "./garage.swagger.js";  
import { FuelDoc } from "./fuel.swagger.js";
import { AssetDoc } from "./asset.swagger.js";


const Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Car Rental Api Documentation",
      description: "Rent car instantly",
      version: "0.1.9",
    },
    tags: [
      {
        name: "Authentication",
        description: "Aunthenticating users for car rental",
      },
      {
        name: "User",
        description: "Car Rental Users: Individuals, suppliers and admin",
      },
      { name: "Booking", description: "Car Rental Bookings" },
      { name: "Cars", description: "Requests for creating Cars" },
      { name: "Staff", description: "Staff Management" },
      { name: "Garage", description: "Garage Services Management" },
      { name: "Fuel", description: "Fuel Management" },
      { name: "Asset", description: "Asset Management" },
    ],
    servers: [
      {
        url: "https://tech-car-rent.onrender.com",
        description: "Online Server",
      },
      { url: "http://localhost:5000", description: "Local Server" },
    ],
    components: {
      securitySchemes: {
        token: {
          type: "apiKey",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "authorization",
          in: "header",
        },
      },
    },
    paths: {
      ...authentication,
      ...UserDoc,
      ...BookingDoc,
      ...CarDoc,
      ...StaffDoc,
      ...GarageDoc,
      ...FuelDoc,
      ...AssetDoc,
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(Options);

export function swaggerDocumentation(app){
    app.use("/api/docs",SwaggerUiOptions.serve,SwaggerUiOptions.setup(swaggerSpec,{customSiteTitle:"Car Rental Documentation"}));
}

