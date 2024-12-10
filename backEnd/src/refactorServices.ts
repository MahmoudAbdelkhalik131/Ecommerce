import { Request, Response, NextFunction } from "express";

import AsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import ApiErrors from "./utils/apiErrors";

class RefactorServices {
  getAll = <modelType>(model: mongoose.Model<any>) =>
    AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      let filterData: any = {};
      if (req.filterData) filterData = req.filterData;
      const document: modelType[] = await model.find(filterData);
      res.status(200).json({ data: document });
    });
  getOne = <modelType>(model: mongoose.Model<any>) =>
    AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const document: modelType | null = await model.findById(req.params.id);
      if (!document) {
        return next(new ApiErrors(`${req.__('not_found')}`,400))
      } else res.status(200).json({ data: document });
    });
  create = <modelType>(model: mongoose.Model<any>) =>
    AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const document: modelType = await model.create(req.body);
      if (!document) {
        res.status(400).json({ data: new ApiErrors(`${req.__('not_found')}`, 400) });
      } else res.status(200).json({ data: document });
    });
  getById = <modelType>(model: mongoose.Model<any>) =>
    AsyncHandler(async (req: Request, res: Response,next:NextFunction) => {
      const document: modelType | null = await model.findById(req.params.id);
      if (!document) {
        return next(new ApiErrors(`${req.__('not_found')}`,400))
      } else res.status(200).json({ data: document });
    });
  update = <modelType>(model: mongoose.Model<any>) =>
    AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const document: modelType | null = await model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!document) {
        return next(new ApiErrors('Date not found',400))
      } else res.status(200).json({ data: document });
    });
  delete = <modelType>(model: mongoose.Model<any>) =>
    AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const document =await model.findByIdAndDelete(req.params.id);
      if (!document) {
        return next(new ApiErrors('Date not found',400))
      } else res.status(200).json({ data: document });
    });
}
const refactorServices = new RefactorServices();
export default refactorServices;
