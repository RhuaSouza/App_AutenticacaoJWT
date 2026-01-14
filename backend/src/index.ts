import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
