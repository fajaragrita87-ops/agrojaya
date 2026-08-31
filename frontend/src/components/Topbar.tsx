import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { getBmkgWeather } from '../services/api';

export const Topbar = () => {
  const { role } = useRole();
  const navigate = useNavigate();
  const [bmkgWeather, setBmkgWeather] = useState<any>(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchableModules = [
    { title: 'Peta Satelit GIS Blok Jonggol', path: '/lands', category: 'Lahan & GIS', icon: 'ri-map-pin-2-line' },
    { title: 'Siklus 8 Tahap Kesiapan Lahan', path: '/plantation-lifecycle', category: 'Agronomi', icon: 'ri-plant-line' },
    { title: 'Inventaris Stok Bahan Baku Gudang', path: '/inventory', category: 'Gudang', icon: 'ri-archive-line' },
    { title: 'Otorisasi & Pengajuan PO Belanja', path: '/po-transparency', category: 'Procurement', icon: 'ri-file-shield-line' },
    { title: 'Master Komoditas & SOP Tanam', path: '/crops', category: 'Tanaman', icon: 'ri-seedling-line' },
    { title: 'Jadwal Tasklist & Kalender Kerja', path: '/tasks', category: 'Operasional', icon: 'ri-calendar-event-line' },
    { title: 'Manajemen Pengguna & SDM', path: '/users', category: 'SDM', icon: 'ri-user-settings-line' },
    { title: 'Presensi PWA & Kalkulasi Gaji', path: '/payroll', category: 'Payroll', icon: 'ri-time-line' },
    { title: 'Buku Jurnal Keuangan & Kas', path: '/financials', category: 'Keuangan', icon: 'ri-wallet-3-line' },
    { title: 'Jembatan Timbang & Slip Tiket Panen', path: '/weighbridge', category: 'Logistik', icon: 'ri-scales-3-line' },
    { title: 'Kalkulator HPP & Simulasi Margin', path: '/hpp-calculator', category: 'Kalkulator', icon: 'ri-calculator-line' },
    { title: 'Diagnostik AI Smart Farming', path: '/ai-smart-farming', category: 'AI Cerdas', icon: 'ri-robot-2-line' },
    { title: 'Laporan Terpadu 5-Dimensi Auditor', path: '/reports', category: 'Audit', icon: 'ri-file-chart-line' },
  ];

  const filteredSearchResults = searchableModules.filter(
    (m) =>
      m.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
      m.category.toLowerCase().includes(globalSearch.toLowerCase())
  );

  useEffect(() => {
    getBmkgWeather()
      .then((res) => {
        if (res.data && res.data.data) {
          setBmkgWeather(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  const handleSelectSearch = (path: string) => {
    navigate(path);
    setGlobalSearch('');
    setShowSearchDropdown(false);
  };

  return (
    <header
      className="position-fixed top-0 end-0 bg-white border-bottom shadow-sm px-4 d-flex align-items-center justify-content-between"
      style={{ left: '17.5rem', height: '4.75rem', zIndex: 1030 }}
    >
      {/* Search Input & BMKG Weather Alert Widget */}
      <div className="d-flex align-items-center gap-3">
        <div className="position-relative d-none d-md-block" style={{ width: 280 }}>
          <input
            type="text"
            placeholder="Cari blok, SOP, PO, pekerja..."
            value={globalSearch}
            onChange={(e) => {
              setGlobalSearch(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
            className="form-control form-control-sm ps-5 bg-light border-0 rounded-pill"
            style={{ fontSize: 13, height: 38 }}
          />
          <i className="ri-search-line position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" style={{ fontSize: 14 }}></i>

          {/* Instant Search Dropdown */}
          {showSearchDropdown && globalSearch.trim().length > 0 && (
            <div className="position-absolute start-0 end-0 top-100 mt-1 bg-white border rounded-3 shadow-lg p-2 z-50">
              <span className="text-muted font-weight-bold d-block px-2 py-1" style={{ fontSize: 10 }}>
                HASIL PENCARIAN MODUL ({filteredSearchResults.length})
              </span>
              {filteredSearchResults.length > 0 ? (
                filteredSearchResults.map((res, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectSearch(res.path)}
                    className="d-flex align-items-center justify-content-between p-2 rounded-2 hover-bg-light cursor-pointer transition"
                    style={{ fontSize: 12 }}
                  >
                    <div className="d-flex align-items-center gap-2 text-truncate">
                      <i className={`${res.icon} text-success`}></i>
                      <span className="font-weight-medium text-dark text-truncate">{res.title}</span>
                    </div>
                    <span className="badge bg-light text-muted border ms-2 font-weight-normal" style={{ fontSize: 9.5 }}>
                      {res.category}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-2 text-muted" style={{ fontSize: 11.5 }}>
                  Modul tidak ditemukan
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live BMKG Weather API Widget */}
        <div className="d-none d-lg-flex align-items-center gap-2 bg-light px-3 py-1.5 rounded-pill">
          <i className="ri-sun-cloudy-line text-warning" style={{ fontSize: 16 }}></i>
          <div style={{ fontSize: 11, lineHeight: 1.2 }}>
            <strong className="text-dark d-block">
              {bmkgWeather?.location || 'Jonggol, Bogor (Jawa Barat)'} {bmkgWeather?.temperature || 29}°C{' '}
              <span className="badge bg-primary text-white ms-1" style={{ fontSize: 9 }}>BMKG LIVE</span>
            </strong>
            <span className="text-secondary" style={{ fontSize: 10 }}>
              {bmkgWeather?.condition || 'Cerah Berawan'} • Kelembapan Kebun Ideal
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Active Authenticated User Badge + Logout */}
      <div className="d-flex align-items-center gap-2">
        <div className="d-flex align-items-center gap-2 bg-light border px-2.5 py-1 rounded-3">
          <div
            className={`rounded-circle d-flex align-items-center justify-center font-weight-bold ${
              role === 'SUPERADMIN' ? 'bg-dark text-warning border border-warning' : 'bg-success text-white'
            }`}
            style={{ width: 26, height: 26, fontSize: 12 }}
          >
            {role === 'SUPERADMIN'
              ? '👑'
              : role === 'DIREKTUR'
              ? 'AW'
              : role === 'INVESTOR'
              ? 'HK'
              : role === 'FINANCE'
              ? 'RD'
              : role === 'MANAGER'
              ? 'BS'
              : role === 'KEPALA_KEBUN'
              ? 'RH'
              : 'JS'}
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <strong className="text-dark d-block" style={{ fontSize: 11.5 }}>
              {role === 'SUPERADMIN'
                ? 'Super Admin Master'
                : role === 'DIREKTUR'
                ? 'Ir. H. Ahmad Wijaya'
                : role === 'INVESTOR'
                ? 'Hendra Kusuma, B.Sc.'
                : role === 'FINANCE'
                ? 'Ratna Dewi, S.E.'
                : role === 'MANAGER'
                ? 'Budi Santoso, S.P.'
                : role === 'KEPALA_KEBUN'
                ? 'Rahmat Hidayat'
                : 'Joko Susilo'}
            </strong>
            <span
              className={`badge ${
                role === 'SUPERADMIN'
                  ? 'bg-warning text-dark font-weight-bold'
                  : 'bg-success-subtle text-success border border-success-subtle'
              }`}
              style={{ fontSize: 9 }}
            >
              {role === 'SUPERADMIN' ? '👑 SUPER ADMIN' : role}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/mobile')}
          title="Buka Aplikasi Mobile AgroJaya"
          className="btn btn-sm btn-outline-success font-weight-bold rounded-3 px-2.5 py-1.5 d-flex align-items-center gap-1.5 shadow-xs"
          style={{ fontSize: 12 }}
        >
          <i className="ri-smartphone-line"></i>
          <span className="d-none d-md-inline">Mode Mobile</span>
        </button>

        <button
          onClick={() => {
            navigate('/login');
          }}
          title="Keluar dari Sistem"
          className="btn btn-sm btn-outline-danger font-weight-bold rounded-3 px-2.5 py-1.5 d-flex align-items-center gap-1"
          style={{ fontSize: 12 }}
        >
          <i className="ri-logout-box-r-line"></i>
          <span className="d-none d-xl-inline">Keluar</span>
        </button>
      </div>
    </header>
  );
};
