import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"
import env from "../config/envir"
import query from "../db/db"
const getUser= async (req:Request,res:Response)=>{
    const {accessToken}= req.params
   try {
    const decodedUser= await <any>jwt.verify(accessToken,env.ACCESS_KEY_SECRET)
    const currentUser= await query('SELECT firstname FROM users WHERE email = $1 AND userrole= $2', [decodedUser.email, decodedUser.role])
    if(currentUser.rows.length===0) return res.sendStatus(500)
    res.status(200).json({status: 'ok',data:{user:{firstname:currentUser.rows[0].firstname, pic:""}}})
   } catch (error) {
    console.log(error)
   }
}


export default getUser