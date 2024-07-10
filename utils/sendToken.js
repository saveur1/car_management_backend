const sendToken = (statusCode,user,res)=>{

    //create jwt token
    const token = user.getJwtToken();

    //options for cookie
    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        secure:true,
        sameSite:"None",
        httpOnly:true
    }

    res.status(statusCode).cookie("token", token, options).json({
        success:true,
        token,
        user
    });
}

export default sendToken;
