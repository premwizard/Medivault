// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

// Custom middleware & routes
const errorHandler = require("./middleware/errorHandler");
const recordRoutes = require("./routes/recordRoutes");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ---------- MIDDLEWARE ----------

// Security headers
app.use(helmet());

// Enable CORS for all origins (can restrict if needed)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Static folder for file uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rate limiting: 100 requests / 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ---------- DATABASE CONNECTION ----------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ---------- ROUTES ----------

// Health check route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "📦 MedVault API is running..." });
});

// Auth (Register, Login, Me)
app.use("/api/auth", authRoutes);

// Records (CRUD + Public/Private)
app.use("/api/records", recordRoutes);

// ---------- ERROR HANDLING ----------
app.use(errorHandler);

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
