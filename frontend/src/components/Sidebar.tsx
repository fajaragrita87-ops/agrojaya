import { Link, useLocation } from 'react-router-dom';
import { useRole, type RoleType } from '../context/RoleContext';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: RoleType[];
  badge?: string;
}

export const Sidebar = () => {
  const location = useLocation();
  const { role, userName, userTitle } = useRole();

  // Concise, single-line professional menus for each functional module per role
  const navItems: NavItem[] = [
    // --- PETANI MENU ---
    { label: 'Tugas Harian', path: '/tasks', icon: 'ri-calendar-event-line', roles: ['PETANI'] },
    { label: 'Presensi Harian', path: '/payroll', icon: 'ri-calendar-check-line', roles: ['PETANI'] },
    { label: 'KTP Sampel Pohon', path: '/tree-passports', icon: 'ri-qr-code-line', roles: ['PETANI'] },
    { label: 'SOP Komoditas', path: '/crops', icon: 'ri-plant-line', roles: ['PETANI'] },
    { label: 'Scan Tumbuhan AI', path: '/ai-smart-farming', icon: 'ri-camera-lens-line', roles: ['PETANI'] },

    // --- KEPALA KEBUN MENU ---
    { label: 'Dasbor Supervisi', path: '/dashboard/kepala-kebun', icon: 'ri-dashboard-line', roles: ['KEPALA_KEBUN'] },
    { label: 'Jadwal & Tasklist', path: '/tasks', icon: 'ri-calendar-event-line', roles: ['KEPALA_KEBUN'] },
    { label: 'Peta Satelit GIS', path: '/lands', icon: 'ri-map-pin-2-line', roles: ['KEPALA_KEBUN'] },
    { label: 'KTP Sampel Pohon', path: '/tree-passports', icon: 'ri-qr-code-line', roles: ['KEPALA_KEBUN'] },
    { label: 'Siklus Lahan & BAP', path: '/plantation-lifecycle', icon: 'ri-plant-line', roles: ['KEPALA_KEBUN'] },
    { label: 'Presensi Petani', path: '/payroll', icon: 'ri-calendar-check-line', roles: ['KEPALA_KEBUN'] },
    { label: 'Master Komoditas & SOP', path: '/crops', icon: 'ri-seedling-line', roles: ['KEPALA_KEBUN'] },
    { label: 'Smart Farming AI', path: '/ai-smart-farming', icon: 'ri-robot-2-line', roles: ['KEPALA_KEBUN'] },
    { label: 'Laporan BAP Kebun', path: '/reports', icon: 'ri-file-list-3-line', roles: ['KEPALA_KEBUN'] },

    // --- MANAGER OPERASIONAL MENU ---
    { label: 'Dasbor Operasional', path: '/dashboard/manager', icon: 'ri-dashboard-3-line', roles: ['MANAGER'] },
    { label: 'Peta Satelit GIS', path: '/lands', icon: 'ri-map-pin-2-line', roles: ['MANAGER'] },
    { label: 'KTP Sampel Pohon', path: '/tree-passports', icon: 'ri-qr-code-line', roles: ['MANAGER'] },
    { label: 'Siklus Lahan & BAP', path: '/plantation-lifecycle', icon: 'ri-plant-line', roles: ['MANAGER'] },
    { label: 'Inventaris Gudang', path: '/inventory', icon: 'ri-archive-line', roles: ['MANAGER'] },
    { label: 'Pengajuan PO', path: '/po-transparency', icon: 'ri-file-add-line', roles: ['MANAGER'] },
    { label: 'Master Komoditas & SOP', path: '/crops', icon: 'ri-seedling-line', roles: ['MANAGER'] },
    { label: 'Jadwal Tasklist', path: '/tasks', icon: 'ri-calendar-event-line', roles: ['MANAGER'] },
    { label: 'Manajemen SDM & Upah', path: '/payroll', icon: 'ri-coins-line', roles: ['MANAGER'] },
    { label: 'Biaya OPEX', path: '/financials', icon: 'ri-wallet-3-line', roles: ['MANAGER'] },
    { label: 'Timbangan Panen', path: '/weighbridge', icon: 'ri-scales-3-line', roles: ['MANAGER'] },
    { label: 'Kalkulator HPP', path: '/hpp-calculator', icon: 'ri-calculator-line', roles: ['MANAGER'] },
    { label: 'Smart Farming AI', path: '/ai-smart-farming', icon: 'ri-robot-2-line', roles: ['MANAGER'] },
    { label: 'Laporan Audit 5D', path: '/reports', icon: 'ri-file-chart-line', roles: ['MANAGER'] },

    // --- DIREKTUR MENU (FULL ACCESS) ---
    { label: 'Dasbor Strategis', path: '/dashboard/direktur', icon: 'ri-dashboard-3-line', roles: ['DIREKTUR'] },
    { label: 'Peta Satelit GIS', path: '/lands', icon: 'ri-map-pin-2-line', roles: ['DIREKTUR'] },
    { label: 'KTP Sampel Pohon', path: '/tree-passports', icon: 'ri-qr-code-line', roles: ['DIREKTUR'] },
    { label: 'Siklus Lahan & BAP', path: '/plantation-lifecycle', icon: 'ri-plant-line', roles: ['DIREKTUR'] },
    { label: 'Inventaris Gudang', path: '/inventory', icon: 'ri-archive-line', roles: ['DIREKTUR'] },
    { label: 'Otorisasi PO', path: '/po-transparency', icon: 'ri-file-shield-line', roles: ['DIREKTUR'] },
    { label: 'Master Komoditas & SOP', path: '/crops', icon: 'ri-seedling-line', roles: ['DIREKTUR'] },
    { label: 'Jadwal Tasklist', path: '/tasks', icon: 'ri-calendar-event-line', roles: ['DIREKTUR'] },
    { label: 'Manajemen User', path: '/users', icon: 'ri-user-settings-line', roles: ['DIREKTUR'] },
    { label: 'Presensi & Upah', path: '/payroll', icon: 'ri-calendar-check-line', roles: ['DIREKTUR'] },
    { label: 'Keuangan & Kas', path: '/financials', icon: 'ri-wallet-3-line', roles: ['DIREKTUR'] },
    { label: 'Timbangan Panen', path: '/weighbridge', icon: 'ri-scales-3-line', roles: ['DIREKTUR'] },
    { label: 'Kalkulator HPP', path: '/hpp-calculator', icon: 'ri-calculator-line', roles: ['DIREKTUR'] },
    { label: 'Smart Farming AI', path: '/ai-smart-farming', icon: 'ri-robot-2-line', roles: ['DIREKTUR'] },
    { label: 'Laporan Audit 5D', path: '/reports', icon: 'ri-file-chart-line', roles: ['DIREKTUR'] },

    // --- FINANCE (MANAJER KEUANGAN) MENU ---
    { label: 'Keuangan & Kas', path: '/financials', icon: 'ri-wallet-3-line', roles: ['FINANCE'] },
    { label: 'Verifikasi PO', path: '/po-transparency', icon: 'ri-file-shield-line', roles: ['FINANCE'] },
    { label: 'KTP Sampel Pohon', path: '/tree-passports', icon: 'ri-qr-code-line', roles: ['FINANCE'] },
    { label: 'Jadwal Tasklist', path: '/tasks', icon: 'ri-calendar-event-line', roles: ['FINANCE'] },
    { label: 'Inventaris Gudang', path: '/inventory', icon: 'ri-archive-line', roles: ['FINANCE'] },
    { label: 'Presensi & Upah', path: '/payroll', icon: 'ri-coins-line', roles: ['FINANCE'] },
    { label: 'Timbangan Panen', path: '/weighbridge', icon: 'ri-scales-3-line', roles: ['FINANCE'] },
    { label: 'Kalkulator HPP', path: '/hpp-calculator', icon: 'ri-calculator-line', roles: ['FINANCE'] },
    { label: 'Smart Farming AI', path: '/ai-smart-farming', icon: 'ri-robot-2-line', roles: ['FINANCE'] },
    { label: 'Laporan Audit 5D', path: '/reports', icon: 'ri-file-chart-line', roles: ['FINANCE'] },

    // --- INVESTOR MENU ---
    { label: 'Dasbor Valuasi & ROI', path: '/dashboard/investor', icon: 'ri-funds-line', roles: ['INVESTOR'] },
    { label: 'Peta Satelit GIS', path: '/lands', icon: 'ri-map-pin-2-line', roles: ['INVESTOR'] },
    { label: 'Siklus Lahan & BAP', path: '/plantation-lifecycle', icon: 'ri-plant-line', roles: ['INVESTOR'] },
    { label: 'KTP Sampel Pohon', path: '/tree-passports', icon: 'ri-qr-code-line', roles: ['INVESTOR'] },
    { label: 'Transparansi PO Modal', path: '/po-transparency', icon: 'ri-file-shield-line', roles: ['INVESTOR'] },
    { label: 'Keuangan & Arus Kas', path: '/financials', icon: 'ri-wallet-3-line', roles: ['INVESTOR'] },
    { label: 'Master Komoditas & SOP', path: '/crops', icon: 'ri-seedling-line', roles: ['INVESTOR'] },
    { label: 'Jadwal & Tasklist', path: '/tasks', icon: 'ri-calendar-event-line', roles: ['INVESTOR'] },
    { label: 'Inventaris Gudang', path: '/inventory', icon: 'ri-archive-line', roles: ['INVESTOR'] },
    { label: 'Timbangan Panen', path: '/weighbridge', icon: 'ri-scales-3-line', roles: ['INVESTOR'] },
    { label: 'Kalkulator HPP', path: '/hpp-calculator', icon: 'ri-calculator-line', roles: ['INVESTOR'] },
    { label: 'Smart Farming AI', path: '/ai-smart-farming', icon: 'ri-robot-2-line', roles: ['INVESTOR'] },
    { label: 'Laporan Audit 5D', path: '/reports', icon: 'ri-file-chart-line', roles: ['INVESTOR'] },
  ];

  // Filter items permitted for active role
  const permittedNavItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="position-fixed start-0 top-0 h-100 bg-white border-end shadow-sm z-50 d-flex flex-column" style={{ width: '17.5rem', zIndex: 1040 }}>
      {/* Sidebar Logo Header */}
      <div className="p-3 px-3.5 border-bottom d-flex align-items-center gap-2.5" style={{ height: '4.75rem' }}>
        <Link to="/dashboard/direktur" className="d-flex align-items-center gap-2.5 text-decoration-none w-100">
          <div style={{ width: 36, height: 36, backgroundColor: '#059669', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: 18, flexShrink: 0 }}>
            <i className="ri-leaf-line"></i>
          </div>
          <div>
            <h1 className="h6 font-weight-bold text-dark m-0 leading-tight !text-sm">Smart Farm ERP</h1>
            <span className="text-success font-weight-bold d-block" style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.4px' }}>Portal ERP Kebun</span>
          </div>
        </Link>
      </div>

      {/* User Profile Card inside Sidebar */}
      <div className="p-3 px-3.5 border-bottom d-flex align-items-center gap-2.5 bg-light">
        <div style={{ width: 38, height: 38, backgroundColor: '#dcfce7', border: '1px solid #86efac', color: '#166534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18, flexShrink: 0 }}>
          <i className="ri-user-3-fill"></i>
        </div>
        <div className="overflow-hidden">
          <h6 className="font-weight-bold text-dark m-0 text-truncate" style={{ fontSize: 13 }}>{userName}</h6>
          <span className="text-muted font-weight-medium d-block text-truncate" style={{ fontSize: 11 }}>{userTitle}</span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-grow-1 p-2.5 px-3 overflow-y-auto space-y-1">
        <span className="text-uppercase text-muted font-weight-bold d-block mb-1.5 px-2" style={{ fontSize: 10, letterSpacing: '0.5px' }}>
          Navigasi Modul Utama
        </span>

        <ul className="list-unstyled space-y-1 m-0 p-0">
          {permittedNavItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={idx}>
                <Link
                  to={item.path}
                  className={`d-flex align-items-center justify-content-between py-2 px-2.5 rounded-3 text-decoration-none transition ${
                    isActive
                      ? 'bg-success text-white font-weight-bold shadow-xs'
                      : 'text-dark hover-bg-light font-weight-medium'
                  }`}
                  style={{
                    fontSize: 13,
                    whiteSpace: 'nowrap',
                    lineHeight: '1.4',
                  }}
                >
                  <div className="d-flex align-items-center gap-2.5 text-truncate">
                    <i className={`${item.icon}`} style={{ fontSize: 17, flexShrink: 0 }}></i>
                    <span className="text-truncate" style={{ fontSize: 13 }}>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`badge px-1.5 py-0.5 font-weight-bold flex-shrink-0 ms-1 ${isActive ? 'bg-white text-success' : 'bg-warning text-dark'}`} style={{ fontSize: 9.5 }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-top text-center text-muted" style={{ fontSize: 11 }}>
        <span className="font-weight-medium">Smart Farming Indonesia • 2026</span>
      </div>
    </aside>
  );
};
