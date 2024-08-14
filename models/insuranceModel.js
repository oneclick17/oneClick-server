import mongoose from "mongoose";

const BikeInsuranceSchema = new mongoose.Schema(
  {
    manufacturer: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("BikeInsurance", BikeInsuranceSchema);