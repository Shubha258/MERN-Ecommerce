import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const loginController = async (req, res) => {
  console.log("inside authroute_login");
  try {
    const { Email, Password } = req.body;

    // const{name,email,password,phone,address}={Name,Email,Password,Phone,Address};

    const email = Email;
    const password = Password;

    console.log(email);

    if (!email) {
      return res.send({ message: "email is required" });
    }

    if (!password) {
      return res.send({ message: "password is required" });
    }

    //existing user

    const existinguser = await userModels.findOne({ email });
    console.log(existinguser);
    const token = await JWT.sign(
      { _id: existinguser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    if (existinguser) {
      const result = req.body.Password === existinguser.password;
      if (result) {
        return res.status(200).send({
          message: "successfully login",
          existinguser,
          token,
          success: true,
        });
      } else {
        return res.status(400).send({ message: "password doesn't match" });
      }
    } else {
      return res.status(400).send({ message: "invalid user id or password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "fail to login",
      message,
    });
  }
};
