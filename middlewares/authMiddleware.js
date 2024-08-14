import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected routes token based
export const requireSignin = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    console.log("decode: ", decode);
    const decodedBody = {
      name: decode.name,
      email: decode.email,
      isAdmin: decode.isAdmin,
      _id: decode._id
    };
    next()
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

//admin
export const isAdmin = async (req, res, next) => {
  try {

    const token = req.cookies.token;
    const checkingAdmin = JWT.verify(token, process.env.JWT_SECRET);
    console.log("checkingAdmin: ", checkingAdmin.isAdmin);

    if (
      checkingAdmin.isAdmin !== true
    ) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({
      success: false,
      message: "error in recognizing admin",
    });
  }
};
