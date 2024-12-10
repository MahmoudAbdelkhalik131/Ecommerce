
import {Request,Response,NextFunction, RequestHandler} from 'express'
import { validationResult } from 'express-validator'
 
const validetorMiddleware:RequestHandler=(req:Request,res:Response,next:NextFunction)=>{
      let errors=validationResult(req)    
    if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
          }
          else next();
}
export default validetorMiddleware