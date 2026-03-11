const Package = require("../models/Package")

// =============================
// GET ALL PACKAGES
// =============================
exports.getPackages = async (req, res) => {
    try {

        const packages = await Package
            .find()
            .sort({ createdAt: -1 })

        res.json(packages)

    } catch (error) {

        res.status(500).json({
            message: "Lỗi khi lấy danh sách gói cước",
            error: error.message
        })

    }
}


// =============================
// CREATE PACKAGE
// =============================
exports.createPackage = async (req, res) => {

    try {

        const {
            name,
            data,
            price,
            duration,
            sms_code,
            category
        } = req.body

        const newPackage = new Package({
            name,
            data,
            price,
            duration,
            sms_code,
            category
        })

        const savedPackage = await newPackage.save()

        res.status(201).json(savedPackage)

    } catch (error) {

        res.status(500).json({
            message: "Lỗi khi tạo gói cước",
            error: error.message
        })

    }

}


// =============================
// UPDATE PACKAGE
// =============================
exports.updatePackage = async (req, res) => {

    try {

        const {
            name,
            data,
            price,
            duration,
            sms_code,
            category
        } = req.body

        const updatedPackage = await Package.findByIdAndUpdate(

            req.params.id,

            {
                name,
                data,
                price,
                duration,
                sms_code,
                category
            },

            { new: true }

        )

        res.json(updatedPackage)

    } catch (error) {

        res.status(500).json({
            message: "Lỗi khi cập nhật gói cước",
            error: error.message
        })

    }

}


// =============================
// DELETE PACKAGE
// =============================
exports.deletePackage = async (req, res) => {

    try {

        await Package.findByIdAndDelete(req.params.id)

        res.json({
            message: "Xóa gói cước thành công"
        })

    } catch (error) {

        res.status(500).json({
            message: "Lỗi khi xóa gói cước",
            error: error.message
        })

    }

}