
import "./Admin.css";

const mockStats = [
    { label: "Tổng gói cước", value: "247", trend: "+12%" },
    { label: "Danh mục", value: "18", trend: "+2%" },
    { label: "Doanh thu tháng", value: "2.4 tỷ", trend: "+18%" },
    { label: "Người dùng", value: "15.7K", trend: "+5%" }
];

const mockRecent = [
    { id: "PKG001", name: "VIP 30", category: "Premium", action: "Tạo mới", time: "2 phút trước" },
    { id: "PKG002", name: "Data 1GB", category: "Cơ bản", action: "Cập nhật", time: "1 giờ trước" },
    { id: "PKG003", name: "TV360", category: "Giải trí", action: "Xóa", time: "3 giờ trước" }
];

function Dashboard() {
    return (
        <>
            <div className="card-header">
                <h1 className="card-title">Tổng quan</h1>
                <p className="card-subtitle">Quản lý hệ thống ViettelUp</p>
            </div>

            <div className="stats-grid">
                {mockStats.map((stat, index) => (
                    <div key={index} className="admin-card stat-card">
                        <div className="stat-number">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                        <span style={{ color: '#10b981', fontSize: '14px' }}>{stat.trend}</span>
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <div className="admin-card flex-1">
                    <div className="card-header">
                        <h2 className="card-title" style={{ fontSize: '18px' }}>Gói cước gần đây</h2>
                    </div>
                    <div className="table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên gói</th>
                                    <th>Danh mục</th>
                                    <th>Thao tác</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockRecent.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <span className="btn btn-sm btn-secondary">{item.action}</span>
                                        </td>
                                        <td>{item.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="admin-card" style={{ minWidth: '350px' }}>
                    <div className="card-header">
                        <h2 className="card-title" style={{ fontSize: '18px' }}>Biểu đồ doanh thu</h2>
                    </div>
                    <div style={{ height: '300px', background: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
                        Placeholder Chart - Có thể tích hợp Chart.js
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
