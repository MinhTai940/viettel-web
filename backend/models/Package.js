const mongoose = require("mongoose")

const PackageSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    data: {
        type: String
    },

    call_minutes: {
        type: String
    },

    duration: {
        type: String
    },

    sms_code: {
        type: String
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Package", PackageSchema)