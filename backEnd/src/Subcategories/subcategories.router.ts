import { Router } from "express";
import subcategoriesservices from "./subcategories.services";


const subcategoriesRouter:Router=Router()
subcategoriesRouter.route('/')
  .get(subcategoriesservices.setFilterData,subcategoriesservices.getAll)
  .post(subcategoriesservices.setCategoryId,subcategoriesservices.create)
subcategoriesRouter.route('/:id')
  .get(subcategoriesservices.getOne)
  .put(subcategoriesservices.updata)
  .delete(subcategoriesservices.delete)

export default subcategoriesRouter