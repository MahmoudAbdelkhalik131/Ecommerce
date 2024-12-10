import { Request, Response, NextFunction } from "express";
import subcategoriesSchema from "./subcategories.schema";
import AsyncHandler from "express-async-handler";
import Subcategories from "./subcategories.interface";
import refactorServices from "../refactorServices";
class SubcategoriesServices {
  setCategoryId(req: Request, res: Response, next: NextFunction) {
    if (req.params.categoryId && !req.body.Categories)
      req.body.Categories = req.params.categoryId;
    next();
  }
  setFilterData(req: Request, res: Response, next: NextFunction){
    const filterDate: any = {};
    if (req.params.categoryId) filterDate.Categories = req.params.categoryId;
    req.filterData=filterDate
    next();
  }
  getAll =refactorServices.getAll<Subcategories>(subcategoriesSchema)
  getOne =refactorServices.getById<Subcategories>(subcategoriesSchema)
  create =refactorServices.create<Subcategories>(subcategoriesSchema)
  updata = refactorServices.update<Subcategories>(subcategoriesSchema)
  delete =refactorServices.delete<Subcategories>(subcategoriesSchema)
}
const subcategoriesservices = new SubcategoriesServices();

export default subcategoriesservices;
