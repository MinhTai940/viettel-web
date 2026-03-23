import React, { useState, useEffect, useRef } from 'react';
import API from '../services/api'; 
import Sim from './sim';
import * as XLSX from 'xlsx';

const SimList = () => {
  const [mainTab, setMainTab] = useState('manage_sim');

  // === QUẢN LÝ KHO SIM ===
  const [sims, setSims] = useState([]);
  const [activeTab, setActiveTab] = useState('thuong'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ soSim: '', type: 'thuong', price: 'Liên hệ' });

  const [previewData, setPreviewData] = useState([]); 
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false); 
  const [previewTab, setPreviewTab] = useState('thuong');
  const fileInputRef = useRef(null); 

  useEffect(() => {
    if (mainTab === 'manage_sim') fetchSims();
  }, [activeTab, mainTab]); 

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

      let countThuong = 1; 
      let countDep = 1;    

      const formattedData = data.map((item) => {
        let soSimRaw = item['Số SIM'] || item['soSim'] || '';
        soSimRaw = String(soSimRaw).trim();
        if (soSimRaw && !soSimRaw.startsWith('0')) soSimRaw = '0' + soSimRaw;

        const simType = (item['Loại'] === 'VIP Đẹp' || item['type'] === 'dep') ? 'dep' : 'thuong';
        let previewStt = simType === 'thuong' ? countThuong++ : countDep++;

        return {
          stt: previewStt,
          soSim: soSimRaw,
          type: simType,
          price: item['Giá'] || item['price'] || 'Liên hệ'
        };
      }).filter(item => item.soSim !== ''); 

      setPreviewData(formattedData);
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

  const previewDataThuong = previewData.filter(s => s.type === 'thuong');
  const previewDataDep = previewData.filter(s => s.type === 'dep');
  const activePreviewList = previewTab === 'thuong' ? previewDataThuong : previewDataDep;


  // === CẤU HÌNH LIÊN HỆ ZALO ===
  const [contactData, setContactData] = useState({ zaloName: '', zaloPhone: '', qrCodeUrl: '' });
  const [qrFile, setQrFile] = useState(null); 
  const [qrPreview, setQrPreview] = useState(''); 

  useEffect(() => {
    if (mainTab === 'config_contact') fetchContactConfig();
  }, [mainTab]);

  const fetchContactConfig = async () => {
    try {
      const res = await API.get('/contact');
      // Đề phòng Backend trả về mảng, mình ép nó lấy phần tử đầu tiên
      const data = Array.isArray(res.data) ? res.data[0] : res.data;

      if (data) {
        // 1. Ép chữ vào form để hiển thị cố định
        setContactData({
          zaloName: data.zaloName || '',
          zaloPhone: data.zaloPhone || '',
          qrCodeUrl: data.qrCodeUrl || ''
        });

        // 2. Ép ảnh hiển thị lên để Admin biết đang xài ảnh nào
        if (data.qrCodeUrl) {
          const serverUrl = API.defaults.baseURL.replace('/api', '');
          setQrPreview(`${serverUrl}${data.qrCodeUrl}`);
        }
      }
    } catch (error) {
      console.log("Lỗi lấy cấu hình:", error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQrFile(file);
      setQrPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSaveContact = async (e) => {
    e.preventDefault();
    try {
      console.log("📝 ContactData:", contactData);
      console.log("📁 QR File:", qrFile);
      
      const formData = new FormData();
      formData.append('zaloName', contactData.zaloName || '');
      formData.append('zaloPhone', contactData.zaloPhone || '');
      formData.append('qrCodeUrl', contactData.qrCodeUrl || ''); 
      if (qrFile) formData.append('qrImage', qrFile);

      console.log("📤 Sending FormData keys:", Array.from(formData.keys()));

      const response = await API.post('/contact', formData, {
        headers: { 'Content-Type': 'multipart/form-data' } 
      });
      console.log("✅ Response:", response.data);
      alert('Đã lưu cấu hình liên hệ thành công!');
      fetchContactConfig(); // Reload config after save
    } catch (error) {
      console.error('❌ Error saving contact:', error);
      console.error('Error response:', error.response?.data);
      alert('Lỗi khi lưu cấu hình: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', position: 'relative', minHeight: '80vh' }}>
      
      {/* 2 TAB ĐIỀU HƯỚNG */}
      <div style={{ display: 'flex', gap: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '25px' }}>
        <button 
          onClick={() => setMainTab('manage_sim')}
          style={{ padding: '10px 20px', fontSize: '18px', fontWeight: 'bold', border: 'none', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s', color: mainTab === 'manage_sim' ? '#e5002b' : '#888', borderBottom: mainTab === 'manage_sim' ? '3px solid #e5002b' : '3px solid transparent' }}
        >
          📦 Quản lý kho SIM
        </button>
        <button 
          onClick={() => setMainTab('config_contact')}
          style={{ padding: '10px 20px', fontSize: '18px', fontWeight: 'bold', border: 'none', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s', color: mainTab === 'config_contact' ? '#e5002b' : '#888', borderBottom: mainTab === 'config_contact' ? '3px solid #e5002b' : '3px solid transparent' }}
        >
          ⚙️ Cấu hình Liên hệ
        </button>
      </div>

      {/* MÀN HÌNH 1: QUẢN LÝ SIM */}
      {mainTab === 'manage_sim' && (
        <div className="fade-in-tab">
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => fileInputRef.current.click()} style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>📁 Thêm bằng Excel</button>
              <input type="file" accept=".xlsx, .xls" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />
              <button onClick={() => setIsModalOpen(true)} style={{ padding: '10px 20px', background: '#e5002b', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>+ Thêm SIM thủ công</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <button onClick={() => setActiveTab('thuong')} style={{ padding: '10px 25px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', background: activeTab === 'thuong' ? '#e5002b' : '#f0f0f0', color: activeTab === 'thuong' ? '#fff' : '#555' }}>SIM VIP THƯỜNG</button>
            <button onClick={() => setActiveTab('dep')} style={{ padding: '10px 25px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', background: activeTab === 'dep' ? '#e5002b' : '#f0f0f0', color: activeTab === 'dep' ? '#fff' : '#555' }}>SIM VIP ĐẸP</button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px' }}>STT</th><th style={{ padding: '12px' }}>Số SIM</th><th style={{ padding: '12px' }}>Phân loại</th><th style={{ padding: '12px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sims.length > 0 ? sims.map((simData) => <Sim key={simData._id} sim={simData} onDelete={handleDelete} />) : <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Không có số SIM nào trong mục này.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* MÀN HÌNH 2: CẤU HÌNH LIÊN HỆ */}
      {mainTab === 'config_contact' && (
        <div className="fade-in-tab" style={{ maxWidth: '600px', margin: '0 auto', background: '#f9f9fa', padding: '30px', borderRadius: '10px', border: '1px solid #ddd' }}>
          <form onSubmit={handleSaveContact} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Tên chủ Zalo (Nhân viên tư vấn):</label>
              <input type="text" value={contactData.zaloName} onChange={(e) => setContactData({...contactData, zaloName: e.target.value})} placeholder="VD: Admin Viettel Store" style={{ width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} required />
            </div>

            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Số điện thoại đăng ký Zalo:</label>
              <input type="text" value={contactData.zaloPhone} onChange={(e) => setContactData({...contactData, zaloPhone: e.target.value})} placeholder="VD: 0981234567" style={{ width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} required />
            </div>

            <div>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Tải ảnh Mã QR Zalo:</label>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ width: '100%', padding: '10px', background: '#fff', borderRadius: '5px', border: '1px solid #ccc' }} />
              
              {qrPreview ? (
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                  <img src={qrPreview} alt="QR Preview" style={{ width: '180px', height: '180px', objectFit: 'contain', border: '2px dashed #e5002b', borderRadius: '8px', padding: '5px', background: '#fff' }} />
                </div>
              ) : (
                <div style={{ marginTop: '15px', textAlign: 'center', background: '#eee', padding: '30px', borderRadius: '8px', color: '#999' }}>Chưa có ảnh mã QR</div>
              )}
            </div>

            <button type="submit" style={{ padding: '15px', background: '#e5002b', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>LƯU CẤU HÌNH</button>
          </form>
        </div>
      )}

      {/* POPUP THÊM TAY */}
      {mainTab === 'manage_sim' && isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', width: '400px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Thêm Số SIM Mới</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" name="soSim" value={formData.soSim} onChange={handleInputChange} placeholder="Số SIM" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>
              <select name="type" value={formData.type} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                <option value="thuong">SIM VIP Thường</option><option value="dep">SIM VIP Đẹp</option>
              </select>
              <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="Giá" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}/>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 15px' }}>Hủy</button>
                <button type="submit" style={{ padding: '10px 15px', background: '#e5002b', color: '#fff', fontWeight: 'bold' }}>Lưu SIM</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP EXCEL */}
      {mainTab === 'manage_sim' && isPreviewModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', width: '800px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Xem trước dữ liệu Excel</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <button onClick={() => setPreviewTab('thuong')} style={{ padding: '8px 15px', fontWeight: 'bold', background: previewTab === 'thuong' ? '#333' : '#eee', color: previewTab === 'thuong' ? '#fff' : '#666' }}>SIM Thường ({previewDataThuong.length})</button>
              <button onClick={() => setPreviewTab('dep')} style={{ padding: '8px 15px', fontWeight: 'bold', background: previewTab === 'dep' ? '#333' : '#eee', color: previewTab === 'dep' ? '#fff' : '#666' }}>SIM Đẹp ({previewDataDep.length})</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #eee' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr style={{ background: '#f8f9fa' }}><th>STT (Tạm)</th><th>Số SIM</th><th>Phân loại</th></tr></thead>
                <tbody>
                  {activePreviewList.length > 0 ? activePreviewList.map((item, index) => (
                    <tr key={index}><td>{item.stt}</td><td style={{fontWeight: 'bold', color: '#e5002b'}}>{item.soSim}</td><td>{item.type === 'thuong' ? 'VIP Thường' : 'VIP Đẹp'}</td></tr>
                  )) : <tr><td colSpan="4" style={{ textAlign: 'center' }}>Không có SIM nào.</td></tr>}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <span style={{ fontWeight: 'bold' }}>Tổng file: <span style={{color: '#e5002b'}}>{previewData.length}</span> số</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={() => setIsPreviewModalOpen(false)} style={{ padding: '10px 15px' }}>Hủy bỏ</button>
                <button type="button" onClick={handleConfirmExcel} style={{ padding: '10px 15px', background: '#28a745', color: '#fff', fontWeight: 'bold' }}>Xác nhận Thêm</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SimList;