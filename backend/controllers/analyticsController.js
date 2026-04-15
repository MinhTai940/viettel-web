// backend/controllers/analyticsController.js
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');
const fs = require('fs');

const propertyId = process.env.GA_PROPERTY_ID;

// Hỗ trợ 2 cách cung cấp credentials:
// 1) File key tại backend/ga-key.json (cũ)
// 2) ENV `GA_KEY_JSON` chứa toàn bộ JSON key (không commit file vào repo)
let analyticsDataClient;
try {
  if (process.env.GA_KEY_JSON) {
    const credentials = JSON.parse(process.env.GA_KEY_JSON);
    analyticsDataClient = new BetaAnalyticsDataClient({ credentials });
    console.info('GA: using credentials from GA_KEY_JSON env');
  } else {
    const keyPath = path.join(__dirname, '..', 'ga-key.json');
    analyticsDataClient = new BetaAnalyticsDataClient({ keyFilename: keyPath });
    console.info('GA: using key file at', keyPath);
  }
} catch (e) {
  console.error('GA: failed to initialize analytics client:', e.stack || e);
  // Leave analyticsDataClient undefined; getVisitorStats will handle missing client
}

exports.getVisitorStats = async (req, res) => {
  try {
    if (!propertyId) {
      console.error('GA_PROPERTY_ID is not set.');
      return res.status(500).json({ message: 'GA configuration missing' });
    }
    if (!analyticsDataClient) {
      console.error('analyticsDataClient not initialized. Check GA_KEY_JSON or ga-key.json');
      return res.status(500).json({ message: 'GA client not initialized' });
    }
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
    console.error('Lỗi GA4 cụ thể:', error.stack || error);
    // Nếu đang debug trên deploy, cho phép trả chi tiết khi DEBUG_GA=true
    if (process.env.DEBUG_GA === 'true') {
      return res.status(500).json({ message: 'Lỗi GA4', detail: error.message, stack: error.stack });
    }
    res.status(500).json({ message: 'Lỗi GA4' });
  }
};

// Debug endpoint (only when DEBUG_GA=true)
exports.getDebug = async (req, res) => {
  if (process.env.DEBUG_GA !== 'true') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const keyPath = path.join(__dirname, '..', 'ga-key.json');
  const hasKeyFile = fs.existsSync(keyPath);

  return res.status(200).json({
    propertyId: !!process.env.GA_PROPERTY_ID,
    usingEnvKeyJson: !!process.env.GA_KEY_JSON,
    hasKeyFile,
    clientInitialized: !!analyticsDataClient,
  });
};