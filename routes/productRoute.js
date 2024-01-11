import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controller/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import expressFormidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/createProduct",
  requireSignIn,
  isAdmin,
  expressFormidable(),
  createProductController
);

//routes
router.put(
  "/updateProduct/:pid",
  requireSignIn,
  isAdmin,
  expressFormidable(),
  updateProductController
);

//get products
router.get("/getProduct", getProductController);

//single product
router.get("/getProduct/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/deleteProduct/:pid", deleteProductController);

//update  product
router.delete("/updateProduct/:pid", updateProductController);

export default router;
