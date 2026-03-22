const mongoose = require('mongoose');

const simSchema = new mongoose.Schema({
  stt: { 
    type: String, 
    required: true 
  },
  soSim: { 
    type: String, 
    required: [true, 'Vui lòng nhập số SIM'],
    unique: true // Chống nhập trùng số
  },
  type: { 
    type: String, 
    enum: ['thuong', 'dep'], // Chỉ nhận 2 loại này để đẩy vào 2 Tab
    required: true,
    default: 'thuong'
  },
  price: {
    type: String,
    default: 'Liên hệ' // Cứ để hờ đây, sau này lỡ mày muốn hiện giá trên Card
  }
}, { timestamps: true });

module.exports = mongoose.model('Sim', simSchema);