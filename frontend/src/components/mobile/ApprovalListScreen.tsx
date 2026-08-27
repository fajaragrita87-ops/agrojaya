import React, { useState } from 'react';

export interface POApprovalItem {
  id: string;
  title: string;
  category: string;
  amountRp: string;
  amountNum: number;
  requester: string;
  site: string;
  date: string;
  financeStatus: 'Valid' | 'Pending' | 'Rejected';
  bapDoc: string;
  description: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface ApprovalListScreenProps {
  onBack: () => void;
}

export const ApprovalListScreen: React.FC<ApprovalListScreenProps> = ({ onBack }) => {
  const [poList, setPoList] = useState<POApprovalItem[]>([
    {
      id: 'PO-026',
      title: 'Pupuk Hayati Organik & Drip',
      category: 'OPEX Nutrisi & Perawatan',
      amountRp: 'Rp 28.500.000',
      amountNum: 28500000,
      requester: 'Ir. Agus Wijaya (Manajer Kebun)',
      site: 'Kebun Jonggol Blok A2 (2.0 Ha)',
      date: '27 Agu 2026',
      financeStatus: 'Valid',
      bapDoc: 'BAP-OPEX-2026-0826.pdf (Terlampir Nota & Faktur Pajak)',
      description: 'Pengadaan nutrisi mikro MgSO4, Boron, dan pupuk Hayati Trichoderma untuk fase pembesaran buah Melon Golden.',
      status: 'PENDING',
    },
    {
      id: 'PO-027',
      title: 'Material Greenhouse B3',
      category: 'CAPEX Infrastruktur Lahan',
      amountRp: 'Rp 41.200.000',
      amountNum: 41200000,
      requester: 'Supardi Hartono (Kepala Kebun)',
      site: 'Kebun Jonggol Blok B3',
      date: '26 Agu 2026',
      financeStatus: 'Valid',
      bapDoc: 'BAP-CAPEX-2026-0819.pdf (SPK Kontraktor CV Mitra Tani)',
      description: 'Pemasangan pipa galvanis, plastik UV 200 mikron, dan insect net 50 mesh untuk greenhouse pembibitan.',
      status: 'PENDING',
    },
  ]);

  const [selectedReviewPO, setSelectedReviewPO] = useState<POApprovalItem | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ action: 'APPROVE' | 'REJECT'; po: POApprovalItem } | null>(null);
  const [actionSuccessNotice, setActionSuccessNotice] = useState<string | null>(null);

  const pendingCount = poList.filter((p) => p.status === 'PENDING').length;

  const handleExecuteFinalAction = () => {
    if (!confirmDialog) return;

    const { action, po } = confirmDialog;
    const updated = poList.map((item) => {
      if (item.id === po.id) {
        return {
          ...item,
          status: action === 'APPROVE' ? ('APPROVED' as const) : ('REJECTED' as const),
        };
      }
      return item;
    });

    setPoList(updated);
    setConfirmDialog(null);
    setSelectedReviewPO(null);

    const msg =
      action === 'APPROVE'
        ? `✅ Berhasil mengesahkan ${po.id} (${po.amountRp}). Dana siap dicairkan.`
        : `❌ Pengajuan ${po.id} ditolak dan dikembalikan ke Finance.`;

    setActionSuccessNotice(msg);
    setTimeout(() => setActionSuccessNotice(null), 3000);
  };

