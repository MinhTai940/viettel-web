const router = require("express").Router()
const ctrl = require("../controllers/internetController")

router.get("/", ctrl.getAll)
router.post("/", ctrl.create)
router.put("/:id", ctrl.update)
router.delete("/:id", ctrl.delete)
router.get("/:id", ctrl.getById)

module.exports = router