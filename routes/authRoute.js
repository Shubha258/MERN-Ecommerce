import Express from "express";
import {
  registerController,
  testController,
} from "../controller/authController.js";
import { loginController } from "../controller/authLogin.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = Express.Router();

// post method for register
console.log("hello");
router.post("/register", registerController);
router.post("/login", loginController);

// test

router.get("/test", requireSignIn, isAdmin, testController);
// private routes

router.get("/user-auth", requireSignIn,(req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  console.log(res);
  res.status(200).send({ ok: true });
});

export default router;
