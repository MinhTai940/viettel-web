const router = require("express").Router()
const InternetCategory = require("../models/InternetCategory")
const InternetPackage = require("../models/InternetPackage")

// GET ALL
router.get("/", async (req, res) => {
    const data = await InternetCategory.find()
    res.json(data)
})

// CREATE
router.post("/", async (req, res) => {
    const item = new InternetCategory(req.body)
    await item.save()
    res.json(item)
})
// DELETE
router.delete("/:id", async (req, res) => {
    try {

        // ⭐ kiểm tra có gói thuộc danh mục không
        const used = await InternetPackage.findOne({
            category: req.params.id
        })

        if (used) {
            return res.status(400).json({
                message: "Danh mục đang có gói internet"
            })
        }

        await InternetCategory.findByIdAndDelete(req.params.id)

        res.json({ message: "Deleted" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
})
module.exports = router