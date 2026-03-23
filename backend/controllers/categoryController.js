const Category = require("../models/Category")

exports.getCategories = async (req, res) => {

    const categories = await Category.find()

    res.json(categories)

}

exports.createCategory = async (req, res) => {

    const category = new Category({
        name: req.body.name,
        parent: req.body.parent || null
    })

    await category.save()

    res.json(category)
}
exports.deleteCategory = async (req, res) => {

    await Category.findByIdAndDelete(req.params.id)

    res.json({ message: "Deleted" })

}