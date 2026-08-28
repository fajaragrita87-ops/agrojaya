import React from 'react';

interface KelolaUserScreenProps {
  onBack?: () => void;
}

export const KelolaUserScreen: React.FC<KelolaUserScreenProps> = () => {
  const users = [
    { name: 'Dr. Ir. H. Bambang Soedibyo', role: 'DIREKTUR', email: 'direktur@agrojaya.id', status: 'Aktif • Full Access', badgeColor: 'bg-emerald-100 text-emerald-800' },
    { name: 'Konsorsium Investasi Batavia', role: 'INVESTOR', email: 'investor@agrojaya.id', status: 'Aktif • Read-Only Portofolio', badgeColor: 'bg-blue-100 text-blue-800' },
    { name: 'Citra Lestari, S.E., Ak.', role: 'FINANCE', email: 'finance@agrojaya.id', status: 'Aktif • Otorisasi Keuangan', badgeColor: 'bg-amber-100 text-amber-800' },
    { name: 'Rian Pratama, S.P.', role: 'MANAGER', email: 'manager@agrojaya.id', status: 'Aktif • Manajemen Lapangan', badgeColor: 'bg-purple-100 text-purple-800' },
    { name: 'Budi Santoso', role: 'KEPALA_KEBUN', email: 'agronom@agrojaya.id', status: 'Aktif • Supervisi Agronomi', badgeColor: 'bg-teal-100 text-teal-800' },
    { name: 'Sukardi (Mandor 01)', role: 'PETANI', email: 'mandor01@agrojaya.id', status: 'Aktif • Input Perawatan', badgeColor: 'bg-gray-100 text-gray-800' },
  ];

  return (
    <div
      className="space-y-3.5 animate-in fade-in duration-150 antialiased text-[#11231D]"
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)',
        WebkitOverflowScrolling: 'touch',
      }}
    >

      {/* Header Banner */}
      <div className="bg-[#0B3B30] text-white rounded-[18px] p-4 shadow-md border border-[#14473B] flex items-center justify-between">
        <div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
            TATA KELOLA & OTORITAS AKSES
          </span>
          <h1 className="text-[17px] font-black tracking-tight mt-0.5 m-0 text-white">
            Manajemen Pengguna & RBAC
          </h1>
          <p className="text-[11px] text-[#A3D9C9] m-0 mt-0.5">
            Daftar peran, otorisasi, & pembatasan modul enterprise
          </p>
        </div>
        <div className="w-10 h-10 rounded-[12px] bg-white/10 flex items-center justify-center text-xl text-[#C8E86B]">
          <i className="ri-user-settings-fill"></i>
        </div>
      </div>

      {/* User List */}
      <div className="space-y-2">
        <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block px-0.5">
          PENGGUNA TERDAFTAR (6 ROLE ENTERPRISE)
        </span>
        <div className="space-y-2">
          {users.map((u, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[14px] p-3 border border-[#E2EAE5] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-1.5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-[12.5px] font-bold text-[#11231D] m-0">{u.name}</h2>
                  <span className="text-[10px] text-[#6A7B73]">{u.email}</span>
                </div>
                <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-full ${u.badgeColor}`}>
                  {u.role}
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-[#55675E] pt-1 border-t border-[#F0F5F2]">
                <span>Hak Akses: <strong>{u.status}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
