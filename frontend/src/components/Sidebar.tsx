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
  const { role } = useRole();

  // Concise, clear menu titles in Murni Bahasa Indonesia that fit 100% without truncation
  const navItems: NavItem[] = [
    // --- PETANI MENU ---
    { label: 'Dasbor Petani', path: '/dashboard/direktur', icon: 'ri-home-2-line', roles: ['PETANI'] },
    { label: 'Absensi & Presensi', path: '/payroll', icon: 'ri-time-line', roles: ['PETANI'], badge: 'PWA' },
    { label: 'Master SOP Komoditas', path: '/crops', icon: 'ri-plant-line', roles: ['PETANI'] },

    // --- KEPALA KEBUN MENU ---
    { label: 'Dasbor Pemantauan', path: '/dashboard/direktur', icon: 'ri-dashboard-line', roles: ['KEPALA_KEBUN'] },
    { label: 'Peta Lahan GIS', path: '/lands', icon: 'ri-map-pin-2-line', roles: ['KEPALA_KEBUN'] },
    { label: 'Presensi Petani', path: '/payroll', icon: 'ri-calendar-check-line', roles: ['KEPALA_KEBUN'] },
    { label: 'Master Komoditas', path: '/crops', icon: 'ri-plant-line', roles: ['KEPALA_KEBUN'] },
    { label: 'Laporan Kebun', path: '/reports', icon: 'ri-file-list-3-line', roles: ['KEPALA_KEBUN'] },

    // --- MANAGER OPERASIONAL MENU ---
    { label: 'Dasbor Operasional', path: '/dashboard/direktur', icon: 'ri-dashboard-3-line', roles: ['MANAGER'] },
    { label: 'Peta Lahan GIS', path: '/lands', icon: 'ri-map-pin-2-line', roles: ['MANAGER'] },
    { label: 'Master Komoditas', path: '/crops', icon: 'ri-plant-line', roles: ['MANAGER'] },
    { label: 'Tasklist & SOP', path: '/tasks', icon: 'ri-calendar-event-line', roles: ['MANAGER'] },
    { label: 'Kelola Pekerja', path: '/users', icon: 'ri-user-settings-line', roles: ['MANAGER'] },
    { label: 'Gaji & Upah SDM', path: '/payroll', icon: 'ri-coins-line', roles: ['MANAGER'] },
    { label: 'Keuangan & Kas', path: '/financials', icon: 'ri-wallet-3-line', roles: ['MANAGER'] },
    { label: 'Tiket Timbangan PKS', path: '/weighbridge', icon: 'ri-scales-3-line', roles: ['MANAGER'] },
    { label: 'Kalkulasi HPP Lahan', path: '/hpp-calculator', icon: 'ri-calculator-line', roles: ['MANAGER'] },
    { label: 'Laporan Audit 5D', path: '/reports', icon: 'ri-file-chart-line', roles: ['MANAGER'] },

    // --- DIREKTUR MENU (FULL ACCESS) ---
    { label: 'Dasbor Strategis', path: '/dashboard/direktur', icon: 'ri-dashboard-3-line', roles: ['DIREKTUR'] },
    { label: 'Peta Lahan GIS', path: '/lands', icon: 'ri-map-pin-2-line', roles: ['DIREKTUR'] },
    { label: 'Master Komoditas', path: '/crops', icon: 'ri-plant-line', roles: ['DIREKTUR'] },
    { label: 'Tasklist & SOP', path: '/tasks', icon: 'ri-calendar-event-line', roles: ['DIREKTUR'] },
    { label: 'Manajemen User', path: '/users', icon: 'ri-user-settings-line', roles: ['DIREKTUR'] },
    { label: 'Absensi & Gaji SDM', path: '/payroll', icon: 'ri-calendar-check-line', roles: ['DIREKTUR'] },
    { label: 'Keuangan & Arus Kas', path: '/financials', icon: 'ri-wallet-3-line', roles: ['DIREKTUR'] },
    { label: 'Tiket Timbangan PKS', path: '/weighbridge', icon: 'ri-scales-3-line', roles: ['DIREKTUR'] },
    { label: 'Kalkulasi HPP Lahan', path: '/hpp-calculator', icon: 'ri-calculator-line', roles: ['DIREKTUR'] },
    { label: 'Laporan Audit 5D', path: '/reports', icon: 'ri-file-chart-line', roles: ['DIREKTUR'] },

    // --- INVESTOR MENU (READ ONLY) ---
    { label: 'Dasbor Investor', path: '/dashboard/investor', icon: 'ri-funds-box-line', roles: ['INVESTOR'], badge: 'Investor' },
    { label: 'Tasklist & SOP', path: '/tasks', icon: 'ri-calendar-event-line', roles: ['INVESTOR'] },
    { label: 'Keuangan & Arus Kas', path: '/financials', icon: 'ri-wallet-3-line', roles: ['INVESTOR'] },
    { label: 'Tiket Timbangan PKS', path: '/weighbridge', icon: 'ri-scales-3-line', roles: ['INVESTOR'] },
    { label: 'Kalkulasi HPP Lahan', path: '/hpp-calculator', icon: 'ri-calculator-line', roles: ['INVESTOR'] },
    { label: 'Laporan Audit 5D', path: '/reports', icon: 'ri-file-chart-line', roles: ['INVESTOR'] },
  ];

  // Filter items permitted for active role
  const permittedNavItems = navItems.filter((item) => item.roles.includes(role));

  const roleTitleMap: Record<RoleType, { title: string; subtitle: string }> = {
    DIREKTUR: { title: 'Direksi Kebun', subtitle: 'Akses Penuh' },
    INVESTOR: { title: 'Portofolio Investor', subtitle: 'Akses Investor' },
    MANAGER: { title: 'Manajer Operasional', subtitle: 'Pengelola' },
    KEPALA_KEBUN: { title: 'Kepala Kebun', subtitle: 'Pengawas' },
    PETANI: { title: 'Petani Lapangan', subtitle: 'Pekerja PWA' },
  };

  return (
    <aside className="position-fixed start-0 top-0 h-100 bg-white border-end shadow-sm z-50 d-flex flex-column" style={{ width: '17.5rem', zIndex: 1040 }}>
      {/* Sidebar Logo Header */}
      <div className="p-3 px-3.5 border-bottom d-flex align-items-center gap-2.5" style={{ height: '4.75rem' }}>
        <Link to="/dashboard/direktur" className="d-flex align-items-center gap-2.5 text-decoration-none w-100">
          <div style={{ width: 36, height: 36, backgroundColor: '#059669', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: 18, flexShrink: 0 }}>
            <i className="ri-leaf-line"></i>
          </div>
          <div>
            <h1 className="h6 font-weight-bold text-dark m-0 leading-tight" style={{ fontSize: 15 }}>AgroJaya ERP</h1>
            <span className="text-success font-weight-bold d-block" style={{ fontSize: 11, textTransform: 'uppercase' }}>Portal ERP Kebun</span>
          </div>
        </Link>
      </div>

      {/* User Profile Card inside Sidebar */}
      <div className="p-3 px-3.5 border-bottom d-flex align-items-center gap-2.5 bg-light">
        <div style={{ width: 38, height: 38, backgroundColor: '#dcfce7', border: '1px solid #86efac', color: '#166534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18, flexShrink: 0 }}>
          <i className="ri-user-3-fill"></i>
        </div>
        <div>
          <h6 className="font-weight-bold text-dark m-0" style={{ fontSize: 13 }}>{roleTitleMap[role].title}</h6>
          <span className="text-muted d-block" style={{ fontSize: 11 }}>{roleTitleMap[role].subtitle}</span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-grow-1 p-3 px-3 overflow-y-auto space-y-1">
        <span className="text-uppercase text-muted font-weight-bold d-block mb-2 px-2" style={{ fontSize: 10, letterSpacing: '0.5px' }}>
          Navigasi Utama
        </span>

        <ul className="list-unstyled space-y-1 m-0 p-0">
          {permittedNavItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={idx}>
                <Link
                  to={item.path}
                  className={`d-flex align-items-center justify-content-between p-2.5 px-3 rounded-3 text-decoration-none transition ${
                    isActive
                      ? 'bg-success text-white font-weight-bold shadow-sm'
                      : 'text-dark hover-bg-light font-weight-bold'
                  }`}
                  style={{ fontSize: 13 }}
                >
                  <div className="d-flex align-items-center gap-2.5">
                    <i className={`${item.icon}`} style={{ fontSize: 16, flexShrink: 0 }}></i>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="badge bg-warning text-dark font-weight-bold px-1.5 py-0.5" style={{ fontSize: 10 }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-3 border-top text-center text-muted font-weight-bold" style={{ fontSize: 11 }}>
        PT Agro Jaya Indonesia
      </div>
    </aside>
  );
};
