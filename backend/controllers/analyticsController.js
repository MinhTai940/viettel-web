// backend/controllers/analyticsController.js
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

// DÁN CÁI MÃ TÀI SẢN (9 CHỮ SỐ) CỦA MÀY VÀO ĐÂY
const propertyId = process.env.GA_PROPERTY_ID;

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: './ga-key.json', // Đường dẫn tới file JSON mày để ở gốc backend
});

exports.getVisitorStats = async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }], // Lấy theo ngày
      metrics: [{ name: 'activeUsers' }], // Lấy số người dùng
    });

    // Format lại data cho Frontend dễ vẽ biểu đồ
    const formattedData = response.rows.map(row => {
      const rawDate = row.dimensionValues[0].value; // Định dạng YYYYMMDD
      return {
        // Biến thành DD/MM để hiện lên biểu đồ cho đẹp
        date: `${rawDate.slice(6, 8)}/${rawDate.slice(4, 6)}`,
        users: parseInt(row.metricValues[0].value, 10),
      };
    });

    // Sắp xếp lại theo thứ tự thời gian tăng dần
    formattedData.sort((a, b) => a.date.localeCompare(b.date));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Lỗi GA4:", error);
    res.status(500).json({ message: "Không thể lấy dữ liệu từ Google" });
  }
};