  return (
    <div className="absolute inset-0 bg-[#F8FAF7] text-[#17211E] z-40 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
      {/* 1. App Bar */}
      <div className="h-[48px] min-h-[48px] bg-[#0B3B30] text-white px-3.5 flex items-center justify-between flex-shrink-0 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
          >
            <i className="ri-arrow-left-line text-lg"></i>
          </button>
          <h2 className="font-extrabold text-[14px] text-white m-0 tracking-tight leading-none">
            Menunggu Persetujuan
          </h2>
        </div>

        <span className="bg-[#C8E86B] text-[#0B3B30] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-2xs">
          {pendingCount} pengajuan
        </span>
      </div>

      {/* 2. Scrollable Body */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3.5 space-y-3">
        {actionSuccessNotice && (
          <div className="p-2.5 bg-[#E8F1EA] text-[#0F5545] rounded-[12px] text-[11.5px] font-extrabold text-center border border-[#0F5545]/20 animate-in fade-in">
            {actionSuccessNotice}
          </div>
        )}

        {/* Informative Banner */}
        <div className="p-3 rounded-[14px] bg-white border border-[#DDE6DF] shadow-2xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-[#FAF0E1] text-[#B66A0A] flex items-center justify-center text-base flex-shrink-0">
            <i className="ri-error-warning-fill"></i>
          </div>
          <div>
            <strong className="text-[11.5px] text-[#17211E] block leading-tight">
              Otorisasi Modal 2 Tahap (Maker-Checker)
            </strong>
            <span className="text-[10px] text-[#52615A]">
              Persetujuan Anda akan mengesahkan pemindahbukuan dari rekening penampung.
            </span>
          </div>
        </div>

        {/* PO List */}
        <div className="space-y-3">
          {poList.map((po) => (
            <div
              key={po.id}
              className="p-3.5 rounded-[16px] bg-white border border-[#DDE6DF] shadow-2xs space-y-2.5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-bold text-[#52615A] uppercase tracking-wider block">
                    {po.category}
                  </span>
                  <h3 className="font-extrabold text-[13.5px] text-[#17211E] m-0 mt-0.5">
                    {po.title}
                  </h3>
                  <span className="font-mono text-[10.5px] text-[#0F5545] font-bold">
                    {po.id} • {po.date}
                  </span>
                </div>

                <div className="text-end">
                  <span className="text-[10px] text-[#52615A] block">Nilai Pengajuan</span>
                  <strong className="text-[14px] font-black text-[#0B3B30] block">
                    {po.amountRp}
                  </strong>
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 px-2 bg-[#F8FAF7] rounded-[10px] text-[10.5px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#52615A]">Verifikasi Finance:</span>
                  <strong className="text-[#0F5545] flex items-center gap-0.5">
                    <i className="ri-checkbox-circle-fill"></i> {po.financeStatus}
                  </strong>
                </div>
                <span className="text-[#52615A] truncate max-w-[130px]">{po.requester}</span>
              </div>

              {po.status === 'PENDING' ? (
                <button
                  type="button"
                  onClick={() => setSelectedReviewPO(po)}
                  className="w-full py-2 bg-[#0F5545] text-white font-extrabold text-[11.5px] rounded-[10px] cursor-pointer hover:bg-[#0B3B30] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <i className="ri-file-search-line"></i>
                  <span>Tinjau Pengajuan</span>
                </button>
              ) : (
                <div className="w-full py-1.5 bg-[#E8F1EA] text-[#0F5545] font-bold text-[11px] rounded-[8px] text-center border border-[#0F5545]/20">
                  {po.status === 'APPROVED' ? '✓ Telah Disahkan' : '✕ Telah Ditolak'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: DETAIL INSPECTION MODAL */}
      {/* ========================================================================= */}
      {selectedReviewPO && (
        <div className="absolute inset-0 bg-black/65 backdrop-blur-xs z-50 flex items-end justify-center p-0 animate-in fade-in duration-150">
          <div className="bg-white w-full max-h-[90%] rounded-t-[28px] p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Sheet Top Handle */}
            <div className="w-full flex items-center justify-center pb-2">
              <div className="w-10 h-1 rounded-full bg-[#DDE6DF]" />
            </div>

            <div className="flex justify-between items-center border-b border-[#DDE6DF] pb-2 mb-2.5">
              <div>
                <span className="badge bg-[#0B3B30] text-[#C8E86B] font-bold px-2 py-0.5 rounded text-[9.5px]">
                  Tinjauan Detail {selectedReviewPO.id}
                </span>
                <h4 className="font-extrabold text-[13.5px] text-[#17211E] m-0 mt-0.5">
                  {selectedReviewPO.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReviewPO(null)}
                className="w-7 h-7 rounded-full bg-[#FAFBF7] hover:bg-[#E8F1EA] text-[#52615A] flex items-center justify-center text-base"
              >
                &times;
              </button>
            </div>

            {/* Scrollable details */}
            <div className="overflow-y-auto space-y-2.5 text-[11px] flex-1 pr-1">
              <div className="p-2.5 rounded-[12px] bg-[#F8FAF7] border border-[#DDE6DF] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#52615A]">Total Dana Diajukan:</span>
                  <strong className="text-[#0F5545] text-[13px] font-black">{selectedReviewPO.amountRp}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#52615A]">Unit Lokasi Lahan:</span>
                  <strong>{selectedReviewPO.site}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#52615A]">Pejabat Pengaju:</span>
                  <strong>{selectedReviewPO.requester}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#52615A]">Pemeriksa Keuangan:</span>
                  <strong className="text-[#0F5545]">Siti Rahmawati, S.E. (Valid)</strong>
                </div>
              </div>

              <div>
                <span className="text-[#52615A] font-bold block mb-0.5">Deskripsi Kebutuhan:</span>
                <p className="p-2 rounded-[8px] bg-white border border-[#DDE6DF] m-0 text-[#17211E] leading-relaxed">
                  {selectedReviewPO.description}
                </p>
              </div>

              <div>
                <span className="text-[#52615A] font-bold block mb-0.5">Dokumen Bukti & Nota:</span>
                <div className="p-2 rounded-[8px] bg-[#E8F1EA] border border-[#0F5545]/20 flex items-center justify-between text-[#0F5545]">
                  <div className="flex items-center gap-1.5 truncate">
                    <i className="ri-file-pdf-fill text-base text-red-600"></i>
                    <span className="font-medium truncate">{selectedReviewPO.bapDoc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert(`Membuka lampiran digital: ${selectedReviewPO.bapDoc}`)}
                    className="text-[10px] font-extrabold underline ml-2 flex-shrink-0 cursor-pointer"
                  >
                    Buka
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#DDE6DF] flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmDialog({ action: 'APPROVE', po: selectedReviewPO })}
                className="flex-1 py-2.5 bg-[#0F5545] text-white font-extrabold text-[11.5px] rounded-[10px] cursor-pointer hover:bg-[#0B3B30] active:scale-[0.98] shadow-xs flex items-center justify-center gap-1"
              >
                <i className="ri-check-double-line"></i>
                <span>Sahkan & Lanjutkan</span>
              </button>
              <button
                type="button"
                onClick={() => setConfirmDialog({ action: 'REJECT', po: selectedReviewPO })}
                className="px-3.5 py-2.5 border border-red-200 text-red-600 font-bold text-[11.5px] rounded-[10px] cursor-pointer hover:bg-red-50"
              >
                Tolak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIRMATION DIALOG */}
      {/* ========================================================================= */}
      {confirmDialog && (
        <div className="absolute inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full rounded-[20px] p-4 text-center space-y-3 animate-in zoom-in-95 duration-150">
            <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center text-2xl ${
              confirmDialog.action === 'APPROVE' ? 'bg-[#E8F1EA] text-[#0F5545]' : 'bg-red-100 text-red-600'
            }`}>
              <i className={confirmDialog.action === 'APPROVE' ? 'ri-shield-check-fill' : 'ri-close-circle-fill'}></i>
            </div>

            <div>
              <h4 className="font-extrabold text-[14px] text-[#17211E] m-0">
                {confirmDialog.action === 'APPROVE' ? 'Konfirmasi Pengesahan PO' : 'Konfirmasi Penolakan PO'}
              </h4>
              <p className="text-[11px] text-[#52615A] m-0 mt-1">
                Apakah Anda yakin ingin {confirmDialog.action === 'APPROVE' ? 'mengesahkan pencairan dana' : 'menolak'} untuk <strong>{confirmDialog.po.id}</strong> ({confirmDialog.po.amountRp})?
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleExecuteFinalAction}
                className={`flex-1 py-2 text-white font-extrabold text-[11.5px] rounded-[10px] cursor-pointer ${
                  confirmDialog.action === 'APPROVE' ? 'bg-[#0F5545] hover:bg-[#0B3B30]' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Ya, Lanjutkan
              </button>
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 border border-[#DDE6DF] text-[#52615A] font-bold text-[11.5px] rounded-[10px] cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
