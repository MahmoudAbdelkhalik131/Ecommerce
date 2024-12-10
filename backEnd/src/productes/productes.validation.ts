import { body, param } from "express-validator";
import subcategoriesSchema from "../Subcategories/subcategories.schema";
import validetorMiddleware from "../middleware/validator.middleware";
import categoriesSchema from "../categories/categories.schema";
import validatorMiddleware from "../middleware/validator.middleware";
import ProductsSchema from "./Products.schema";

class ProductesValidation {
  createOne = [
    body("name")
      .notEmpty()
      .withMessage("Name is REQUIRED")
      .isLength({
        min: 2,
        max: 40,
      })
      .withMessage("Length should be between 2 and 40"),
      body("categories").isMongoId().withMessage("not such category").custom(async(val)=>{
        const category=await categoriesSchema.findById(val)
        if(!category){
            throw new Error("no category have this id")
        }
        return true;
      }),
      body("subcategories").isMongoId().withMessage("not such category").custom(async(val,{req})=>{
        const subcategories = await subcategoriesSchema.findById(val)
        if(! subcategories){throw new Error("there is no sub category")}
        else if(subcategories.Categories._id!.toString() !==req.body.category.toString()){ //Categories._id becuase if we write only Categories it will return the whole object of category not only the id beacuse we made POPULATION
            throw new Error("you Entered subcategory not in the category you Entred")
        }
      }),
    validetorMiddleware,
  ];
  getOne = [
    param("id").isMongoId().withMessage("invalid id"),
    validetorMiddleware,
  ];
  deleteOne = [
    param("id").isMongoId().withMessage("invalid id"),
    validetorMiddleware,
  ];
  updateOne = [
    param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
    body('name').optional()
        .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
    body('description').optional()
        .isLength({min: 2, max: 500}).withMessage((val, {req}) => req.__('validation_length_long')),
    body('price').optional()
        .isFloat({min: 1, max: 10000000}).withMessage((val, {req}) => req.__('validation_value')),
    body('quantity').optional()
        .isInt({min: 1, max: 10000000}).withMessage((val, {req}) => req.__('validation_value')),
    body('discount').optional()
        .isFloat({min: 1, max: 100}).withMessage((val, {req}) => req.__('validation_value'))
        .custom((val, {req}) => {
            req.body.priceAfterDiscount = req.body.price - (req.body.price * val / 100)
            return true;
        }),
    body('category').optional()
        .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
        .custom(async (val: string, {req}) => {
            const category = await categoriesSchema.findById(val);
            const product = await ProductsSchema.findById(req.params?.id)
            if (!category) throw new Error(`${req.__('validation_value')}`);
            if (category &&product?.subcategory.Categories._id!.toString() !== category._id?.toString()) throw new Error(`${req.__('validation_value')}`)
            return true;
        }),
    body('subcategory').optional()
        .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
        .custom(async (val: string, {req}) => {
            const subcategory = await subcategoriesSchema.findById(val);
            const product = await ProductsSchema.findById(req.params?.id)
            if (!subcategory || subcategory.Categories._id!.toString() !== req.body.category.toString()) throw new Error(`${req.__('validation_value')}`)
            if (subcategory &&product?.category!.toString() !== req.body.subcategory.Categories._id.toString()) throw new Error(`${req.__('validation_value')}`)
            return true;
        }),
    validatorMiddleware
]
}

const productesValidation = new ProductesValidation();
export default productesValidation;
