import env from './config/envir'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import query from './db/db'
import jwt, { Secret } from 'jsonwebtoken'

import { STATUS_CODES } from 'http'
import authController from './controllers/authController'
import registerContoller from './controllers/registerController'
import userVerification from './middlewares/userVerification'
import refreshAccessToken from './middlewares/refreshAccessToken'
import logout from './controllers/logout'
import dotenv from 'dotenv'
import getUser from './controllers/getUser'
import { databaseLog, requestLog } from './middlewares/loggers'
dotenv.config()


const PORT = process.env.PORT || 4000;
const app= express();
app.use(morgan('dev'))
// Default middleware
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use(requestLog)

app.post("/login", authController)
app.post("/register", registerContoller)
app.put('/logout', logout)
app.get("/verify", userVerification, refreshAccessToken)
app.get('/user/:accessToken',getUser)

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`)
})