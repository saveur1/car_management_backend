import ErrorHandler from "../utils/ErrorHandler.js";

export default (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    if(process.env.NODE_ENV==="DEVELOPMENT") {
        res.status(error.statusCode).json({
            success:false,
            error,
            errorMessage:error.message,
            stack:error.stack
        })
    }

    if(process.env.NODE_ENV === "PRODUCTION"){

        if(error.name === "CastError") {
            const message = `Resource Not Found. Invalid ${error.path}`;
            error = new ErrorHandler(message,400);
        }
        
        if(error.name ==="ValidationError") {
            const message = Object.values(error.errors).map(val => val.message);
            error = new ErrorHandler(message,400);
        }

        if(error.code === 11000){
            const message = `${Object.keys(error.keyValue)} Already exists in database`;
            error = new ErrorHandler(message,400);
        }

        if(error.name === "JsonWebTokenError"){
            const message = "Unknow Error has occurred, please try again later!";
            error = new ErrorHandler(message,400);
        }

        if(error.name === "TokenExipiredError"){
            const message = "Sorry to inform you that your session is expired, please Login Again!";
            error = new ErrorHandler(message,400);
        }

        res.status(error.statusCode).json({
            success:false,
            message:error.message || "Internal Server Error"
        });
    }
}