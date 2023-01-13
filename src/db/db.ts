import { Pool } from 'pg'
import {databaseLog} from '../middlewares/loggers'
const pool= new Pool({
    user: "postgres",
    database: "coradineuser",
    password: "dad0208282611",
    host: "localhost",
    port: 5432
})
const query= async (text: string, params: any[])=>{
    // console.log(commandResult)
    const requestTime= new Date ()
    const commandResult= await pool.query(text,params)
    const afterRequest= new Date()
    const str= `${text}---ON---${requestTime}---DURATION---${afterRequest.getMilliseconds()-requestTime.getMilliseconds()} ms\n`    
    databaseLog(str)
    return commandResult;
}

export default query