import userModel from "../models/userModel.js";
import otpCodeModel from "../models/otpCodeModel.js";
import partnerInfoModel from "../models/partnerInfoModel.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import moment from "moment";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

//register route
export const registerController = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { name, email, password, isAdmin } = req.body;
    //validations

    if (!name || !email || !password) {
      res.status(403);
      res.send(`required parameters missing, 
      example request body:
      {
          name:"akbar hafeez"
          email: "some@email.com",
          password: "some$password"
      } `);
      return;
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Register the user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      isAdmin: false,
      password: hashedPassword,
    }).save();

    //gernerating pinCode

    const pinCode = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("pinCode: ", pinCode);

    const otpCodeHash = await hashPassword(pinCode);
    console.log(otpCodeHash);

    const code = new otpCodeModel({
      email,
      otpCodeHash,
    });
    await code.save();
    console.log("code: ", code);

    const emailMessage = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Static Template</title>
    
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style="
          margin: 0;
          font-family: "Poppins", sans-serif;
          background: #ffffff;
          font-size: 14px;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 45px 30px 60px;
            background: #f4f7ff;
            background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
            background-repeat: no-repeat;
            background-size: 800px 452px;
            background-position: top center;
            font-size: 14px;
            color: #434343;
          "
        >
          <header>
            <table style="width: 100%;">
              <tbody>
                <tr style="height: 0;">
                  <td>
                   <h1 style="
                   margin: 0;
                   font-size: 32px;
                   font-weight: 700;
                   color: #1a9ed1;
                   ">
                   OneClick Digital
                   </h1>
                  </td>
                  <td style="text-align: right;">
                    <span
                      style="font-size: 16px; line-height: 30px; color: #ffffff;"
                      >${moment().format("Do MMM  YYYY")}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </header>
    
          <main>
            <div
              style="
                margin: 0;
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #ffffff;
                border-radius: 30px;
                text-align: center;
              "
            >
              <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 500;
                    color: #1f1f1f;
                  "
                >
                  Your OTP
                </h1>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  "
                >
                  Hey ${name},
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  "
                >
                  Thank you for choosing OneClick Digital Company. Use the following OTP
                  to complete the procedure to register your email address. OTP is
                  valid for
                  <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
                  Do not share this code with others, including OneClick Digital
                  employees.
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 60px;
                    font-size: 40px;
                    font-weight: 600;
                    letter-spacing: 25px;
                    color: #ba3d4f;
                  "
                >
                  ${pinCode}
                </p>
              </div>
            </div>
    
            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 90px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              "
            >
              Need help? Ask at
              <a
                href="mailto:bilal@theoneclickdigital.com"
                style="color: #499fb6; text-decoration: none;"
                >bilal@theoneclickdigital.com</a
              >
              or visit our
              <a
                href=""
                target="_blank"
                style="color: #499fb6; text-decoration: none;"
                >Help Center</a
              >
            </p>
          </main>
    
          <footer
            style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              text-align: center;
              border-top: 1px solid #e6ebf1;
            "
          >
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #434343;
              "
            >
              OneClick Digital Company
            </p>
            <p style="margin: 0; margin-top: 8px; color: #434343;">
              Address 540, City, State.
            </p>
            <div style="margin: 0; margin-top: 16px;">
              <a href="" target="_blank" style="display: inline-block;">
                <img
                  width="36px"
                  alt="Facebook"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
                />
              </a>
              <a
                href=""
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Instagram"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
              /></a>
              <a
                href=""
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Twitter"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
                />
              </a>
              <a
                href=""
                target="_blank"
                style="display: inline-block; margin-left: 8px;"
              >
                <img
                  width="36px"
                  alt="Youtube"
                  src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
              /></a>
            </div>
            <p style="margin: 0; margin-top: 16px; color: #434343;">
              Copyright © 2024 Company. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
    
        `;

    console.log(emailMessage);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "arsalantech277@gmail.com",
        pass: "obcg btqd nhdx rzqz",
      },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "arsalantech277@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Oneclick Digital Registration Alert", // Subject line
        html: emailMessage, // plain text body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

    res.status(200).json({
      success: true,
      message: "otp code sent",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const optCodeComplete = async (req, res) => {
  try {
    const { pinCode, email } = req.body;
    console.log(pinCode, email);
    const otpRecord = await otpCodeModel.findOne({ email });
    console.log("otpRecord: ", otpRecord);

    if (!otpRecord) {
      // user not found
      res.status(403).send({
        message: "no email invalid otp",
      });
      return;
    }

    const isOtpValid = await comparePassword(pinCode, otpRecord.otpCodeHash);
    console.log("isOtpValid: ", isOtpValid);

    if (!isOtpValid) {
      res.status(403).send({
        message: "no hash invalid otp",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Email Verified Succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, userId, password } = req.body;
    //validation

    if (!userId || !password || !email) {
      return res.status(404).send({
        success: false,
        message: "Invalid userId or email",
      });
    }
    //check user
    const cnic_number = await partnerInfoModel.findOne({
      partner_cnic_number: userId,
    });
    console.log("cnic_number: ", cnic_number);
    console.log("cnic_number: ", cnic_number);

    if (!cnic_number) {
      return res.status(404).send({
        success: false,
        message: "userId/email is not registerd",
      });
    }

    const passDetail = await userModel.findOne({ email });

    const checkingPass = await comparePassword(password, passDetail.password);

    if (!checkingPass) {
      return res.status(404).send({
        success: false,
        message: " userId/email is not registerd",
      });
    }

    //token
    const token = jwt.sign(
      {
        name: passDetail.name,
        email: passDetail.email,
        userId,
        isAdmin: passDetail.isAdmin,
      },
      process.env.JWT_SECRET,
    );
    console.log("jwt token :", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/'
    });

    res.status(200).send({
      data: {
        name: passDetail.name,
        email: passDetail.email,
        isAdmin: passDetail.isAdmin,
        _id: passDetail._id,
      },
      success: true,
      message: "login successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController
