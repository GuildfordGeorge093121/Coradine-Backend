import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../config/envir";
import query from "../db/db";

const refreshAccessToken =async (req:Request, res:Response, next:NextFunction)=>{
    const {refreshToken} =req.query;
    console.log(refreshToken)
    try {
        console.log('refreshing token')
        const searchUser= await query('SELECT email, userrole FROM users WHERE refreshtoken = $1', [refreshToken])
        if(searchUser.rowCount===0) return res.status(401).json({verified:false})
        const email= searchUser.rows[0].email
        const role= searchUser.rows[0].userrole
        const verifyRefreshToken= await jwt.verify(refreshToken as string, env.REFRESH_KEY_SECRET)
        const accessToken = await jwt.sign({email,role}, env.ACCESS_KEY_SECRET)
        return res.status(200).json({verified: true, token:{accessToken,refreshToken}})

    } catch (error) {
        res.status(401).json({verified: false})
    }

}

export default refreshAccessToken;