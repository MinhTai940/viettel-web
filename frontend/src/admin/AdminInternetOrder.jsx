import { useEffect, useState } from "react"
import API from "../services/api"

export default function AdminInternetOrder() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        try {
            setLoading(true)
            const res = await API.get("/internet-orders")
            setOrders(res.data)
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const changeStatus = async (id, status) => {
        try {
            await API.put(`/internet-orders/${id}/status`, { status })
            load()
        } catch (err) {
            console.log(err)
        }
    }

    const badge = (status) => {

        if (status === "success")
            return { text: "Đã đăng ký", bg: "#d4edda", color: "#155724" }

        if (status === "cancel")
            return { text: "Đã hủy", bg: "#f8d7da", color: "#721c24" }

        return { text: "Đang chờ", bg: "#fff3cd", color: "#856404" }
    }

    return (
        <>
            <style>{`
                @keyframes tableFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .status-badge { transition: all 0.3s ease; position: relative; overflow: hidden; }
                .status-badge:hover { transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
                .action-btn { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); border-radius: 12px; font-weight: 600; border: none; cursor: pointer; position: relative; overflow: hidden; }
                .action-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }
                .table-row:nth-child(even) { background: rgba(248,250,252,0.5); }
                .table-row:hover { background: rgba(229,0,43,0.05) !important; transform: translateY(-1px); }
            `}</style>
            <div style={{
                padding: '40px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                minHeight: '100vh'
            }}>
                <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(24px)',
                    borderRadius: '28px',
                    marginBottom: '40px',
                    padding: '40px',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        background: 'linear-gradient(90deg, #10b981, #059669, #eab308, #e5002b)',
                        animation: 'gradientShift 4s ease infinite'
                    }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{
                                fontSize: '38px',
                                fontWeight: '900',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                margin: 0,
                                lineHeight: 1
                            }}>📡 Đơn đăng ký Internet</h1>
                            <p style={{
                                margin: '12px 0 0 0',
                                color: '#6b7280',
                                fontSize: '18px',
                                fontWeight: '500'
                            }}>Quản lý và cập nhật trạng thái đơn hàng ({orders.length} đơn)</p>
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button style={{
                                padding: '16px 32px',
                                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                color: 'white',
                                borderRadius: '50px',
                                border: 'none',
                                fontWeight: '700',
                                fontSize: '16px',
                                cursor: 'pointer',
                                boxShadow: '0 8px 25px rgba(59,130,246,0.4)',
                                transition: 'all 0.3s ease'
                            }} onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 12px 35px rgba(59,130,246,0.5)';
                            }} onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 8px 25px rgba(59,130,246,0.4)';
                            }} onClick={load}>
                                🔄 Làm mới
                            </button>
                            <button style={{
                                padding: '16px 32px',
                                background: 'linear-gradient(135deg, #e5002b, #ff6b35)',
                                color: 'white',
                                borderRadius: '50px',
                                border: 'none',
                                fontWeight: '700',
                                fontSize: '16px',
                                cursor: 'pointer',
                                boxShadow: '0 8px 25px rgba(229,0,43,0.4)',
                                transition: 'all 0.3s ease'
                            }} onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 12px 35px rgba(229,0,43,0.5)';
                            }} onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 8px 25px rgba(229,0,43,0.4)';
                            }} onClick={() => {
                                const csvContent = "data:text/csv;charset=utf-8,"
                                    + "Gói,Khách,Phone,Địa chỉ,Trạng thái,Ngày tạo\n"
                                    + orders.map(o =>
                                        `"${o.planName}","${o.name}","${o.phone}","${o.address}, ${o.district}, ${o.province}","${badge(o.status).text}","${new Date(o.createdAt).toLocaleDateString('vi-VN')}"`
                                    ).join("\\n");
                                const encodedUri = encodeURI(csvContent);
                                const link = document.createElement("a");
                                link.setAttribute("href", encodedUri);
                                link.setAttribute("download", `don-internet-${new Date().toISOString().slice(0, 10)}.csv`);
                                document.body.appendChild(link);
                                link.click();
                            }}>
                                📥 Xuất Excel
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px',
                    marginBottom: '40px'
                }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '32px',
                        textAlign: 'center',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            boxShadow: '0 8px 24px rgba(16,185,129,0.4)'
                        }}>✔</div>
                        <div style={{ fontSize: '48px', fontWeight: '800', color: '#10b981', marginBottom: '12px' }}>{orders.filter(o => o.status === 'success').length}</div>
                        <div style={{ fontSize: '18px', fontWeight: '600', color: '#374151' }}>Đã đăng ký</div>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '32px',
                        textAlign: 'center',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            boxShadow: '0 8px 24px rgba(245,158,11,0.4)'
                        }}>⏳</div>
                        <div style={{ fontSize: '48px', fontWeight: '800', color: '#f59e0b', marginBottom: '12px' }}>{orders.filter(o => o.status === 'pending').length}</div>
                        <div style={{ fontSize: '18px', fontWeight: '600', color: '#374151' }}>Đang chờ</div>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '32px',
                        textAlign: 'center',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            boxShadow: '0 8px 24px rgba(239,68,68,0.4)'
                        }}>✖</div>
                        <div style={{ fontSize: '48px', fontWeight: '800', color: '#ef4444', marginBottom: '12px' }}>{orders.filter(o => o.status === 'cancel').length}</div>
                        <div style={{ fontSize: '18px', fontWeight: '600', color: '#374151' }}>Đã hủy</div>
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '32px',
                        textAlign: 'center',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <div style={{ fontSize: '48px', fontWeight: '800', color: '#3b82f6', marginBottom: '12px' }}>{orders.length}</div>
                        <div style={{ fontSize: '18px', fontWeight: '600', color: '#374151' }}>Tổng đơn</div>
                    </div>
                </div>

                {/* Table */}
                <div style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(24px)',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(255,255,255,0.25)'
                }}>
                    <div style={{
                        padding: '32px 40px',
                        background: 'linear-gradient(135deg, rgba(229,0,43,0.05), rgba(255,107,53,0.05))',
                        borderBottom: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{
                                fontSize: '28px',
                                fontWeight: '800',
                                color: '#1f2937',
                                margin: 0
                            }}>📋 Danh sách đơn hàng ({orders.length})</h2>
                            <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                Cập nhật {new Date().toLocaleString('vi-VN')}
                            </div>
                        </div>
                    </div>
                    <div style={{ overflow: 'auto' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '15px'
                        }}>
                            <thead style={{
                                background: 'linear-gradient(135deg, rgba(248,250,252,0.8), rgba(241,245,249,0.8))',
                                position: 'sticky',
                                top: 0,
                                zIndex: 10,
                                borderBottom: '2px solid rgba(229,0,43,0.1)'
                            }}>
                                <tr>
                                    <th style={{
                                        padding: '20px 24px',
                                        textAlign: 'left',
                                        fontWeight: '700',
                                        color: '#374151',
                                        borderRight: '1px solid rgba(0,0,0,0.05)',
                                        whiteSpace: 'nowrap',
                                        fontSize: '15px'
                                    }}>Gói cước</th>
                                    <th style={{
                                        padding: '20px 24px',
                                        textAlign: 'left',
                                        fontWeight: '700',
                                        color: '#374151',
                                        borderRight: '1px solid rgba(0,0,0,0.05)',
                                        whiteSpace: 'nowrap',
                                        fontSize: '15px'
                                    }}>Khách hàng</th>
                                    <th style={{
                                        padding: '20px 24px',
                                        textAlign: 'left',
                                        fontWeight: '700',
                                        color: '#374151',
                                        borderRight: '1px solid rgba(0,0,0,0.05)',
                                        whiteSpace: 'nowrap',
                                        fontSize: '15px'
                                    }}>SĐT</th>
                                    <th style={{
                                        padding: '20px 24px',
                                        textAlign: 'left',
                                        fontWeight: '700',
                                        color: '#374151',
                                        borderRight: '1px solid rgba(0,0,0,0.05)',
                                        whiteSpace: 'nowrap',
                                        fontSize: '15px'
                                    }}>Địa chỉ</th>
                                    <th style={{
                                        padding: '20px 24px',
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        color: '#374151',
                                        borderRight: '1px solid rgba(0,0,0,0.05)',
                                        whiteSpace: 'nowrap',
                                        fontSize: '15px'
                                    }}>Trạng thái</th>
                                    <th style={{
                                        padding: '20px 24px',
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        color: '#374151',
                                        whiteSpace: 'nowrap',
                                        fontSize: '15px'
                                    }}>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan={6} style={{
                                            padding: '80px',
                                            textAlign: 'center',
                                            color: '#9ca3af',
                                            fontSize: '18px'
                                        }}>
                                            <div style={{ fontSize: '64px', marginBottom: '24px' }}>⏳</div>
                                            Đang tải danh sách đơn hàng...
                                        </td>
                                    </tr>
                                )}
                                {!loading && orders.map((o, index) => {
                                    const st = badge(o.status);
                                    return (
                                        <tr key={o._id} className="table-row" style={{
                                            transition: 'all 0.3s ease',
                                            borderBottom: index === orders.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.05)',
                                            animationDelay: `${index * 0.05}s`
                                        }}>
                                            <td style={{
                                                padding: '24px',
                                                fontWeight: '600',
                                                color: '#1f2937',
                                                borderRight: '1px solid rgba(0,0,0,0.05)'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{
                                                        width: '48px',
                                                        height: '48px',
                                                        borderRadius: '12px',
                                                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                                        color: 'white',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 'bold',
                                                        fontSize: '14px'
                                                    }}>Net</div>
                                                    <div>
                                                        <div style={{ fontSize: '16px', fontWeight: '700' }}>{o.planName}</div>
                                                        <div style={{ color: '#6b7280', fontSize: '14px' }}>ID: {o._id.slice(-8)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{
                                                padding: '24px',
                                                borderRight: '1px solid rgba(0,0,0,0.05)'
                                            }}>
                                                <div style={{ fontWeight: '600', color: '#1f2937' }}>{o.name}</div>
                                                <div style={{ color: '#6b7280', fontSize: '14px' }}>{o.phone}</div>
                                            </td>
                                            <td style={{
                                                padding: '24px',
                                                borderRight: '1px solid rgba(0,0,0,0.05)'
                                            }}>
                                                <div style={{ fontWeight: '600', color: '#1f2937' }}>{o.phone}</div>
                                            </td>
                                            <td style={{
                                                padding: '24px',
                                                borderRight: '1px solid rgba(0,0,0,0.05)'
                                            }}>
                                                <div style={{ fontWeight: '500' }}>{o.address || 'Chưa cập nhật'}</div>
                                                <div style={{ color: '#6b7280', fontSize: '14px' }}>{o.district}, {o.province}</div>
                                            </td>
                                            <td style={{
                                                padding: '24px',
                                                borderRight: '1px solid rgba(0,0,0,0.05)',
                                                textAlign: 'center'
                                            }}>
                                                <span className="status-badge" style={{
                                                    background: st.bg,
                                                    color: st.color,
                                                    padding: '10px 20px',
                                                    borderRadius: '25px',
                                                    fontWeight: '700',
                                                    fontSize: '14px',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                    display: 'inline-block'
                                                }}>
                                                    {st.text}
                                                </span>
                                            </td>
                                            <td style={{ padding: '24px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                                    <button
                                                        className="action-btn"
                                                        style={{
                                                            padding: '12px 24px',
                                                            background: 'linear-gradient(135deg, #10b981, #059669)',
                                                            color: 'white',
                                                            fontSize: '14px',
                                                            boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                                                            minWidth: '100px'
                                                        }}
                                                        onClick={() => changeStatus(o._id, "success")}
                                                    >
                                                        ✔ Thành công
                                                    </button>
                                                    <button
                                                        className="action-btn"
                                                        style={{
                                                            padding: '12px 24px',
                                                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                                            color: 'white',
                                                            fontSize: '14px',
                                                            boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
                                                            minWidth: '100px'
                                                        }}
                                                        onClick={() => changeStatus(o._id, "pending")}
                                                    >
                                                        ⏳ Chờ xử lý
                                                    </button>
                                                    <button
                                                        className="action-btn"
                                                        style={{
                                                            padding: '12px 24px',
                                                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                                            color: 'white',
                                                            fontSize: '14px',
                                                            boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
                                                            minWidth: '100px'
                                                        }}
                                                        onClick={() => changeStatus(o._id, "cancel")}
                                                    >
                                                        ✖ Hủy đơn
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {!loading && orders.length === 0 && (
                                    <tr>
                                        <td colSpan={6} style={{
                                            padding: '100px',
                                            textAlign: 'center',
                                            color: '#9ca3af',
                                            fontSize: '18px'
                                        }}>
                                            <div style={{ fontSize: '72px', marginBottom: '32px' }}>📡</div>
                                            <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', color: '#374151' }}>Chưa có đơn hàng nào</h3>
                                            <p style={{ fontSize: '16px', lineHeight: 1.6 }}>Khách hàng sẽ đăng ký gói Internet từ trang chính,<br />đơn hàng sẽ xuất hiện tại đây</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div style={{
                        padding: '24px 40px',
                        background: 'linear-gradient(135deg, rgba(229,0,43,0.05), rgba(255,107,53,0.05))',
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                            Hiển thị {orders.length} đơn • Cập nhật {new Date().toLocaleString('vi-VN')}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

/* ================= STYLE ================= */

const th = {
    padding: 14,
    textAlign: "left",
    fontSize: 14
}

const td = {
    padding: 14,
    fontSize: 14
}

const tdStrong = {
    padding: 14,
    fontWeight: 600
}

const btnGreen = {
    background: "#28a745",
    color: "white",
    border: 0,
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer"
}

const btnRed = {
    background: "#dc3545",
    color: "white",
    border: 0,
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer"
}

const btnYellow = {
    background: "#ffc107",
    border: 0,
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer"
}