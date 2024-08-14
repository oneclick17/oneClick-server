import mongoose from "mongoose";

const partnerInfoSchema = new mongoose.Schema(
    {

        partner_cnic_name: {
            type: String,
            required: true,
            // trim: true,
            lowercase: true
        },

        partner_father_name: {
            type: String,
            required: true,
            // trim: true,
            lowercase: true
        },

        partner_mobile: {
            type: String,
            required: true,

        },

        partner_email: {
            type: String,
            required: true,
            lowercase: true

        },

        partner_dob: {
            type: String,
            required: true,
        },

        partner_status: {
            type: String,
            required: true,
            lowercase: true

        },

        partner_city: {
            type: String,
            required: true,
            trim: true,
            lowercase: true

        },

        partner_cnic_number: {
            type: String,
            required: true,

        },

        partner_cnic_expiry_date: {
            type: String,
            required: true
        },

        partner_home_address: {
            type: String,
            required: true,
            lowercase: true,

        },

        partner_blood_cnic_name: {
            type: String,
            required: true,
            lowercase: true

        },

        partner_blood_cnic_number: {
            type: String,
            required: true,

        },

        partner_blood_relation: {
            type: String,
            required: true,
            lowercase: true
        },

        partner_bank_account: {
            type: String,
            required: true,

        }


    },
    { timestamps: true }
);

export default mongoose.model("partner-detail", partnerInfoSchema);