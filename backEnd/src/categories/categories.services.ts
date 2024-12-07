import { Request, Response, NextFunction } from "express";
import Categories from "./categories.interface";
import AsyncHandler from "express-async-handler";
import categoriesSchema from "./categories.schema";

class CategoriesServices {
  getAll=AsyncHandler( async(req: Request, res: Response, next: NextFunction)=> {
    const categories: Categories[] = await categoriesSchema.find();
    res.status(200).json({ data: categories });
  })
   create=AsyncHandler(async(req: Request, res: Response, next: NextFunction)=> {
    const category: Categories = await categoriesSchema.create(req.body);
    res.status(201).json({ data: category });
  })
   getById=AsyncHandler(async(req:Request,res:Response)=>{
    const category:Categories | null=await categoriesSchema.findById(req.params.id)
    res.status(200).json({data:category})
  })
   update = AsyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const category:Categories|null=await categoriesSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({data: category})
  })
   delete=AsyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
       await categoriesSchema.findByIdAndDelete(req.params.id)
    res.status(204).json({data:"item deleted"})
  })
}
const categoriesServices = new CategoriesServices();
export default categoriesServices;
