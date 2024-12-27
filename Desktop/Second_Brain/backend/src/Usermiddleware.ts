import { Request,Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET="Code is the real love";
export const UserMiddleware=async (req:Request,res:Response,next:NextFunction)=>{
    // const password=req.body.password;
    const header = req.headers["authorization"];
    if (header) {
        try {
            const is_verify = jwt.verify(header, JWT_SECRET);
            if(is_verify){
                //@ts-ignore
                req.userId=is_verify.id;
                next();
            }  
        } catch (err) {
            res.status(401).send("Unauthorized");
        }
    } else {
        res.status(401).send("Unauthorized");
    }
}