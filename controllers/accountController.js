import asyncCatch from "../middlewares/asyncCatch.js";
import Account from "../models/accountModel.js";


//Link account => /api/v1/accounts
export const linkAccount = asyncCatch(async(req,res,next)=>{
    const account = await Account.create(req.body);

    res.json({
        success: true,
        account
    });
});

//Unlink account => /api/v1/accounts
export const unlinkAccount = asyncCatch(async(req,res,next)=>{
    const { provider, providerAccountId } = req.params;

    await Account.deleteOne({ provider, providerAccountId });

    res.json({
        success: true,
        message: "account unlinked successfully"
    });
});