const express = require("express")
const router = express.Router()
const upload = require("../middleware/upload")

router.post("/", upload.single("image"), (req, res) => {

    const url = `http://localhost:5000/uploads/${req.file.filename}`

    res.json({
        url
    })

})

module.exports = router