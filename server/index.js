import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

import connectDB from "./mongoDB/connect.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-EE");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("Server is started on port http://localhost:8080");
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
