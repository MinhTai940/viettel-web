const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/database")

const packageRoutes = require("./routes/packageRoutes")
const newsRoutes = require("./routes/newsRoutes")

const authRoutes = require("./routes/authRoutes")

const categoryRoutes = require("./routes/categoryRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const internetRoutes = require("./routes/internetRoutes")
const internetCategoryRoutes = require("./routes/internetCategoryRoutes")
const simRoutes = require('./routes/simRoutes');
const internetOrderRoutes = require("./routes/internetOrderRoutes")



const app = express()

app.use(cors())
app.use(express.json())

// ⭐ phục vụ ảnh upload
app.use("/uploads", express.static("uploads"))

connectDB()

app.use("/api/packages", packageRoutes)
app.use("/api/news", newsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/uploads", express.static("uploads"))
app.use("/api/upload", uploadRoutes)
app.use("/api/internet", internetRoutes)
app.use("/api/internet-category", internetCategoryRoutes)
app.use('/api/sim', simRoutes);
app.use("/api/internet-orders", internetOrderRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("🚀 Server running on port " + PORT)
})