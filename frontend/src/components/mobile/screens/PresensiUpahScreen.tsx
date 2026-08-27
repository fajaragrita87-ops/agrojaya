import React, { useState } from 'react';

interface PresensiUpahScreenProps {
  onBack: () => void;
}

export const PresensiUpahScreen: React.FC<PresensiUpahScreenProps> = ({ onBack }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  const workers = [
    { name: 'Sukardi', role: 'Mandor Utama', shift: '06:30 - 15:30', status: 'Hadir (Check-In 06:28)', wageRate: 'Rp 140.000 / hari', totalMonth: 'Rp 3.640.000' },
    { name: 'Wawan Setiawan', role: 'Teknisi Irigasi Drip', shift: '07:00 - 16:00', status: 'Hadir (Check-In 06:55)', wageRate: 'Rp 130.000 / hari', totalMonth: 'Rp 3.380.000' },
    { name: 'Slamet Riyadi', role: 'Petani Pemeliharaan', shift: '07:00 - 16:00', status: 'Hadir (Check-In 06:58)', wageRate: 'Rp 115.000 / hari', totalMonth: 'Rp 2.990.000' },
    { name: 'Joko Prabowo', role: 'Petani Pemupukan', shift: '07:00 - 16:00', status: 'Izin Sakit', wageRate: 'Rp 115.000 / hari', totalMonth: 'Rp 2.760.000' },
  ];

  return (
    <div className="space-y-3.5 pb-6 animate-in fade-in duration-150 antialiased text-[#11231D]">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-[12px] font-bold text-[#0F5545] hover:text-[#0B3B30] cursor-pointer"
      >
        <i className="ri-arrow-left-line text-sm"></i>
        <span>Kembali ke Menu & Modul</span>
      </button>

      {/* Header Card */}
      <div className="bg-[#0B3B30] text-white rounded-[18px] p-4 shadow-md border border-[#14473B] space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
              SISTEM PRESENSI & PAYROLL SDM
            </span>
            <h1 className="text-[18px] font-black tracking-tight mt-0.5 m-0 text-white">
              Presensi & Upah Tenaga Kerja
            </h1>
            <p className="text-[11px] text-[#A3D9C9] m-0 mt-0.5">
              Validasi GPS radius kebun Jonggol (Akurasi 3 meter)
            </p>
          </div>
          <span className="bg-[#C8E86B] text-[#08201A] text-[9.5px] font-black px-2.5 py-0.5 rounded-full">
            18/20 Hadir
          </span>
        </div>

        {/* Quick Check-In Button */}
        <button
          type="button"
          onClick={() => setIsCheckedIn(!isCheckedIn)}
          className={`w-full py-2 rounded-[12px] text-[11.5px] font-black cursor-pointer transition-all shadow-xs flex items-center justify-center gap-1.5 ${
            isCheckedIn
              ? 'bg-[#E8F3ED] text-[#0F5545] border border-[#C8E86B]/40'
              : 'bg-[#C8E86B] text-[#08201A]'
          }`}
        >
          <i className="ri-map-pin-user-fill"></i>
          <span>{isCheckedIn ? '✓ Anda Telah Check-In Hari Ini (06:45 WIB)' : '📍 Lakukan Check-In Presensi Sekarang'}</span>
        </button>
      </div>

      {/* Worker List */}
      <div className="space-y-2">
        <span className="text-[11px] font-black text-[#0B3B30] uppercase tracking-wider block px-0.5">
          REKAPITULASI KEHADIRAN & UPAH HARIAN
        </span>
        <div className="space-y-2">
          {workers.map((w, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[14px] p-3 border border-[#E2EAE5] shadow-[0_1px_4px_rgba(0,0,0,0.03)] space-y-1.5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-[12.5px] font-bold text-[#11231D] m-0">{w.name}</h2>
                  <span className="text-[10px] text-[#6A7B73]">{w.role} • {w.shift}</span>
                </div>
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                    w.status.includes('Hadir')
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {w.status}
                </span>
              </div>
              <div className="flex justify-between text-[10.5px] text-[#55675E] pt-1 border-t border-[#F0F5F2]">
                <span>Tarif: <strong>{w.wageRate}</strong></span>
                <span className="text-[#0F5545] font-black">Est. Akumulasi: {w.totalMonth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
