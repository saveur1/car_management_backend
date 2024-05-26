import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUiOptions  from "swagger-ui-express";
import { UserDoc } from "./user.swagger.js";
import { authentication } from "./authentication.swagger.js";
import { BookingDoc } from "./booking.swagger.js";


const Options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Car Rental Api Documentation",
            description:"Rent car instantly",
            version:"0.1.9"
        },
        tags:[
            {name:"Authentication",description:"Aunthenticating users for car rental"},
            {name:"User",description:"Car Rental Users: Individuals, suppliers and admin"},
            {name: "Booking", description: "Car Rental Bookings" }
        ],
        servers:[
            {url:"http://localhost:5000",description:"Local Server"},
            {url:"https//tech-car-rent.onrender.com",description:"Online Server"}
        ],
        components:{
            securitySchemes:{
                token:{
                    type:"apiKey",
                    scheme:"bearer",
                    bearerFormat:"JWT",
                    name:"authorization",
                    in:"header"
                }
            }
        },
        paths:{...authentication,...UserDoc}
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(Options);

export function swaggerDocumentation(app){
    app.use("/api/docs",SwaggerUiOptions.serve,SwaggerUiOptions.setup(swaggerSpec,{customSiteTitle:"Car Rental Documentation"}));
}

