const Contact = require('../models/Contact');

// [GET] Lấy cấu hình
exports.getContact = async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create({ zaloName: 'Admin Viettel', zaloPhone: '0981234567', qrCodeUrl: '' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("🚨 Lỗi lấy cấu hình:", error);
    res.status(500).json({ message: 'Lỗi lấy cấu hình liên hệ' });
  }
};

// [POST] Lưu cấu hình (DÙNG CÁCH CỔ ĐIỂN, CHỐNG MỌI LỖI MONGOOSE)
exports.updateContact = async (req, res) => {
  try {
    console.log("📝 Request body:", req.body);
    console.log("📁 Request file:", req.file);
    
    const { zaloName, zaloPhone, qrCodeUrl } = req.body;
    let newQrUrl = qrCodeUrl; 

    // Nếu có file ảnh tải lên thì lấy đường dẫn mới
    if (req.file) {
      newQrUrl = `/uploads/${req.file.filename}`;
      console.log("📸 New QR URL:", newQrUrl);
    }

    // 1. Tìm xem trong kho có cấu hình nào chưa
    let contact = await Contact.findOne();
    console.log("🔍 Found contact:", contact);

    if (contact) {
      // 2. Nếu CÓ RỒI -> Thay đổi thông tin và dùng lệnh .save() cơ bản
      contact.zaloName = zaloName || contact.zaloName;
      contact.zaloPhone = zaloPhone || contact.zaloPhone;
      if (newQrUrl) contact.qrCodeUrl = newQrUrl;
      
      console.log("💾 Saving contact:", contact);
      await contact.save(); 
    } else {
      // 3. Nếu CHƯA CÓ -> Tạo mới hoàn toàn
      console.log("🆕 Creating new contact");
      contact = await Contact.create({ 
        zaloName: zaloName || 'Admin Viettel', 
        zaloPhone: zaloPhone || '0981234567', 
        qrCodeUrl: newQrUrl || '' 
      });
    }

    console.log("✅ Success:", contact);
    res.status(200).json({ message: 'Lưu cấu hình thành công!', contact });
  } catch (error) {
    console.error("🚨 Lỗi khi update cấu hình:", error.message);
    console.error("📋 Stack:", error.stack);
    res.status(500).json({ message: 'Lỗi cập nhật cấu hình', error: error.message });
  }
};