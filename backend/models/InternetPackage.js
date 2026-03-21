const mongoose = require("mongoose")

const InternetPackageSchema = new mongoose.Schema({

    name: String,
    speed: String,
    price: Number,
    price_hn: Number,
    price_tinh: Number,
    wifi_device: String,
    mesh: Boolean,
    area: String,
    description: String,
    image: String,

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InternetCategory"
    }

}, { timestamps: true })

module.exports = mongoose.model("InternetPackage", InternetPackageSchema)