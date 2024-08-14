import express from "express";
import { bikeInsuranceController } from "../../controllers/insuranceController.js";

//router object

const router = express.Router();

//routing for admin
router.post("/bike-insurance",bikeInsuranceController);



export default router;