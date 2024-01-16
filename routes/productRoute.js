import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
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
router.get("/productPhoto/:pid", productPhotoController);

//delete rproduct
router.delete("/deleteProduct/:pid", deleteProductController);

//update  product
router.delete("/updateProduct/:pid", updateProductController);

//filter product
router.post("/productFilters", productFiltersController);

//product count
router.get("/productCount", productCountController);

//product per page
router.get("/productList/:page", productListController);


//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/relatedProduct/:pid/:cid", realtedProductController);

//category wise product
router.get("/productCategory/:slug", productCategoryController);
export default router;
