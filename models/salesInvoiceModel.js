import mongoose from "mongoose";

const salesInvoieScema = new mongoose.Schema(
  {
    invoice_id: {
      type: String,
      required: true,
    },
    client_name: {
      type: String,
      required: true,
    },
    client_designation: String,
    client_mobile: String,
    client_ptcl_uan: String,
    client_email: String,
    client_dob: String,
    client_company_name: String,
    policy_company_name: String,
    policy_name: String,
    policy_no: String,
    policy_issue_date: String,
    policy_expired_date: String,
    policy_gross_amount: Number,
    policy_net_amount: Number,
    policy_payment_mode: String,
    policy_payment_invoice_attachment: String,
    partner_agent_employment_code: String,
    partner_agent_name: String,
  },
  { timestamps: true }
);

export default mongoose.model("sales-invoice", salesInvoieScema);
