// backend/controllers/adminController.js
const Package = require('../models/Package'); // CHÚ Ý: Mày check lại tên file Model Gói cước của mày nhé (VD: package.js hay packageModel.js)

exports.getDashboardSummary = async (req, res) => {
  try {
    // 1. Đếm tổng số gói cước đang có trong Database của mày
    const totalPackages = await Package.countDocuments();

    // 2. Lấy Top 5 gói cước có lượt xem (views) cao nhất
    // Lưu ý: Nếu Model của mày chưa có trường 'views', nó sẽ mặc định là 0
    const topPackages = await Package.find()
      .sort({ views: -1 }) 
      .limit(5)
      .select('name views price'); // Chỉ lấy các trường cần thiết để nhẹ data

    // 3. Trả về kết quả cho Dashboard
    res.status(200).json({
      totalPackages: totalPackages,
      topPackages: topPackages,
      newCustomers: 0 // Chỗ này mày có thể viết thêm logic đếm User mới nếu có bảng User
    });

  } catch (error) {
    console.error("Lỗi lấy thống kê Admin:", error);
    res.status(500).json({ message: "Lỗi Server khi lấy dữ liệu Admin" });
  }
};