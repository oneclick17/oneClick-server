import salesInvoiceModel from "../models/salesInvoiceModel.js";
import partnerInfoModel from "../models/partnerInfoModel.js";

export const salesInvoiceController = async (req, res) => {
  try {
    const {
      invoice_id,
      client_name,
      client_designation,
      client_mobile,
      client_ptcl_uan,
      client_email,
      client_dob,
      client_company_name,
      policy_company_name,
      policy_name,
      policy_no,
      policy_issue_date,
      policy_expired_date,
      policy_gross_amount,
      policy_net_amount,
      policy_payment_mode,
      policy_payment_invoice_attachment,
      partner_agent_employment_code,
      partner_agent_name,
    } = req.body;

    if (
      !invoice_id ||
      !client_name ||
      !client_designation ||
      !client_mobile ||
      !client_ptcl_uan ||
      !client_email ||
      !client_dob ||
      !client_company_name ||
      !policy_company_name ||
      !policy_name ||
      !policy_no ||
      !policy_issue_date ||
      !policy_expired_date ||
      !policy_gross_amount ||
      !policy_net_amount ||
      !policy_payment_mode ||
      !policy_payment_invoice_attachment ||
      !partner_agent_employment_code ||
      !partner_agent_name
    ) {
      return res.status(403).send({
        success: false,
        message: `
            required fields are: 
            invoice_id: "" , 
            client_name: "" , 
            client_designation: "" , 
            client_mobile: "" , 
            client_ptcl_uan: "" , 
            client_email: "" , 
            client_dob: "" , 
            client_company_name: "" , 
            policy_company_name: "" , 
            policy_name: "" , 
            policy_no: "" , 
            policy_issue_date: "" , 
            policy_expired_date: "" , 
            policy_gross_amount: "" , 
            policy_net_amount: "" , 
            policy_payment_mode: "" , 
            policy_payment_invoice_attachment: "" , 
            partner_agent_employment_code: "" , 
            partner_agent_name: ""

            `,
      });
    }

    const checkingInvoice = salesInvoiceModel.findOne({ invoice_id });

    if (checkingInvoice.invoice_id) {
        return res.status(403).send({
            success: false,
            message: `sales invoice already exists`,
        });
    };

    const invoice = await new salesInvoiceModel({
      invoice_id,
      client_name,
      client_designation,
      client_mobile,
      client_ptcl_uan,
      client_email,
      client_dob,
      client_company_name,
      policy_company_name,
      policy_name,
      policy_no,
      policy_issue_date,
      policy_expired_date,
      policy_gross_amount,
      policy_net_amount,
      policy_payment_mode,
      policy_payment_invoice_attachment,
      partner_agent_employment_code,
      partner_agent_name,
    });

    console.log("invoice: ", invoice);

    // Send success response
    res.status(200).send({
      success: true,
      message: "sales invoice generated!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      err,
    });
  }
};

export const partnerData =  async (req, res)=>{
 try {
  const partners = await partnerInfoModel.find({});
  console.log("partnerData: ", partners);
    res.status(200).send({
      success: true,
      message: "All partners data",
      partners
    });
 } catch (error) {
  console.error(error);
  res.status(500).send({
    success: false,
    message: "Error getting partners data",
    error,
  });
 }
};