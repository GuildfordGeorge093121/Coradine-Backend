import { Response, Request } from "express";
import query from "../db/db";
import bcrypt from 'bcrypt'; 
import emailValidation from "../config/emailValidation";
import generateToken from "../config/generationToken";

const registerContoller=async (req:Request,res:Response)=>{
    const user={
        'admin': 2134,
        'user': 5434,
    }
    console.log(req.body)
    try {
        const {firstname, lastname, email,password, userrole}= req.body;
    // Checking for empty and unfilled form inputs or components
    if(!firstname || !lastname || !email || !password || !userrole) 
        return res.status(400).json({status: "error", message: 'Missing Credential'})
        console.log('body check')
    //  checking if the new user already exist
    //  COnfused bewteen 403 and 409
    if(!emailValidation(email)) return res.status(400).json({status:'error', message:'Incorrect Email.'})
    
    const foundUser=await query('SELECT * FROM users WHERE email= $1', [email])
    if(foundUser.rows.length !=0) return res.status(409).json({status: "error", message:"Account already exist. Try Login"})

    // Password Encryption
    const hashPassword= await bcrypt.hash(password, 10);
    console.log('password check')
    // convert user role to give id
    const role= userrole=='admin'? user.admin: userrole=='user'? user.user: false;
    if(!role) return res.status(400).json({status:"error", message:"Bad Request"})

    // Creating of new user
    const newUser= await query('INSERT INTO users(id,firstname,lastname,email,password,userrole) VALUES (uuid_generate_v4(),$1,$2,$3,$4,$5)', [firstname,lastname,email,hashPassword,role])
    const tokens= await generateToken({email, role})
    res.status(201).json({status:'ok', data:tokens})
    } catch (error) {
        console.log(`Server error`);
        res.status(500).json({status:'error', message: error})
    }


}

export default registerContoller