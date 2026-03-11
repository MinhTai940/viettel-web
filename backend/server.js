const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/database")

const packageRoutes = require("./routes/packageRoutes")
const newsRoutes = require("./routes/newsRoutes")

const authRoutes = require("./routes/authRoutes")

const categoryRoutes = require("./routes/categoryRoutes")


const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/packages", packageRoutes)
app.use("/api/news", newsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/categories", categoryRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})