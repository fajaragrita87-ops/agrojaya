import React from 'react';

interface LaporanAuditScreenProps {
  onBack: () => void;
}

export const LaporanAuditScreen: React.FC<LaporanAuditScreenProps> = ({ onBack }) => {
  const auditReports = [
    {
      id: 'AUD-2026-Q3-01',
      title: 'Audit Kesiapan Fisik Lahan & Irigasi Drip 2.0 Ha',
      date: '24 Agu 2026',
      sla: '48 Jam (Tepat Waktu)',
      site: 'Site Jonggol • Blok A & B',
      auditor: 'Ir. Hendra Gunawan, IPM (Surveyor Independen PT Sucofindo)',
      pic: 'Budi Santoso (Kepala Kebun)',
      financial: {
        pagu: 'Rp 750.000.000',
        realisasi: 'Rp 742.800.000',
        selisih: '+Rp 7.200.000 (Hemat 0.96%)',
      },
      bapNumber: 'BAP-JGL-2026/08/24-IRG',
      status: 'TERVERIFIKASI & SAH',
    },
    {
      id: 'AUD-2026-Q2-08',
      title: 'Audit Pengadaan Benih Golden Melon F1 & Nutrisi AB Mix',
      date: '10 Agu 2026',
      sla: '24 Jam',
      site: 'Site Jonggol • Gudang Logistik',
      auditor: 'KAP Tanubrata & Rekan (Auditor Finansial)',
      pic: 'Rian Pratama (Manajer Pengadaan)',
      financial: {
        pagu: 'Rp 500.000.000',
        realisasi: 'Rp 488.500.000',
        selisih: '+Rp 11.500.000 (Sesuai PO)',
      },
      bapNumber: 'BAP-JGL-2026/08/10-SEED',
      status: 'TERVERIFIKASI & SAH',
    },
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

      {/* Header Banner */}
      <div className="bg-[#0B3B30] text-white rounded-[18px] p-4 shadow-md border border-[#14473B] flex items-center justify-between">
        <div>
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#C8E86B]">
            STANDAR 5-DIMENSI AUDIT INDEPENDEN
          </span>
          <h1 className="text-[17px] font-black tracking-tight mt-0.5 m-0 text-white">
            Portal Laporan Audit
          </h1>
          <p className="text-[11px] text-[#A3D9C9] m-0 mt-0.5">
            Akuntabilitas Hulu-ke-Hilir: Waktu, Lokasi, Personel, Dana, & BAP
          </p>
        </div>
        <div className="w-10 h-10 rounded-[12px] bg-white/10 flex items-center justify-center text-xl text-[#C8E86B]">
          <i className="ri-file-shield-2-fill"></i>
        </div>
      </div>

      {/* Quick Export Actions */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => alert('Mengunduh Laporan Lengkap Q3 (PDF Terverifikasi)...')}
          className="flex-1 py-2 rounded-[12px] bg-white border border-[#D9E3DC] text-[11.5px] font-extrabold text-[#0F5545] flex items-center justify-center gap-1.5 shadow-2xs hover:bg-[#F0F5F2] cursor-pointer"
        >
          <i className="ri-file-pdf-2-line text-red-600 text-sm"></i>
          <span>Unduh PDF Audit</span>
        </button>
        <button
          type="button"
          onClick={() => alert('Mengekspor Rekapitulasi Finansial (Excel .xlsx)...')}
          className="flex-1 py-2 rounded-[12px] bg-white border border-[#D9E3DC] text-[11.5px] font-extrabold text-[#0F5545] flex items-center justify-center gap-1.5 shadow-2xs hover:bg-[#F0F5F2] cursor-pointer"
        >
          <i className="ri-file-excel-2-line text-emerald-600 text-sm"></i>
          <span>Ekspor Excel</span>
        </button>
      </div>

      {/* 5-Dimension Audit Cards */}
      <div className="space-y-3">
        {auditReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-[16px] p-3.5 border border-[#E2EAE5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2.5"
          >
            {/* Header Card */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-[#0F5545] bg-[#E8F3ED] px-2 py-0.5 rounded-full inline-block mb-1">
                  {report.id}
                </span>
                <h2 className="text-[13px] font-extrabold text-[#11231D] m-0 leading-snug">
                  {report.title}
                </h2>
              </div>
              <span className="text-[9.5px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {report.status}
              </span>
            </div>

            {/* 5 Dimensions Grid */}
            <div className="space-y-1.5 text-[11px] bg-[#F8FAF8] p-2.5 rounded-[12px] border border-[#E8F0EB]">
              {/* Dimensi 1: Waktu */}
              <div className="flex justify-between">
                <span className="text-[#6A7B73]">📅 Waktu & Durasi:</span>
                <strong className="text-[#11231D]">{report.date} (SLA: {report.sla})</strong>
              </div>
              {/* Dimensi 2: Lokasi */}
              <div className="flex justify-between">
                <span className="text-[#6A7B73]">📍 Lokasi Site:</span>
                <strong className="text-[#11231D]">{report.site}</strong>
              </div>
              {/* Dimensi 3: Personel */}
              <div className="flex justify-between">
                <span className="text-[#6A7B73]">👤 Auditor & Pelaksana:</span>
                <strong className="text-[#11231D] text-right">{report.auditor}</strong>
              </div>
              {/* Dimensi 4: Finansial */}
              <div className="flex justify-between border-t border-[#E2EAE5] pt-1 mt-1">
                <span className="text-[#6A7B73]">💰 Finansial (Pagu vs Realisasi):</span>
                <strong className="text-[#0F5545]">{report.financial.realisasi} ({report.financial.selisih})</strong>
              </div>
              {/* Dimensi 5: Output & BAP */}
              <div className="flex justify-between">
                <span className="text-[#6A7B73]">📜 Dokumen BAP:</span>
                <strong className="text-[#2563EB] underline">{report.bapNumber}</strong>
              </div>
            </div>

            {/* Document Action Button */}
            <button
              type="button"
              onClick={() => alert(`Membuka Berkas Berita Acara: ${report.bapNumber}`)}
              className="w-full py-1.5 text-center text-[11px] font-bold text-[#0F5545] bg-[#E8F3ED] hover:bg-[#D8ECE0] rounded-[8px] cursor-pointer transition-colors"
            >
              Lihat Lampiran Berita Acara Pekerjaan (BAP) →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
