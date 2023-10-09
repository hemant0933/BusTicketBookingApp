import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import User from "./models/User.js";
import Bus from "./models/Bus.js";
import {buses} from './data/index.js';

import authRoutes from "./routes/auth.js";
import busRoutes from "./routes/bus.js";
import { verifyToken } from "./middleware/auth.js";
import { getUserInfo, login, register } from "./controllers/auth.js";

// CONGIGURATION
dotenv.config();

// Connect to Express app
const app = express();
app.use(express.json());
// adding Helmet to enhance your Rest API's security

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//using bodyParser to parse JSON bodies into JS objects

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//enabling CORS for all requests
app.use(cors({
  origin:'*'
}));


//adding morgan to log HTTP requests

app.use(morgan("common"));

// default route
app.get("/", (req, res) => {
  res.send("Welcome to the default API endpoint!");
});

app.post("/auth/register", register);

app.use("/auth", authRoutes);
app.use("/bus",busRoutes);


// Mongoose setup

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ADD DATA ONE TIME ONLY
      // Bus.insertMany(buses);
  })
  .catch((error) => console.log(`${error} did not connect`));

// Routes

// Create =====> // POST REQUEST
// Read =====> // GET REQUEST
// Update ====> // PUT REQUEST or PATCH
// delete ====> // DELETE REQUEST
