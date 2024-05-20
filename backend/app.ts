import { json, urlencoded } from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import router from "./router/app.route";

dotenv.config();

const app = express();

// adding middlewares
app.use(json());
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: true }));

// adding your routes here..
app.use("/", router);

export default app;
