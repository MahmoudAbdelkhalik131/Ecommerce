import { Request, Response, NextFunction } from "express";
import ProductsSchema from "./Products.schema";
import { Products } from "./Productes.interface";
import refactorServices from "../refactorServices";
class ProductesServices {
  getAll =refactorServices.getAll<Products>(ProductsSchema)
  getOne =refactorServices.getById<Products>(ProductsSchema)
  create =refactorServices.create<Products>(ProductsSchema)
  updata = refactorServices.update<Products>(ProductsSchema)
  delete =refactorServices.delete<Products>(ProductsSchema)
}
const productesServices = new ProductesServices();

export default productesServices;
