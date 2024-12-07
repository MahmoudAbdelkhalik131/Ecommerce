import { Router } from "express";
import categoriesServices from "./categories.services";
import subcategoriesRouter from "../Subcategories/subcategories.router";
const categoriesRouter=Router()
categoriesRouter.use("/:categoryId/subcategory",subcategoriesRouter)
    categoriesRouter.route('/')
     .get(categoriesServices.getAll)
     .post(categoriesServices.create)
categoriesRouter.route('/:id')
     .get(categoriesServices.getById)
     .put(categoriesServices.update)
     .delete(categoriesServices.delete)
export default categoriesRouter