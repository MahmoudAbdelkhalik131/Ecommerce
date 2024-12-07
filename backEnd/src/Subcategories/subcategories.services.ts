import { Request, Response, NextFunction } from "express";
import subcategoriesSchema from "./subcategories.schema";
import AsyncHandler from "express-async-handler";
import Subcategories from "./subcategories.interface";
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
  getAll = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let filterData:any={}
      if(req.filterData) filterData=req.filterData
      const sub: Subcategories[] = await subcategoriesSchema.find(filterData);
      res.status(200).json({ data: sub });
    }
  );
  getOne = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const sub: Subcategories | null = await subcategoriesSchema.findById(
        req.params.id
      );
      res.status(200).json({ data: sub });
    }
  );
  create = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const sub: Subcategories = await subcategoriesSchema.create(req.body);
      res.status(201).json({ data: sub });
    }
  );
  updata = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const sub: Subcategories | null =
        await subcategoriesSchema.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
      res.status(200).json({ data: sub });
    }
  );
  delete = AsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const sub: Subcategories | null =
        await subcategoriesSchema.findByIdAndDelete();
      res.status(204).json({});
    }
  );
}
const subcategoriesservices = new SubcategoriesServices();

export default subcategoriesservices;
