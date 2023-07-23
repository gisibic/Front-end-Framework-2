import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./routers/product"
import userRouter from "./routers/users"

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", productRouter)
app.use("/api", userRouter)

mongoose.connect(`mongodb://127.0.0.1:27017/front-end-framework2`);

export const viteNodeApp = app;
