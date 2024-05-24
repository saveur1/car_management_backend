import ErrorHandler from "../utils/ErrorHandler.js";

export default (req,res,next)=>{
    return next(new ErrorHandler("Page Not Found",404));
}