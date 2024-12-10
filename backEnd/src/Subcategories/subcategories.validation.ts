import { body, param } from "express-validator";
import subcategoriesSchema from "./subcategories.schema";
import validetorMiddleware from "../middleware/validator.middleware";
import categoriesSchema from "../categories/categories.schema";

class SubCategoriesValidation {
  createOne = [
    body("name")
      .notEmpty()
      .withMessage("Name is REQUIRED")
      .isLength({
        min: 2,
        max: 40,
      })
      .withMessage("Length should be between 2 and 40"),
      body("Categories").isMongoId().withMessage("not such category"),
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
    param("id").isMongoId().withMessage("invalid Id"),

    body("name")
      .optional()
      .isLength({
        min: 2,
        max: 40,
      })
      .withMessage("Length should be between 2 and 40"),
    body ("Categories").isMongoId().withMessage("Invalid Category").custom(async(val,{req})=>{
        let category=await categoriesSchema.findById(val)
        if(!category){
            throw new Error("There is no such Category")
        }
    }),
    validetorMiddleware,
  ];
}

const subCategoriesValidation = new SubCategoriesValidation();
export default subCategoriesValidation;
