import Express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  allCategory,
  singleCategory,
} from "../controller/categoryController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = Express();

// create category

router.post("/createCategory", requireSignIn, isAdmin, createCategory);

//updae category
router.put("/updateCategory/:id", requireSignIn, isAdmin, updateCategory);

//delete category
router.delete("/deleteCategory/:id", requireSignIn, isAdmin, deleteCategory);

//  all category
router.get("/allCategory", allCategory);

//  all category
router.get("/singleCategory/:slug", singleCategory);

export default router;
