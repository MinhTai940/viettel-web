const router = require("express").Router()
const ctrl = require("../controllers/internetController")

router.get("/", ctrl.getAll)
router.post("/", ctrl.create)
router.delete("/:id", ctrl.delete)
router.put("/:id", ctrl.update)
router.delete("/:id", ctrl.remove)

module.exports = router