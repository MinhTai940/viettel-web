const express = require("express")
const router = express.Router()

const packageController = require("../controllers/packageController")

// =============================
// GET ALL PACKAGES
// =============================
router.get("/", packageController.getPackages)

// ⭐ GET PACKAGE DETAIL
router.get("/:id", packageController.getPackageById)

// =============================
// CREATE PACKAGE
// =============================
router.post("/", packageController.createPackage)

// =============================
// UPDATE PACKAGE
// =============================
router.put("/:id", packageController.updatePackage)

// =============================
// DELETE PACKAGE
// =============================
router.delete("/:id", packageController.deletePackage)

module.exports = router