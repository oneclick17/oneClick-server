import mongoose from "mongoose";

const otpCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otpCodeHash: {
        type: String,
        required: true
    }
});

export default mongoose.model("otpCode", otpCodeSchema);

