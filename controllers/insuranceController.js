import BikeInsuranceModel from "../models/insuranceModel.js"

//post insurance controller for admin
export const postInsuranceController = async (req,res)=>{
    try {
        const {percentage,manufacturer} = req.body
        const BikeInsurance = await new BikeInsuranceModel({
            percentage,
            manufacturer
          }).save();
      
          res.status(201).json({ 
            success: true,
            message: "Bike Insurance Plan Posted Successfully",
            BikeInsurance,
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}