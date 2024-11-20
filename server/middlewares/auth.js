const jwt = require("jsonwebtoken");
require("dotenv").config();
// const Instructor = require("../models/Instructor")


exports.auth = async (req, res, next) => {
    try{
        //etract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "")

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token found",
            });
        }

        //verify token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error) {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid",
                error: error
            });
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating token, please try again later',
        })
    }
}