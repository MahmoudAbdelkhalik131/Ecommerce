import { Request, Response, NextFunction } from "express";
import Categories from "./categories.interface";
import AsyncHandler from "express-async-handler";
import categoriesSchema from "./categories.schema";
import refactorServices from "../refactorServices";

class CategoriesServices {
   getAll=refactorServices.getAll<Categories>(categoriesSchema)
   create=refactorServices.create<Categories>(categoriesSchema)
   getById=refactorServices.getById<Categories>(categoriesSchema)
   update = refactorServices.update<Categories>(categoriesSchema)
   delete=refactorServices.delete<Categories>(categoriesSchema)
}
const categoriesServices = new CategoriesServices();
export default categoriesServices;
