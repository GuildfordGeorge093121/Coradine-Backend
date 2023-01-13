import fs from 'fs/promises'
import path from 'path'
import { Request,Response, NextFunction } from 'express'

export const requestLog= (req:Request, res:Response, next:NextFunction)=>{
    const log= `${req.method}---${req.path}---${req.ip}---${Date()}\n`
    fs.appendFile(path.join(__dirname, "../../",'logs','clientRequest.txt'), log)
    next()
}  
export const databaseLog= (res:string)=>{
    fs.writeFile(path.join(__dirname, "../../",'logs','database.txt'), res)
}  
 