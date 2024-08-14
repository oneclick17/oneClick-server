import partnerInfoModel from "../models/partnerInfoModel.js";

export const postPartnerDatail = async (req, res) => {
    try {
        const {
            partner_cnic_name,
            partner_father_name,
            partner_mobile,
            partner_email,
            partner_dob,
            partner_status,
            partner_city,
            partner_cnic_number,
            partner_cnic_expiry_date,
            partner_home_address,
            partner_blood_cnic_name,
            partner_blood_cnic_number,
            partner_blood_relation,
            partner_bank_account
        } = req.body

        if (
            !partner_cnic_name
            || !partner_father_name
            || !partner_mobile
            || !partner_email
            || !partner_dob
            || !partner_status
            || !partner_city
            || !partner_cnic_number
            || !partner_cnic_expiry_date
            || !partner_home_address
            || !partner_blood_cnic_name
            || !partner_blood_cnic_number
            || !partner_blood_relation
            || !partner_bank_account

        ) {
            res.status(403);
            res.send(`required parameters missing ,
            example request body:
            {
                partner_cnic_name : dwd
                partner_father_name: weft
                partner_mobile :03434356455
                partner_email :fesd@rgt.rrt
                partner_dob : 2 8 2020
                partner_status : married /single
                partner_city : karachi, lahore, etc...
                partner_cnic_number : 34566334656536
                partner_cnic_expiry_date : 5 7 3037
                partner_home_address : fdgf 
                partner_blood_cnic_name : fdgd
                partner_blood_cnic_number :36346345
                partner_blood_relation :ghdf
                partner_bank_account : 346436365456
            } `);
            return;
        }




        const partnerDatail = await new partnerInfoModel({
            partner_cnic_name,
            partner_father_name,
            partner_mobile,
            partner_email,
            partner_dob,
            partner_status,
            partner_city,
            partner_cnic_number,
            partner_cnic_expiry_date,
            partner_home_address,
            partner_blood_cnic_name,
            partner_blood_cnic_number,
            partner_blood_relation,
            partner_bank_account
        }).save();

        const userId = partner_cnic_number;

        console.log("userId: ", userId);

        res.status(201).json({
            success: true,
            message: "partner registered successfully",
            userId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}
