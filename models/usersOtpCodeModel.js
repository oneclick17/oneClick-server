import mongoose from "mongoose";

const otpCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otpCodeHash: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("usersOtpCode", otpCodeSchema);

