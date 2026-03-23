const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// IMPORT CÁI FILE UPLOAD.JS CỦA MÀY VÀO ĐÂY 
// (Nhớ sửa lại đường dẫn '../upload' cho khớp với thư mục thực tế của mày nhé, VD: '../middleware/upload')
const upload = require('../middleware/upload'); 

router.get('/', contactController.getContact);

// Dùng thằng upload của mày để hứng file tên là 'qrImage'
router.post('/', (req, res, next) => {
  console.log('📨 POST /contact received');
  upload.single('qrImage')(req, res, (err) => {
    if (err) {
      console.error('🚨 Multer error:', err.message);
      return res.status(500).json({ message: 'Lỗi upload file', error: err.message });
    }
    console.log('✅ File upload completed');
    next();
  });
}, contactController.updateContact);

module.exports = router;