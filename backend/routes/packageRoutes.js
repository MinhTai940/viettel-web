const express = require("express")
const router = express.Router()

const packageController = require("../controllers/packageController")

router.get("/", packageController.getPackages)

router.post("/", packageController.createPackage)

router.put("/:id", packageController.updatePackage)

router.delete("/:id", packageController.deletePackage)

module.exports = router