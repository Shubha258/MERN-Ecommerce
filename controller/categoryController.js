import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

//create catefory

export const createCategory = async (req, res) => {
  console.log("hello");
  //   return res.staus(200).send({ message: "from create side" });
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({ message: "name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "category already exist",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    return res.status(200).send({
      success: true,
      message: "category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error,
      success: false,
      message: "unable to create product",
    });
  }
};

// update category

export const updateCategory = async (req, res) => {
  console.log("hhh");
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      message: "updated successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "failed to update",
      success: "false",
    });
  }
};

// delete categroy

export const deleteCategory = async (req, res) => {
  console.log("hhh");
  try {
    // const {name}=req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      message: "deleted  successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "failed to update",
      success: "false",
    });
  }
};

// list all category
export const allCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};
