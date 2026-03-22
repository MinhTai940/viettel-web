import React, { useState, useEffect, useRef } from 'react';
import API from '../services/api'; 
import Sim from './sim';
import * as XLSX from 'xlsx';

const SimList = () => {
  const [sims, setSims] = useState([]);
  const [activeTab, setActiveTab] = useState('thuong'); 

  // State form thêm tay
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ soSim: '', type: 'thuong', price: 'Liên hệ' });

  // --- STATE EXCEL ---
  const [previewData, setPreviewData] = useState([]); 
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false); 
  const [previewTab, setPreviewTab] = useState('thuong'); // Tab bên trong bảng Preview Excel
  const fileInputRef = useRef(null); 

  useEffect(() => {
    fetchSims();
  }, [activeTab]); 

  const fetchSims = async () => {
    try {
      const res = await API.get(`/sim?type=${activeTab}`);
      setSims(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách SIM:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Mày có chắc chắn muốn xóa số SIM này không?')) {
      try {
        await API.delete(`/sim/${id}`);
        fetchSims(); 
      } catch (error) {
        alert('Có lỗi xảy ra khi xóa!');
      }
    }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/sim', formData);
      alert('Thêm SIM thành công!');
      setIsModalOpen(false);
      setFormData({ soSim: '', type: 'thuong', price: 'Liên hệ' });
      fetchSims(); 
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi thêm SIM!');
    }
  };

  // =========================================
  // XỬ LÝ ĐỌC EXCEL (ĐÃ CÓ TÁCH SỐ THỨ TỰ)
  // =========================================
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0]; 
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws); 

      let countThuong = 1; // Bộ đếm tạm cho file Excel (SIM Thường)
      let countDep = 1;    // Bộ đếm tạm cho file Excel (SIM Đẹp)

      const formattedData = data.map((item) => {
        let soSimRaw = item['Số SIM'] || item['soSim'] || '';
        soSimRaw = String(soSimRaw).trim();
        if (soSimRaw && !soSimRaw.startsWith('0')) soSimRaw = '0' + soSimRaw;

        const simType = (item['Loại'] === 'VIP Đẹp' || item['type'] === 'dep') ? 'dep' : 'thuong';
        
        // Đánh số thứ tự hiển thị tạm thời
        let previewStt = simType === 'thuong' ? countThuong++ : countDep++;

        return {
          stt: previewStt,
          soSim: soSimRaw,
          type: simType,
          price: item['Giá'] || item['price'] || 'Liên hệ'
        };
      }).filter(item => item.soSim !== ''); 

      setPreviewData(formattedData);
      
      // Tự động mở Tab nào có dữ liệu khi bật Preview
      if (countThuong > 1) setPreviewTab('thuong');
      else setPreviewTab('dep');

      setIsPreviewModalOpen(true); 
      fileInputRef.current.value = null; 
    };
    reader.readAsBinaryString(file);
  };

  const handleConfirmExcel = async () => {
    if (!previewData || previewData.length === 0) {
      alert("Không có số SIM nào hợp lệ để thêm!");
      return;
    }
    try {
      const res = await API.post('/sim/bulk', previewData);
      alert("✅ " + res.data.message); 
      setIsPreviewModalOpen(false);
      setPreviewData([]);
      fetchSims(); 
    } catch (error) {
      alert("❌ Lỗi hệ thống: " + (error.response?.data?.message || "Không thể kết nối với máy chủ!"));
    }
  };

  // Lọc dữ liệu cho bảng Preview
  const previewDataThuong = previewData.filter(s => s.type === 'thuong');
  const previewDataDep = previewData.filter(s => s.type === 'dep');
  const activePreviewList = previewTab === 'thuong' ? previewDataThuong : previewDataDep;

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', position: 'relative' }}>
      
      {/* HEADER & NÚT THÊM */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Quản lý kho SIM</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => fileInputRef.current.click()} style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            📁 Thêm bằng Excel
          </button>
          <input type="file" accept=".xlsx, .xls" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />
          <button onClick={() => setIsModalOpen(true)} style={{ padding: '10px 20px', background: '#e5002b', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Thêm SIM thủ công
          </button>
        </div>
      </div>

      {/* TABS BẢNG CHÍNH */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('thuong')}
          style={{ padding: '10px 25px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', transition: 'all 0.3s', background: activeTab === 'thuong' ? '#e5002b' : '#f0f0f0', color: activeTab === 'thuong' ? '#fff' : '#555' }}
        >
          SIM VIP THƯỜNG
        </button>
        <button 
          onClick={() => setActiveTab('dep')}
          style={{ padding: '10px 25px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', transition: 'all 0.3s', background: activeTab === 'dep' ? '#e5002b' : '#f0f0f0', color: activeTab === 'dep' ? '#fff' : '#555' }}
        >
          SIM VIP ĐẸP
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
            <th style={{ padding: '12px' }}>STT</th>
            <th style={{ padding: '12px' }}>Số SIM</th>
            <th style={{ padding: '12px' }}>Phân loại</th>
            <th style={{ padding: '12px' }}>Giá tiền</th>
            <th style={{ padding: '12px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sims.length > 0 ? (
            sims.map((simData) => <Sim key={simData._id} sim={simData} onDelete={handleDelete} />)
          ) : (
            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#888', fontSize: '15px' }}>Không có số SIM nào trong mục này.</td></tr>
          )}
        </tbody>
      </table>

      {/* POPUP THÊM THỦ CÔNG */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', width: '400px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Thêm Số SIM Mới</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" name="soSim" value={formData.soSim} onChange={handleInputChange} placeholder="Số SIM" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>
              <select name="type" value={formData.type} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                <option value="thuong">SIM VIP Thường</option>
                <option value="dep">SIM VIP Đẹp</option>
              </select>
              <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="Giá" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 15px', background: '#ccc', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Hủy</button>
                <button type="submit" style={{ padding: '10px 15px', background: '#e5002b', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Lưu SIM</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================
          POPUP XEM TRƯỚC EXCEL (ĐÃ TÁCH TAB)
      ========================================= */}
      {isPreviewModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', width: '800px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Xem trước dữ liệu Excel</h3>
            
            {/* TABS TRONG BẢNG PREVIEW */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <button 
                onClick={() => setPreviewTab('thuong')}
                style={{ padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', background: previewTab === 'thuong' ? '#333' : '#eee', color: previewTab === 'thuong' ? '#fff' : '#666' }}
              >
                SIM Thường ({previewDataThuong.length})
              </button>
              <button 
                onClick={() => setPreviewTab('dep')}
                style={{ padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', background: previewTab === 'dep' ? '#333' : '#eee', color: previewTab === 'dep' ? '#fff' : '#666' }}
              >
                SIM Đẹp ({previewDataDep.length})
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #eee', borderRadius: '5px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>STT (Tạm)</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Số SIM</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Phân loại</th>
                    <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Giá tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {activePreviewList.length > 0 ? (
                    activePreviewList.map((item, index) => (
                      <tr key={index}>
                        <td style={{ padding: '10px', borderBottom: '1px solid #eee', color: '#888' }}>{item.stt}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: 'bold', color: '#e5002b' }}>{item.soSim}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.type === 'thuong' ? 'VIP Thường' : 'VIP Đẹp'}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{item.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>Không có SIM nào loại này trong file.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <span style={{ fontWeight: 'bold', color: '#555' }}>
                Tổng file: <span style={{color: '#e5002b'}}>{previewData.length}</span> số
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={() => setIsPreviewModalOpen(false)} style={{ padding: '10px 15px', background: '#ccc', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Hủy bỏ</button>
                <button type="button" onClick={handleConfirmExcel} style={{ padding: '10px 15px', background: '#28a745', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Xác nhận Thêm</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SimList;