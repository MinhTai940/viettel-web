const mongoose = require("mongoose")

const InternetCategorySchema = new mongoose.Schema({

    name: String

}, { timestamps: true })

module.exports = mongoose.model("InternetCategory", InternetCategorySchema)