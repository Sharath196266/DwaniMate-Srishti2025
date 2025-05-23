import express from "express";
import cors from "cors";
import { useDwaniAPI } from "./dwani.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const response = await useDwaniAPI(message);
  res.json({ reply: response });
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
