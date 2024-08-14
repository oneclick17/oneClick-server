import express from "express";
import {
  salesInvoiceController,
  partnerData,
} from "../../controllers/adminController.js";

//router object

const router = express.Router();

//routing for admin
router.post("/salesInvoice", salesInvoiceController);
router.get("/partnersData", partnerData);

export default router;
