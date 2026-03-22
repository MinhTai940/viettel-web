// src/admin/Sim.jsx
import React from 'react';

const Sim = ({ sim, onDelete }) => {
    if (!sim) return null;
  return (
    <tr style={{ borderBottom: '1px solid #ddd', transition: 'background 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
      <td style={{ padding: '12px' }}>{sim.stt}</td>
      
      {/* Số SIM in đậm, màu đỏ cho nổi */}
      <td style={{ padding: '12px', fontWeight: 'bold', color: '#e5002b' }}>
        {sim.soSim}
      </td>
      
      <td style={{ padding: '12px' }}>
        {sim.type === 'thuong' ? (
          <span style={{ background: '#e0f7fa', color: '#006064', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>VIP Thường</span>
        ) : (
          <span style={{ background: '#fff0f5', color: '#c2185b', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>VIP Đẹp</span>
        )}
      </td>
      
      <td style={{ padding: '12px' }}>{sim.price}</td>
      
      <td style={{ padding: '12px' }}>
        {/* Khi bấm xóa, nó sẽ gọi ngược lên hàm onDelete của thằng Cha */}
        <button 
          onClick={() => onDelete(sim._id)}
          style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default Sim;