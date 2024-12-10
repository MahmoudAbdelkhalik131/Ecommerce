import express  from "express";
import categoriesRouter from "./categories/categories.routes";
import subcategoriesRouter from "./Subcategories/subcategories.router";
import globalErrors from "./middleware/errors.middleware";
import ApiErrors from "./utils/apiErrors";
import ProductesRouter from "./productes/products.routes";
declare module "express"{
    interface Request{
        filterData?:any
    }
}
const app:express.Application=express()
const mountRoutes=(app:express.Application)=>{
    app.use('/api/v1/categories',categoriesRouter)
    app.use('/api/v1/subcategories',subcategoriesRouter)
    app.use('/api/v1/productes',ProductesRouter)
    app.all('*',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
          next(new ApiErrors(`route ${req.baseUrl}not found`,400))
    })
    app.use( globalErrors)
}
export default mountRoutes