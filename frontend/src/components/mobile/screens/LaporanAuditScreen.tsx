import React, { useState } from 'react';
import { useSmartFarmStore } from '../../../store/smartFarmStore';

interface LaporanAuditScreenProps {
  onBack?: () => void;
}

export const LaporanAuditScreen: React.FC<LaporanAuditScreenProps> = () => {
  const { purchaseOrders, tasks } = useSmartFarmStore();
  const [selectedBapDoc, setSelectedBapDoc] = useState<{
    no: string;
    title: string;
    date: string;
    site: string;
    pic: string;
    cost: string;
    sla: string;
  } | null>(null);

  const completedTasks = tasks.filter((t) => t.completed);
  const approvedPOs = purchaseOrders.filter((p) => p.status === 'APPROVED' || p.status === 'PENDING_INVESTOR');

  const auditReports = [
    {
      id: 'AUD-2026-Q3-01',
      title: 'Audit Kesiapan Fisik Lahan & Irigasi Drip 2.0 Ha',
      date: '24 Agu 2026',
      sla: '48 Jam (Tepat Waktu)',
      site: 'Sentra Kebun • Blok A & B',
      auditor: 'Ir. Hendra Gunawan, IPM (Surveyor PT Sucofindo)',
      pic: 'Budi Santoso (Kepala Kebun)',
      financial: {
        pagu: 'Rp 750.000.000',
        realisasi: 'Rp 742.800.000',
        selisih: '+Rp 7.200.000 (Hemat 0.96%)',
      },
      bapNumber: 'BAP-SF-2026/08/24-IRG',
      status: 'TERVERIFIKASI & SAH',
    },
    ...approvedPOs.map((po, idx) => ({
      id: `AUD-PO-${po.id}`,
      title: `Audit Pengadaan: ${po.title}`,
      date: po.date,
      sla: '24 Jam',
      site: `Sentra Kebun • ${po.targetLand || 'Gudang Logistik'}`,
      auditor: 'KAP Tanubrata & Rekan (Auditor Independen)',
      pic: `${po.requester} (${po.vendor})`,
      financial: {
        pagu: `Rp ${po.amount.toLocaleString('id-ID')}`,
        realisasi: `Rp ${po.amount.toLocaleString('id-ID')}`,
        selisih: '0 (Sesuai PO & Faktur Toko)',
      },
      bapNumber: `BAP-PO-${po.id}-${idx + 1}`,
      status: 'TERVERIFIKASI & SAH',
    })),
    ...completedTasks.map((t, idx) => ({
      id: `AUD-TSK-${t.id}`,
      title: `Audit Pelaksanaan SOP: ${t.title}`,
      date: t.completedAt || t.time,
      sla: 'Tepat Waktu',
      site: `Sentra Kebun • ${t.target}`,
      auditor: 'Supervisi Agronomi Kebun',
      pic: `${t.assignedTo} (${t.category})`,
      financial: {
        pagu: 'OPEX Lapangan',
        realisasi: 'Rp 140.000',
        selisih: '0 (Sesuai BAP)',
      },
      bapNumber: `BAP-TSK-${t.id}-${idx + 1}`,
      status: 'TERVERIFIKASI & SAH',
    })),
  ];

  const handleExport = (type: 'PDF' | 'Excel') => {
    alert(`📥 Berkas Laporan Audit Terpadu 5-Dimensi (${type}) berhasil diunduh dengan ${auditReports.length} Dokumen Sah!`);
  };

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
            STANDAR 5-DIMENSI AUDIT INDEPENDEN
          </span>
          <h1 className="text-[17px] font-black tracking-tight mt-0.5 m-0 text-white">
            Portal Laporan Audit ({auditReports.length} Berkas)
          </h1>
        </div>
        <div className="w-10 h-10 rounded-[12px] bg-white/10 flex items-center justify-center text-xl text-[#C8E86B]">
          <i className="ri-file-shield-2-fill"></i>
        </div>
      </div>

      {/* Quick Export Actions */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleExport('PDF')}
          className="flex-1 py-2 rounded-[12px] bg-white border border-[#D9E3DC] text-[11.5px] font-extrabold text-[#0F5545] flex items-center justify-center gap-1.5 shadow-2xs hover:bg-[#F0F5F2] cursor-pointer"
        >
          <i className="ri-file-pdf-2-line text-red-600 text-sm"></i>
          <span>Unduh PDF Audit</span>
        </button>
        <button
          type="button"
          onClick={() => handleExport('Excel')}
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
                <span className="text-[#6A7B73]">💰 Finansial (Realisasi):</span>
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
              onClick={() =>
                setSelectedBapDoc({
                  no: report.bapNumber,
                  title: report.title,
                  date: report.date,
                  site: report.site,
                  pic: report.pic,
                  cost: report.financial.realisasi,
                  sla: report.sla,
                })
              }
              className="w-full py-1.5 text-center text-[11px] font-bold text-[#0F5545] bg-[#E8F3ED] hover:bg-[#D8ECE0] rounded-[8px] cursor-pointer transition-colors"
            >
              Lihat Lampiran Berita Acara Pekerjaan (BAP) →
            </button>
          </div>
        ))}
      </div>

      {/* BAP Viewer Modal */}
      {selectedBapDoc && (
        <div className="fixed inset-0 z-[9999] bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-sm p-4 space-y-3.5 shadow-2xl border border-[#E2EAE5] animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <span className="text-[9.5px] font-black text-[#0F5545] uppercase">Lampiran Berita Acara (BAP)</span>
                <h3 className="text-[14px] font-black text-[#11231D] m-0">{selectedBapDoc.no}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBapDoc(null)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#F8FAF8] p-3 rounded-[12px] border border-[#E8F0EB] text-[11px] space-y-2">
              <div>
                <span className="text-[#6A7B73] block text-[10px]">Uraian Pekerjaan:</span>
                <strong className="text-[#11231D] text-[12px]">{selectedBapDoc.title}</strong>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E8F0EB]">
                <div>
                  <span className="text-[#6A7B73] block text-[10px]">Tanggal & SLA:</span>
                  <strong className="text-[#11231D]">{selectedBapDoc.date} ({selectedBapDoc.sla})</strong>
                </div>
                <div>
                  <span className="text-[#6A7B73] block text-[10px]">Lokasi Site:</span>
                  <strong className="text-[#11231D]">{selectedBapDoc.site}</strong>
                </div>
              </div>
              <div className="pt-1 border-t border-[#E8F0EB]">
                <span className="text-[#6A7B73] block text-[10px]">Pelaksana & Vendor:</span>
                <strong className="text-[#0F5545]">{selectedBapDoc.pic}</strong>
              </div>
              <div className="pt-1 border-t border-[#E8F0EB]">
                <span className="text-[#6A7B73] block text-[10px]">Total Dana Realisasi:</span>
                <strong className="text-[#0F5545] text-[13px]">{selectedBapDoc.cost}</strong>
              </div>
            </div>

            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-[10px] text-[10.5px] font-bold border border-emerald-200 flex items-center gap-2">
              <i className="ri-checkbox-circle-fill text-base text-emerald-600"></i>
              <span>Dokumen BAP ini sah ditandatangani secara digital & tersimpan di database audit.</span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedBapDoc(null)}
              className="w-full py-2 bg-[#0F5545] text-white font-black text-[11.5px] rounded-[10px]"
            >
              Tutup Berkas BAP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
