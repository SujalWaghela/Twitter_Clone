import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: "5mb" })); //to pass req.body
//limit should not be to high to prevent DoS attact
app.use(express.urlencoded({ extended: true })); //to pass form data(urlencoded data)

app.use(cookieParser());

//console.log(process.env.MONGO_URI);

// This was used for getting a / after the link to seprate the http://localhost:8080 / api/auth
app.get("/", (req, res) => {
  res.send("Welcome to the Twitter Clone API!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
