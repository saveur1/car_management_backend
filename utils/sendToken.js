const sendToken = (statusCode,user,res)=>{

    //create jwt token
    const token = user.getJwtToken();

    res.status(statusCode).json({
        success:true,
        token,
        user
    });
}

export default sendToken;
