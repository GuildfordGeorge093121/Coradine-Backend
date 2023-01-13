import { Request, Response } from "express"
import { stat } from "fs"
import jwt, { JwtPayload } from "jsonwebtoken"
import env from "../config/envir"
import query from "../db/db"
const logout= async (req:Request,res:Response)=>{
    const {session_refresh_token}= req.body;

    try {
        // Check if refresh and acccess token exist in the database
        const foundUser= await query('SELECT * FROM users WHERE refreshtoken= $1', [ session_refresh_token])
        if(foundUser.rows.length===0) return res.status(409).json({status: 'error', message:'You are already logged out'})

        const userDecoded= await <any>jwt.verify(session_refresh_token, env.REFRESH_KEY_SECRET)
        // deleting access and refresh token from server
        
        const updateDB= await query('UPDATE users SET refreshtoken= NULL, accesstoken= NULL WHERE email= $1',[userDecoded.email]);
        res.status(200).json({status:'ok', message: 'Loggout'})
    } catch (error) {
        res.status(500).json({status: 'error', message:error})
    }

}
export default logout