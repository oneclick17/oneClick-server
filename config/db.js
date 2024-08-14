import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "OneClick-Digital",
        });
        console.log(`MongoDB connected : ${connection.connection.host}`);
    } catch (err) {
        console.log("Error connecting to database: ", err);
    }
};

export default connectDB;

//http://localhost:8080/api/v1/auth/register