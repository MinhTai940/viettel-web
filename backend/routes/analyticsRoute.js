const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Tuyệt đối không viết chữ /api hay /analytics ở đây
router.get('/visitors', analyticsController.getVisitorStats);

// Debug route only active when DEBUG_GA=true
router.get('/debug', analyticsController.getDebug);

module.exports = router;