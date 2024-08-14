import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoute from "./routes/non-secure routes/authroute.js";
import { requireSignin, isAdmin } from "./middlewares/authMiddleware.js";
import insuranceRoute from "./routes/secure routes/insuranceroute.js";
import adminRoute from "./routes/secure routes/adminroute.js";

dotenv.config();

//database config
connectDB();

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());

//middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.0.114:3000;",
      "http://192.168.0.110:3000;",
      "https://www.theoneclickdigital.com",
      "https://theoneclickdigital.com",
      "*",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    // replace with frontend origin
    credentials: true, // allow credentials (cookies, authorization headers )
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Non secure Routes
app.use("/api/v1/auth", authRoute);
//middleware
app.use("/api/v1", requireSignin);
//secure routes
app.use("/api/v1/insurance", insuranceRoute);

//Admin routes
app.use("/api/v1", isAdmin);
app.use("/api/v1/admin", adminRoute);


// Server Start
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
