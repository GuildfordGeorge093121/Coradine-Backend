import { Response, Request } from "express";
import query from "../db/db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from "../config/envir";
import { STATUS_CODES } from "http";
import generateToken from "../config/generationToken";
import emailValidation from "../config/emailValidation";


const authController= async (req: Request,res:Response)=>{
    const {email, password} = req.body;

    //  Check for empty input fields
    if(!email || !password)
        return res.status(401).json({status:'error', message: "Missing credential"})
    if(!emailValidation(email)) return res.status(400).json({status:'error', message: "Incorrect email"})
        try {

        // Check in the user exist
        const foundUser= await query('SELECT * FROM users WHERE email= $1', [email])
        if(foundUser.rows.length==0) 
            return res.status(401).json({status: 'error', message:'Account does not exist. Try registering account'})
        // User found 
        // Decrypt Password
        const matchPassword= await bcrypt.compare(password, foundUser.rows[0].password)
        if(!matchPassword)
            return res.status(401).json({status: 'error', message: 'Incorrect Password'})

        // Password Match
        // Create New  access token and refresh toke
        const role= foundUser.rows[0].userrole
        const tokens= await generateToken({email,role})

        // Insert new tokens
        const newUser= await query('UPDATE users SET accessToken= $1, refreshtoken= $2  WHERE email= $3', [tokens.accessToken, tokens.refreshToken,foundUser.rows[0].email])
        if(newUser.rowCount ==0)
         return res.status(500).json({status:'error', message: STATUS_CODES[500]})
        // sending access token
        //  res.cookie('session_access_token', accessToken, 
        // {
        //     httpOnly: false,
        //     maxAge: 15*60*1000,
        //     sameSite: "none",
        //     domain: 'http://localhost:3000/',
        //     path: 'http://localhost:4000/'
        // })

        // sending refresh token
        // res.cookie('session_refresh_token', refreshToken, 
        // {
        //     httpOnly:false,
        //     maxAge: 24*60*60*1000,
        //     sameSite: "none",
        //     domain: 'http://localhost:3000/',
        //     path: 'http://localhost:4000/'
        // })

        res.status(201).json({status:'ok',token:tokens})

    } catch (error) {
        console.log(`Server error`);
        res.status(500).json({status:'error', message: STATUS_CODES[500]})
    }

}

export default authController