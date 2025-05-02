import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); //to pass req.body
app.use(express.urlencoded({ extended: true })); //to pass form data(urlencoded data)

app.use(cookieParser());

//console.log(process.env.MONGO_URI);

// This was used for getting a / after the link to seprate the http://localhost:8080 / api/auth
app.get("/", (req, res) => {
  res.send("Welcome to the Twitter Clone API!");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
