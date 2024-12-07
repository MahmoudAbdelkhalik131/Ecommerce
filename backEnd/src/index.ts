import express  from "express";
import categoriesRouter from "./categories/categories.routes";
import subcategoriesRouter from "./Subcategories/subcategories.router";
declare module "express"{
    interface Request{
        filterData?:any
    }
}
const app:express.Application=express()
const mountRoutes=(app:express.Application)=>{
    app.use('/api/v1/categories',categoriesRouter)
    app.use('/api/v1/subcategories',subcategoriesRouter)
}
export default mountRoutes