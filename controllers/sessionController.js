import asyncCatch from "../middlewares/asyncCatch.js";
import Session from "../models/sessionModel.js";


//Session => /api/v1/sessions
export const createSession = asyncCatch(async(req,res,next)=>{
    const session = await Session.create({...req.body, company: req.staff.company});

    res.json({
        success: true,
        session
    });
});