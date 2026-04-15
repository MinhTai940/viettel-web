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
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }],
    });

    // --- SỬA TỪ ĐÂY: Kiểm tra nếu không có dữ liệu ---
    if (!response.rows || response.rows.length === 0) {
      return res.status(200).json([]); // Trả về mảng rỗng thay vì để code bị crash
    }

    const formattedData = response.rows.map(row => {
      const rawDate = row.dimensionValues[0].value;
      return {
        date: `${rawDate.slice(6, 8)}/${rawDate.slice(4, 6)}`,
        users: parseInt(row.metricValues[0].value, 10),
      };
    });

    // Sắp xếp lại theo thứ tự thời gian tăng dần
    formattedData.sort((a, b) => a.date.localeCompare(b.date));

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Lỗi GA4 cụ thể:", error);
    // Thay vì gửi message chung chung, gửi luôn cái error.message để xem bệnh
    res.status(500).json({ 
      message: "Lỗi GA4", 
      detail: error.message 
    });
}
};