const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
  zaloName: { type: String, default: 'Admin Viettel' },
  zaloPhone: { type: String, default: '0981234567' },
  qrCodeUrl: { type: String, default: '' } // Sẽ chứa link ảnh QR
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);