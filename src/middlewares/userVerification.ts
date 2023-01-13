import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/envir";

const userVerification = async (req:Request,res:Response,next:NextFunction)=>{
    const {accessToken,refreshToken} =req.query;

    // Verify if access token exist
    
    if(!accessToken){
        if(!refreshToken)return res.status(401).json({verified: false})
    }
    try {

        const userDecoded= await jwt.verify(accessToken as string, env.ACCESS_KEY_SECRET)
        return res.status(200).json({verified: true,token:{accessToken,refreshToken}})
        
    } catch (error) {
        console.log('Check for refresh token')
        next();
    }
}

export default userVerification