import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";

const app = express();
dotenv.config();

// connection db
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoute);

//admin create category routes
app.use("/api/v1/category", categoryRoute);

//create product
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send("<h1>your are in server side</h1>");
});

// console.log(`${process.env.PORT}`)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`we are port ${PORT}`);
});
