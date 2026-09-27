import { Router } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController";

import { productValidation } from "../validators/productValidator";
import { validateRequest } from "../middleware/validate";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  productValidation,
  validateRequest,
  createProduct
);

router.put(
  "/:id",
  productValidation,
  validateRequest,
  updateProduct
);

router.delete("/:id", deleteProduct);

export default router;