import { Router } from "express";
import subcategoriesservices from "./subcategories.services";
import subCategoriesValidation from "./subcategories.validation";


const subcategoriesRouter:Router=Router()
subcategoriesRouter.route('/')
  .get(subcategoriesservices.setFilterData,subcategoriesservices.getAll)
  .post(subcategoriesservices.setCategoryId,subCategoriesValidation.createOne,subcategoriesservices.create)
subcategoriesRouter.route('/:id')
  .get(subCategoriesValidation.getOne,subcategoriesservices.getOne)
  .put(subCategoriesValidation.updateOne,subcategoriesservices.updata)
  .delete(subCategoriesValidation.deleteOne,subcategoriesservices.delete)

export default subcategoriesRouter