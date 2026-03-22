const express = require('express');
const router = express.Router();
const simController = require('../controllers/simController');

router.get('/', simController.getAllSims); // Lấy danh sách (có hỗ trợ ?type=thuong & ?search=098*)
router.post('/', simController.createSim); // Thêm mới
router.put('/:id', simController.updateSim); // Sửa
router.delete('/:id', simController.deleteSim); // Xóa
// 1. Lấy danh sách
router.get('/', simController.getAllSims);

// 2. THẰNG BULK NÀY PHẢI NẰM NGAY ĐÂY (TRƯỚC THẰNG POST BÌNH THƯỜNG)
router.post('/bulk', simController.createBulkSims); 

// 3. Thêm 1 sim
router.post('/', simController.createSim);

// 4. Sửa và Xóa
router.put('/:id', simController.updateSim);
router.delete('/:id', simController.deleteSim);

module.exports = router; // LUÔN LUÔN NẰM CUỐI CÙNG