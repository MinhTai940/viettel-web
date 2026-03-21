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