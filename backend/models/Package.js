const mongoose = require("mongoose")

// ===== ADVANCED PACKAGE SUB SCHEMA =====
const AdvancedPackageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        data: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            default: 0
        },
        duration: {
            type: String,
            trim: true
        },
        sms_code: {
            type: String,
            trim: true
        }
    },
    { _id: false }
)


// ===== MAIN PACKAGE =====
const PackageSchema = new mongoose.Schema({

    // ===== BASIC =====
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    data: {
        type: String,
        trim: true
    },

    duration: {
        type: String,
        trim: true
    },

    sms_code: {
        type: String,
        trim: true
    },

    call_minutes: {
        type: String,
        trim: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true
    },

    // ===== HEADER CMS =====
    description: String,
    banner: String,
    video_url: String,

    // ===== FULL HTML CONTENT =====
    content: String,

    // ===== SECTION CMS =====
    info_detail: String,
    condition: String,
    register_guide: String,
    benefit: String,
    manage_guide: String,

    // ===== BENEFITS =====
    free_tv360: {
        type: Boolean,
        default: false
    },

    free_mybox: {
        type: Boolean,
        default: false
    },

    free_call: {
        type: Boolean,
        default: false
    },

    // ===== RELATED =====
    related_packages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Package"
        }
    ],

    // ===== ⭐ ADVANCED PACKAGES =====
    advanced_packages: [AdvancedPackageSchema],
    advanced_intro: {
        type: String
    },

},
    {
        timestamps: true
    })

module.exports = mongoose.model("Package", PackageSchema)