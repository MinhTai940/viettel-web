const mongoose = require("mongoose")

const NewsSchema = new mongoose.Schema({

    title: String,
    image: String,
    content: String

}, { timestamps: true })

module.exports = mongoose.model("News", NewsSchema)