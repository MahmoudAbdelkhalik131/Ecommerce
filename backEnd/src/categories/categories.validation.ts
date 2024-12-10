import { body, param } from "express-validator";
import categoriesSchema from "./categories.schema";
import validetorMiddleware from "../middleware/validator.middleware";

class CategoriesValidation {
  createOne = [
    body("name")
      .notEmpty()
      .withMessage((val,{ req }) => req.__('validation_field'))// you must put val as a parameter and do not delete it because this message will not work it it will return an error   
      .isLength({
        min: 2,
        max: 40,
      })
      .withMessage("Length should be between 2 and 40")
      .custom(async (val: string) => {
        const category = await categoriesSchema.findOne({ name: val });
        if (category) {
          throw new Error("category name must be unique");
        }
        return true;
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
    param("id").isMongoId().withMessage("invalid Id"),
    body("name")
      .optional()
      .isLength({
        min: 2,
        max: 40,
      })
      .withMessage("Length should be between 2 and 40")
      .custom(async (val: string, { req }) => {
        const category = await categoriesSchema.findOne({ name: val });
        if (category && category._id !== req.params?.id) {
          throw new Error("category name must be unique");
        }
        return true;
      }),
    validetorMiddleware,
  ];
}

const categoriesValidation = new CategoriesValidation();
export default categoriesValidation;
