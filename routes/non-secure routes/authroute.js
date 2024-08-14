import express from "express";
import { registerController, loginController, optCodeComplete  } from "../../controllers/authController.js";
import { postPartnerDatail } from "../../controllers/partnerInfoController.js";

//router object

const router = express.Router();

//routing
router.post("/register", registerController);
router.post("/otpCode-complete", optCodeComplete);


//patener info routes
router.post("/partner-detail", postPartnerDatail);

//login

router.post("/login", loginController);



//forgot password




export default router;