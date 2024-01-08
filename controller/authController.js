import userModels from "../models/userModels.js";

export const registerController = async (req, res) => {
  console.log("inside authroute");
  try {
    const { Name, Email, Password, Phone, Address } = req.body;

    // const{name,email,password,phone,address}={Name,Email,Password,Phone,Address};
    const name = Name;
    const email = Email;
    const password = Password;
    const phone = Phone;
    const address = Address;

    console.log(name);
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }

    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }

    //existing user
    const existinguser = await userModels.findOne({ email });

    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "already register please login",
      });
    }
    // creating account

    const user = new userModels({
      name,
      email,
      password,
      phone,
      address,
    }).save();
    return res.status(201).send({
      status: true,
      message: "registraion successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "fail in registraion",
      message,
    });
  }
};


export const testController=(req,res)=>
{
  res.status(200).send('protected route');
}