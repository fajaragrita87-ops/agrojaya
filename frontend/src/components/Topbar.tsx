import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole, type RoleType, getDefaultPathForRole } from '../context/RoleContext';
import { getBmkgWeather } from '../services/api';

export const Topbar = () => {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const [bmkgWeather, setBmkgWeather] = useState<any>(null);

  useEffect(() => {
    getBmkgWeather()
      .then((res) => {
        if (res.data && res.data.data) {
          setBmkgWeather(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as RoleType;
    setRole(newRole);
    navigate(getDefaultPathForRole(newRole));
  };

  return (
    <header
      className="position-fixed top-0 end-0 bg-white border-bottom shadow-sm px-4 d-flex align-items-center justify-content-between"
      style={{ left: '17.5rem', height: '4.75rem', zIndex: 1030 }}
    >
      {/* Search Input & BMKG Weather Alert Widget */}
      <div className="d-flex align-items-center gap-3">
        <div className="position-relative d-none d-md-block" style={{ width: 260 }}>
          <input
            type="text"
            placeholder="Cari blok, SOP, PO, pekerja..."
            className="form-control form-control-sm ps-5 bg-light border-0 rounded-pill"
            style={{ fontSize: 13, height: 38 }}
          />
          <i className="ri-search-line position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" style={{ fontSize: 15 }}></i>
        </div>

        {/* Live BMKG Weather API Widget */}
        <div className="d-none d-lg-flex align-items-center gap-2 bg-light px-3 py-1.5 rounded-pill">
          <i className="ri-sun-cloudy-line text-warning" style={{ fontSize: 18 }}></i>
          <div style={{ fontSize: 11, lineHeight: 1.2 }}>
            <strong className="text-dark d-block">
              {bmkgWeather?.location || 'Jonggol, Bogor (Jawa Barat)'} {bmkgWeather?.temperature || 29}°C <span className="badge bg-primary text-white ms-1" style={{ fontSize: 9 }}>BMKG LIVE</span>
            </strong>
            <span className="text-secondary" style={{ fontSize: 10 }}>
              {bmkgWeather?.condition || 'Cerah Berawan'} • Kelembapan Kebun Ideal
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: DEV MODE RBAC ROLE SWITCHER */}
      <div className="d-flex align-items-center gap-2">
        <span className="text-uppercase font-weight-bold text-muted me-1" style={{ fontSize: 11 }}>Peran Akses:</span>
        <select
          value={role}
          onChange={handleRoleChange}
          className="form-select form-select-sm border font-weight-bold text-dark bg-white rounded-3 cursor-pointer py-1.5 px-3 shadow-sm"
          style={{ fontSize: 13, width: 'auto' }}
        >
          <option value="DIREKTUR">👑 DIREKTUR (Akses Penuh)</option>
          <option value="INVESTOR">💼 INVESTOR (Persetujuan Layer 3)</option>
          <option value="FINANCE">💵 FINANCE (Layer 1 & Pencairan)</option>
          <option value="MANAGER">👔 MANAJER OPERASIONAL (Pengaju PO)</option>
          <option value="KEPALA_KEBUN">🤠 KEPALA KEBUN (Pengawas)</option>
          <option value="PETANI">🚜 PETANI LAPANGAN (PWA)</option>
        </select>
      </div>
    </header>
  );
};
