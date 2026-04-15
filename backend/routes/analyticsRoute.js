const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Tuyệt đối không viết chữ /api hay /analytics ở đây
router.get('/visitors', analyticsController.getVisitorStats);

module.exports = router;