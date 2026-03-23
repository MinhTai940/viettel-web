const InternetOrder = require("../models/InternetOrder")

exports.create = async (req, res) => {
    try {
        const order = new InternetOrder(req.body)
        await order.save()

        res.json({ message: "Đăng ký thành công" })
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" })
    }
}

exports.getAll = async (req, res) => {
    const data = await InternetOrder
        .find()
        .sort({ createdAt: -1 })

    res.json(data)
}
exports.updateStatus = async (req, res) => {

    const { status } = req.body

    const order = await InternetOrder.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    )

    res.json(order)
}