import { Router } from "express";
import productesServices from "./products.services";
import productesValidation from "./productes.validation";


const ProductesRouter:Router=Router()
ProductesRouter.route('/')
  .get(productesServices.getAll)
  .post(productesValidation.createOne,productesServices.create)
  ProductesRouter.route('/:id')
  .get(productesValidation.getOne,productesServices.getOne)
  .put(productesValidation.updateOne,productesServices.updata)
  .delete(productesValidation.deleteOne,productesServices.delete)

export default ProductesRouter