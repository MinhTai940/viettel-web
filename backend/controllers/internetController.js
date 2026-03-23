const InternetPackage = require("../models/InternetPackage")

exports.getAll = async (req, res) => {
    const data = await InternetPackage.find().populate("category")
    res.json(data)
}

exports.create = async (req, res) => {
    const pkg = new InternetPackage(req.body)
    await pkg.save()
    res.json(pkg)
}

exports.delete = async (req, res) => {
    await InternetPackage.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted" })
}
exports.update = async (req, res) => {
    const data = await InternetPackage.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(data)
}

exports.remove = async (req, res) => {
    await InternetPackage.findByIdAndDelete(req.params.id)
    res.json({ message: "deleted" })
}
exports.getById = async (req, res) => {
    const data = await InternetPackage
        .findById(req.params.id)
        .populate("category")

    res.json(data)
}