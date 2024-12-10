import { Router } from "express";
import categoriesServices from "./categories.services";
import subcategoriesRouter from "../Subcategories/subcategories.router";
import validetorMiddleware from "../middleware/validator.middleware";
import { body } from "express-validator";
import categoriesSchema from "./categories.schema";
import categoriesValidation from "./categories.validation";
const categoriesRouter = Router();
categoriesRouter.use("/:categoryId/subcategory", subcategoriesRouter);
categoriesRouter
  .route("/")
  .get(categoriesServices.getAll)
  .post(categoriesValidation.createOne ,categoriesServices.create);
categoriesRouter
  .route("/:id")
  .get( categoriesValidation.getOne,categoriesServices.getById)
  .put(categoriesValidation.updateOne,categoriesServices.update)
  .delete(categoriesValidation.deleteOne,categoriesServices.delete);
export default categoriesRouter;
