const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");

// --- IMPORT ROUTES ---
const packageRoutes = require("./routes/packageRoutes");
const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const internetRoutes = require("./routes/internetRoutes");
const internetCategoryRoutes = require("./routes/internetCategoryRoutes");
const simRoutes = require("./routes/simRoutes");
const internetOrderRoutes = require("./routes/internetOrderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const analyticsRoutes = require('./routes/analyticsRoute');
const adminRoutes = require('./routes/adminRoute');

const app = express();

// --- MIDDLEWARES ---
app.use(cors()); // Fix lỗi CORS triệt để
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// --- DATABASE ---
connectDB();

// --- MOUNT ROUTES ---
app.use("/api/packages", packageRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/internet", internetRoutes);
app.use("/api/internet-category", internetCategoryRoutes);
app.use("/api/sim", simRoutes);
app.use("/api/internet-orders", internetOrderRoutes);
app.use("/api/contact", contactRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

// --- START SERVER ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("🚀 Server running on port " + PORT);
});