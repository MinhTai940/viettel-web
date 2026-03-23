const Sim = require('../models/Sim');

// --- HÀM PHỤ TRỢ: ĐẾM SỐ THỨ TỰ THÔNG MINH ---
// Nhét vào đây để cả Thêm Tay và Thêm Excel đều dùng chung được
const getNextStt = async (simType) => {
  const allSims = await Sim.find({ type: simType }, 'stt');
  if (allSims.length === 0) return 1; // Chưa có số nào thì bắt đầu là 1
  
  let max = 0;
  allSims.forEach(s => {
    let num = parseInt(s.stt, 10); // Biến '005' thành số 5
    if (!isNaN(num) && num > max) max = num;
  });
  return max + 1; // Lấy số lớn nhất cộng 1
};

// ==========================================

// [GET] Lấy danh sách SIM
exports.getAllSims = async (req, res) => {
  try {
    const { type, search } = req.query;
    let query = {};
    if (type) query.type = type;

    if (search) {
      let regexStr = search.includes('*') ? '^' + search.replace(/\*/g, '.*') + '$' : search;
      query.soSim = { $regex: regexStr, $options: 'i' };
    }

    const sims = await Sim.find(query).sort({ stt: 1 });
    res.status(200).json(sims);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu SIM', error });
  }
};

// [POST] Thêm 1 SIM thủ công (ĐÃ ĐƯỢC ĐỘ AUTO STT)
exports.createSim = async (req, res) => {
  try {
    const { soSim, type, price } = req.body;
    
    const simExists = await Sim.findOne({ soSim });
    if (simExists) return res.status(400).json({ message: 'Số SIM này đã tồn tại!' });

    // Tự động gọi hàm tính STT, sau đó biến số 1 thành "001"
    const nextSttNum = await getNextStt(type);
    const stt = String(nextSttNum).padStart(3, '0');

    const newSim = new Sim({ stt, soSim, type, price });
    await newSim.save();
    
    res.status(201).json({ message: 'Thêm SIM thành công', sim: newSim });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm SIM', error });
  }
};

// [POST] Thêm Excel (ĐÃ ÉP BUỘC DÙNG STT SỐ)
exports.createBulkSims = async (req, res) => {
  try {
    const sims = req.body; 
    if (!Array.isArray(sims)) return res.status(400).json({message: "Dữ liệu không hợp lệ"});

    let successCount = 0;
    let errorCount = 0;

    // Lấy mốc bắt đầu cho từng loại (trừ đi 1)
    let currentSttThuong = (await getNextStt('thuong')) - 1;
    let currentSttDep = (await getNextStt('dep')) - 1;

    for (let sim of sims) {
       try {
          let computedStt = '';
          
          if (sim.type === 'thuong') {
              currentSttThuong++;
              computedStt = String(currentSttThuong).padStart(3, '0'); 
          } else {
              currentSttDep++;
              computedStt = String(currentSttDep).padStart(3, '0'); 
          }

          // ÉP BUỘC BỎ QUA CHỮ "Tự động", DÙNG SỐ VỪA TÍNH ĐƯỢC
          const newSim = new Sim({
            stt: computedStt,    // Dùng số 001, 002...
            soSim: sim.soSim,    // Số SIM đã có số 0
            type: sim.type,
            price: sim.price
          });

          await newSim.save();
          successCount++;
       } catch(err) {
          // Lỗi trùng SIM thì lùi bộ đếm lại
          if (sim.type === 'thuong') currentSttThuong--;
          else currentSttDep--;
          errorCount++; 
       }
    }
    
    res.status(200).json({ message: `Đã thêm: ${successCount} số. Bỏ qua trùng lặp: ${errorCount} số.` });
  } catch (error) {
     res.status(500).json({ message: 'Lỗi server khi thêm Excel', error });
  }
};

// [PUT] Sửa
exports.updateSim = async (req, res) => {
  try {
    const updatedSim = await Sim.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Cập nhật thành công', sim: updatedSim });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật SIM' });
  }
};

// [DELETE] Xóa
exports.deleteSim = async (req, res) => {
  try {
    await Sim.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Đã xóa SIM' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa SIM' });
  }
};