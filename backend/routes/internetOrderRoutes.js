const router = require("express").Router()
const ctrl = require("../controllers/internetOrderController")

router.post("/", ctrl.create)
router.get("/", ctrl.getAll)
router.put("/:id/status", ctrl.updateStatus)

module.exports = router