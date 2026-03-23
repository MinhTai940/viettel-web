const Package = require("../models/Package")

// =============================
// GET ALL PACKAGES
// =============================
exports.getPackages = async (req, res) => {
    try {

        const { category, search } = req.query

        const filter = {}

        if (category) {
            filter.category = category
        }

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            }
        }

        const packages = await Package
            .find(filter)
            .populate("category")
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
// GET ONE PACKAGE DETAIL
// =============================
exports.getPackageById = async (req, res) => {
    try {

        const pkg = await Package
            .findById(req.params.id)
            .populate("category")
            .populate("related_packages")

        if (!pkg) {
            return res.status(404).json({
                message: "Không tìm thấy gói cước"
            })
        }

        res.json(pkg)

    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy chi tiết gói cước",
            error: error.message
        })
    }
}


// =============================
// CREATE PACKAGE
// =============================
exports.createPackage = async (req, res) => {

    try {

        if (!req.body.name || !req.body.category) {
            return res.status(400).json({
                message: "Thiếu tên gói hoặc danh mục"
            })
        }

        const newPackage = new Package(req.body)

        const saved = await newPackage.save()

        res.status(201).json(saved)

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

        const pkg = await Package.findById(req.params.id)

        if (!pkg) {
            return res.status(404).json({
                message: "Không tìm thấy gói cước"
            })
        }

        const updated = await Package.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.json(updated)

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

        const pkg = await Package.findById(req.params.id)

        if (!pkg) {
            return res.status(404).json({
                message: "Không tìm thấy gói cước"
            })
        }

        await pkg.deleteOne()

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