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
import { CarToolDoc } from "./carTool.swagger.js";
import { SalariesDoc } from "./salaries.swagger.js";
import { JobsDoc } from "./jobs.swagger.js";
import { NotificationDoc } from "./notification.swagger.js"; 
import { ActivitiesDoc } from "./activities.swagger.js";
import { HolidayDoc } from "./holiday.swagger.js";
import { ChatDoc } from "./chat.swagger.js"; 
import { PaymentDoc } from "./payment.swagger.js";
import { SessionsDoc } from "./sessions.swagger.js";
import { AccountsDoc } from "./accounts.swagger.js";
import { CompanyDoc } from "./companies.swagger.js";


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
      { name: "Company", description: "Company routes" },
      { name: "Booking", description: "Car Rental Bookings" },
      { name: "Cars", description: "Requests for creating Cars" },
      { name: "Staff", description: "Staff Management" },
      { name: "Garage", description: "Garage Services Management" },
      { name: "Fuel", description: "Fuel Management" },
      { name: "Asset", description: "Asset Management" },
      { name: "Car Tool", description: "car tools Management" },
      { name: "Notification", description: "send notification" },
      { name: "Activities", description: "Track activity with us" },
      { name: "Chat", description: "Chat Functionality" },
      { name: "Payment", description: "Payment Management" },
      { name: "Sessions", description: "Managing sessions" },
      { name: "Accounts", description: "Accounts routes" },
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
      ...CarToolDoc,
      ...SalariesDoc,
      ...JobsDoc,
      ...NotificationDoc,
      ...ActivitiesDoc,
      ...HolidayDoc,
      ...ChatDoc,
      ...SessionsDoc,
      ...AccountsDoc,
      ...PaymentDoc,
      ...CompanyDoc

    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(Options);

export function swaggerDocumentation(app){
    app.use("/api/docs",SwaggerUiOptions.serve,SwaggerUiOptions.setup(swaggerSpec,{customSiteTitle:"Car Rental Documentation"}));
}

