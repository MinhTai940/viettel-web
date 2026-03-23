const mongoose = require("mongoose")

const InternetOrderSchema = new mongoose.Schema(
    {
        plan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "InternetPackage"
        },
        planName: String,

        name: String,
        phone: String,

        province: String,
        district: String,
        address: String,

        status: {
            type: String,
            default: "NEW"   // NEW / CALLED / DONE
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("InternetOrder", InternetOrderSchema)