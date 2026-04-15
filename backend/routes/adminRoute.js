const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Tuyệt đối không viết chữ /api hay /admin ở đây
router.get('/summary', adminController.getDashboardSummary);

module.exports = router;