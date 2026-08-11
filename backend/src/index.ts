import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 100, // har bir IP uchun 100 ta so'rov
});
app.use(limiter);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "TaskFlow API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});