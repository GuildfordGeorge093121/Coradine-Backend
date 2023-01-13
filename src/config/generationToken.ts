import jwt from "jsonwebtoken"
import env from "./envir"
const generateToken = async ({email,role}:{email:string, role:any})=>{
    const refreshToken= await jwt.sign(
        {email,role},
        env.REFRESH_KEY_SECRET,
        {expiresIn: '1d'}
    )
    const accessToken= await jwt.sign(
        {email,role},
        env.ACCESS_KEY_SECRET,
        {expiresIn: '15m'}
    )
    return {accessToken, refreshToken}
}
export default generateToken