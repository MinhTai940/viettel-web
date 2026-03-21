const router = require("express").Router()
const InternetCategory = require("../models/InternetCategory")

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
    await InternetCategory.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted" })
})

module.exports = router