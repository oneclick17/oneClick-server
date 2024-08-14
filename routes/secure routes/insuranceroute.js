import express from "express";
import { postInsuranceController } from "../../controllers/insuranceController.js";

//router object

const router = express.Router();

//routing for admin
router.post("/post-insurance",postInsuranceController);



export default router;