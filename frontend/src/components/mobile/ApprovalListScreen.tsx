import React, { useState } from 'react';
import { useSmartFarmStore, type PurchaseOrder, type POStatus } from '../../store/smartFarmStore';
import { useRole, type RoleType } from '../../context/RoleContext';

interface ApprovalListScreenProps {
  onBack: () => void;
}

export const ApprovalListScreen: React.FC<ApprovalListScreenProps> = ({ onBack }) => {
  const { role } = useRole();
  const {
    purchaseOrders,
    createPO,
    verifyPOByFinance,
    approvePOByDirektur,
    authorizePOByInvestor,
    rejectPO,
  } = useSmartFarmStore();

  const [selectedTab, setSelectedTab] = useState<'ALL' | 'ACTION_NEEDED' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [selectedReviewPO, setSelectedReviewPO] = useState<PurchaseOrder | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ action: 'APPROVE' | 'REJECT'; po: PurchaseOrder } | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [actionSuccessNotice, setActionSuccessNotice] = useState<string | null>(null);

  // Form State for "+ Ajukan PO Baru"
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newVendor, setNewVendor] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<'Saprotan' | 'Bibit' | 'Pupuk' | 'Infrastruktur' | 'Alsintan'>('Pupuk');
  const [newInvoice, setNewInvoice] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const roleNameMap: Record<RoleType, string> = {
    DIREKTUR: 'Budi Santoso (Direktur Utama)',
    INVESTOR: 'Hendrawan Kusuma (Investor Utama)',
    FINANCE: 'Siti Rahmawati (Manajer Keuangan)',
    MANAGER: 'Irfan Maulana (Manajer Ops)',
    KEPALA_KEBUN: 'Supardi Hartono (Kepala Kebun)',
    PETANI: 'Kang Asep (Mandor Regu A)',
  };

  const currentUserName = roleNameMap[role] || 'Staf AgroJaya';

  // Determine if PO needs action based on current user role
  const isActionNeededForRole = (po: PurchaseOrder): boolean => {
    if (role === 'FINANCE' && po.status === 'PENDING_FINANCE') return true;
    if (role === 'DIREKTUR' && po.status === 'PENDING_DIREKTUR') return true;
    if (role === 'INVESTOR' && po.status === 'PENDING_INVESTOR') return true;
    return false;
  };

  // Filtered List
  const filteredPOs = purchaseOrders.filter((po) => {
    if (selectedTab === 'ACTION_NEEDED') return isActionNeededForRole(po);
    if (selectedTab === 'PENDING') return po.status.startsWith('PENDING_');
    if (selectedTab === 'APPROVED') return po.status === 'APPROVED';
    if (selectedTab === 'REJECTED') return po.status === 'REJECTED';
    return true;
  });

  const totalPending = purchaseOrders.filter((p) => p.status.startsWith('PENDING_')).length;
  const actionNeededCount = purchaseOrders.filter((p) => isActionNeededForRole(p)).length;

  // Handle Form Submit
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount.trim()) return;

    createPO({
      title: newTitle.trim(),
      vendor: newVendor.trim() || 'Mitra Toko Pertanian',
      amount: parseInt(newAmount.replace(/[^0-9]/g, ''), 10) || 0,
      category: newCategory,
      requester: currentUserName,
      invoiceNumber: newInvoice.trim() || `REQ-${Date.now().toString().slice(-4)}`,
      notes: newNotes.trim() || 'Pengajuan kebutuhan operasional lapangan.',
    });

    setNewTitle('');
    setNewVendor('');
    setNewAmount('');
    setNewInvoice('');
    setNewNotes('');
    setShowCreateModal(false);

    setActionSuccessNotice('✅ Pengajuan PO baru berhasil dibuat dan diteruskan ke Tim Finance.');
    setTimeout(() => setActionSuccessNotice(null), 3000);
  };

  // Handle Approval Action
  const handleExecuteApproval = () => {
    if (!confirmDialog) return;
    const { action, po } = confirmDialog;

    if (action === 'APPROVE') {
      if (role === 'FINANCE' || po.status === 'PENDING_FINANCE') {
        verifyPOByFinance(po.id, 'Faktur & spesifikasi telah diverifikasi valid oleh Finance.');
        setActionSuccessNotice(`✓ ${po.id} telah diverifikasi Finance dan diteruskan ke Direktur.`);
      } else if (role === 'DIREKTUR' || po.status === 'PENDING_DIREKTUR') {
        approvePOByDirektur(po.id, 'Disetujui Direktur Utama untuk pencairan.');
        setActionSuccessNotice(`✓ ${po.id} disetujui Direktur dan diteruskan ke Investor.`);
      } else if (role === 'INVESTOR' || po.status === 'PENDING_INVESTOR') {
        authorizePOByInvestor(po.id, 'Disahkan dan diotorisasi Investor Utama.');
        setActionSuccessNotice(`✓ ${po.id} telah disahkan Investor. Dana siap dicairkan!`);
      } else {
        // Fallback approve
        authorizePOByInvestor(po.id);
        setActionSuccessNotice(`✓ ${po.id} berhasil disetujui.`);
      }
    } else {
      rejectPO(po.id, rejectReason || 'Ditolak oleh pimpinan pada tahap peninjauan.');
      setActionSuccessNotice(`✕ ${po.id} telah ditolak dan dikembalikan.`);
    }

    setConfirmDialog(null);
    setSelectedReviewPO(null);
    setRejectReason('');
    setTimeout(() => setActionSuccessNotice(null), 3500);
  };

  const getStatusBadge = (status: POStatus) => {
    switch (status) {
      case 'PENDING_FINANCE':
        return <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded-full text-[9px]">1. Menunggu Finance</span>;
      case 'PENDING_DIREKTUR':
        return <span className="bg-blue-100 text-blue-900 border border-blue-300 font-bold px-2 py-0.5 rounded-full text-[9px]">2. Menunggu Direktur</span>;
      case 'PENDING_INVESTOR':
        return <span className="bg-purple-100 text-purple-900 border border-purple-300 font-bold px-2 py-0.5 rounded-full text-[9px]">3. Menunggu Investor</span>;
      case 'APPROVED':
        return <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-2 py-0.5 rounded-full text-[9px]">✓ Disahkan (Cair)</span>;
      case 'REJECTED':
        return <span className="bg-red-100 text-red-900 border border-red-300 font-bold px-2 py-0.5 rounded-full text-[9px]">✕ Ditolak</span>;
    }
  };

  return (
    <div className="absolute inset-0 bg-[#F8FAF7] text-[#17211E] z-40 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
      {/* 1. App Bar */}
      <div className="h-[50px] min-h-[50px] bg-gradient-to-r from-[#061E18] via-[#0A382E] to-[#0F4E40] text-white px-3.5 flex items-center justify-between flex-shrink-0 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
          >
            <i className="ri-arrow-left-line text-lg"></i>
          </button>
          <div>
            <h2 className="font-black text-[13.5px] text-white m-0 tracking-tight leading-none">
              Otorisasi Belanja (PO)
            </h2>
            <span className="text-[9px] text-[#A3D9C9] block mt-0.5">
              Alur Pengesahan 4-Tier Maker-Checker
            </span>
          </div>
        </div>

        {/* Create PO Button */}
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="bg-[#C8E86B] text-[#0B3B30] font-black text-[10.5px] px-2.5 py-1 rounded-[8px] shadow-xs active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
        >
          <i className="ri-add-line"></i>
          <span>Ajukan PO</span>
        </button>
      </div>

      {/* 2. Filter Tab Bar */}
      <div className="bg-white border-b border-[#DDE6DF] px-2.5 py-1.5 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none text-[10px] font-bold">
        <button
          type="button"
          onClick={() => setSelectedTab('ALL')}
          className={`px-2.5 py-1 rounded-full shrink-0 transition-all cursor-pointer ${
            selectedTab === 'ALL'
              ? 'bg-[#0F5545] text-white'
              : 'bg-[#FAFBF8] text-[#52615A] border border-[#DDE6DF]'
          }`}
        >
          Semua ({purchaseOrders.length})
        </button>

        {actionNeededCount > 0 && (
          <button
            type="button"
            onClick={() => setSelectedTab('ACTION_NEEDED')}
            className={`px-2.5 py-1 rounded-full shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
              selectedTab === 'ACTION_NEEDED'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 border border-amber-300'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
            <span>Perlu Tindakan ({actionNeededCount})</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setSelectedTab('PENDING')}
          className={`px-2.5 py-1 rounded-full shrink-0 transition-all cursor-pointer ${
            selectedTab === 'PENDING'
              ? 'bg-[#0F5545] text-white'
              : 'bg-[#FAFBF8] text-[#52615A] border border-[#DDE6DF]'
          }`}
        >
          Menunggu ({totalPending})
        </button>

        <button
          type="button"
          onClick={() => setSelectedTab('APPROVED')}
          className={`px-2.5 py-1 rounded-full shrink-0 transition-all cursor-pointer ${
            selectedTab === 'APPROVED'
              ? 'bg-[#0F5545] text-white'
              : 'bg-[#FAFBF8] text-[#52615A] border border-[#DDE6DF]'
          }`}
        >
          Disetujui ({purchaseOrders.filter((p) => p.status === 'APPROVED').length})
        </button>

        <button
          type="button"
          onClick={() => setSelectedTab('REJECTED')}
          className={`px-2.5 py-1 rounded-full shrink-0 transition-all cursor-pointer ${
            selectedTab === 'REJECTED'
              ? 'bg-[#0F5545] text-white'
              : 'bg-[#FAFBF8] text-[#52615A] border border-[#DDE6DF]'
          }`}
        >
          Ditolak ({purchaseOrders.filter((p) => p.status === 'REJECTED').length})
        </button>
      </div>

      {/* 3. Scrollable PO List Body */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 84px)',
        }}
        className="p-3.5 space-y-3"
      >
        {actionSuccessNotice && (
          <div className="p-2.5 bg-[#E8F1EA] text-[#0F5545] rounded-[12px] text-[11px] font-black text-center border border-[#0F5545]/20 animate-in fade-in">
            {actionSuccessNotice}
          </div>
        )}

        {/* Informative Banner */}
        <div className="p-3 rounded-[14px] bg-white border border-[#DDE6DF] shadow-2xs flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-[#E8F1EA] text-[#0F5545] flex items-center justify-center text-base flex-shrink-0">
              <i className="ri-shield-check-fill"></i>
            </div>
            <div>
              <strong className="text-[11.5px] text-[#17211E] block leading-tight">
                Mode Otoritas: {role.replace('_', ' ')}
              </strong>
              <span className="text-[9.5px] text-[#52615A]">
                Akun: {currentUserName}
              </span>
            </div>
          </div>
          <span className="bg-[#FAFBF8] text-[#0F5545] border border-[#DDE6DF] text-[9.5px] font-black px-2 py-1 rounded-[6px]">
            {filteredPOs.length} PO
          </span>
        </div>

        {/* PO Items */}
        {filteredPOs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-[16px] border border-[#DDE6DF] text-[#52615A] space-y-2">
            <i className="ri-inbox-line text-3xl text-[#A3D9C9] block"></i>
            <strong className="text-[12px] block text-[#17211E]">Tidak Ada Pengajuan PO</strong>
            <p className="text-[10.5px] m-0">Tidak ada data PO pada filter yang dipilih.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPOs.map((po) => {
              const needsAction = isActionNeededForRole(po);
              return (
                <div
                  key={po.id}
                  className={`p-3.5 rounded-[16px] bg-white border transition-all shadow-2xs space-y-2.5 ${
                    needsAction ? 'border-[#0F5545] ring-2 ring-[#0F5545]/15' : 'border-[#DDE6DF]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-mono font-black text-[11px] text-[#0F5545]">
                          {po.id}
                        </span>
                        <span className="text-[9px] bg-[#F4F6F4] text-[#52615A] px-1.5 py-0.2 rounded font-bold">
                          {po.category}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-[13px] text-[#17211E] m-0 leading-tight">
                        {po.title}
                      </h3>
                      <span className="text-[10px] text-[#52615A] block mt-0.5">
                        Vendor: <strong>{po.vendor}</strong> • {po.date}
                      </span>
                    </div>

                    <div className="text-end">
                      <span className="text-[9.5px] text-[#52615A] block">Nilai PO</span>
                      <strong className="text-[13.5px] font-black text-[#0B3B30] block">
                        Rp {po.amount.toLocaleString('id-ID')}
                      </strong>
                    </div>
                  </div>

                  {/* Status & Requester Bar */}
                  <div className="flex items-center justify-between py-1.5 px-2.5 bg-[#F8FAF7] rounded-[10px] text-[10px]">
                    <div className="flex items-center gap-1">
                      <span className="text-[#52615A]">Status:</span>
                      {getStatusBadge(po.status)}
                    </div>
                    <span className="text-[#52615A] truncate max-w-[130px] font-medium">
                      Pemohon: {po.requester}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setSelectedReviewPO(po)}
                      className="flex-1 py-2 bg-[#0F5545] text-white font-extrabold text-[11px] rounded-[10px] cursor-pointer hover:bg-[#0B3B30] active:scale-[0.98] transition-all flex items-center justify-center gap-1 shadow-xs"
                    >
                      <i className="ri-file-search-line"></i>
                      <span>{needsAction ? 'Tinjau & Otorisasi' : 'Lihat Rincian & BAP'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: DETAIL INSPECTION & APPROVAL SHEET */}
      {/* ========================================================================= */}
      {selectedReviewPO && (
        <div className="fixed inset-0 z-[99999] flex items-end justify-center overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity cursor-pointer animate-in fade-in duration-150"
            onClick={() => setSelectedReviewPO(null)}
          ></div>

          {/* Bottom Sheet Modal */}
          <div
            style={{
              maxHeight: '88dvh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            className="relative w-full max-w-[480px] mx-auto bg-[#FAFBF8] text-[#17211E] rounded-t-[24px] shadow-2xl z-10 animate-in slide-in-from-bottom duration-200 border-t border-[#DDE5DF] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-3.5 bg-gradient-to-r from-[#061E18] via-[#0A382E] to-[#0F4E40] text-white flex items-center justify-between shadow-xs shrink-0">
              <div className="flex items-center gap-2">
                <i className="ri-file-paper-2-fill text-[#C8E86B] text-lg"></i>
                <div>
                  <strong className="text-[12.5px] text-white block leading-tight">
                    Tinjauan Detail PO: {selectedReviewPO.id}
                  </strong>
                  <span className="text-[9px] text-[#A3D9C9]">
                    Kategori: {selectedReviewPO.category} • {selectedReviewPO.date}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReviewPO(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-base transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
              className="p-3.5 space-y-3"
            >
              {/* Financial Box */}
              <div className="p-3.5 rounded-[16px] bg-gradient-to-br from-[#0B3B30] to-[#04241C] text-white shadow-xs flex justify-between items-center">
                <div>
                  <span className="text-[9.5px] text-[#A3D9C9] block">Total Anggaran PO</span>
                  <strong className="text-[17px] text-[#C8E86B] font-black tracking-tight">
                    Rp {selectedReviewPO.amount.toLocaleString('id-ID')}
                  </strong>
                </div>
                <div className="text-end">
                  <span className="text-[9px] text-white/70 block">Status Alur</span>
                  {getStatusBadge(selectedReviewPO.status)}
                </div>
              </div>

              {/* Specification Card */}
              <div className="p-3 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs space-y-2 text-[11px]">
                <strong className="text-[11.5px] text-[#17211E] block mb-1">
                  📦 Spesifikasi & Vendor Rekanan:
                </strong>

                <div className="flex justify-between py-1 border-b border-[#FAFBF8]">
                  <span className="text-[#5F6A65]">Kebutuhan Barang:</span>
                  <strong className="text-[#17211E] text-right max-w-[200px]">{selectedReviewPO.title}</strong>
                </div>

                <div className="flex justify-between py-1 border-b border-[#FAFBF8]">
                  <span className="text-[#5F6A65]">Vendor / Toko:</span>
                  <strong className="text-[#0F5545]">{selectedReviewPO.vendor}</strong>
                </div>

                <div className="flex justify-between py-1 border-b border-[#FAFBF8]">
                  <span className="text-[#5F6A65]">No. Invoice / Faktur:</span>
                  <span className="font-mono text-[#17211E] font-bold">{selectedReviewPO.invoiceNumber || '-'}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-[#5F6A65]">Diajukan Oleh:</span>
                  <strong className="text-[#17211E]">{selectedReviewPO.requester}</strong>
                </div>
              </div>

              {/* Justification & Notes */}
              <div className="p-3 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs space-y-1.5 text-[11px]">
                <strong className="text-[11.5px] text-[#17211E] block">📝 Catatan & Justifikasi Teknis:</strong>
                <p className="text-[#5F6A65] text-[10.5px] leading-relaxed m-0 bg-[#F8FAF7] p-2.5 rounded-[10px] border border-[#DDE6DF]">
                  {selectedReviewPO.notes || 'Pengadaan saprotan dan logistik operasional perkebunan sesuai standar SOP agronomi.'}
                </p>
              </div>

              {/* 4-Tier Audit Trail Progress */}
              <div className="p-3 rounded-[14px] bg-white border border-[#DDE5DF] shadow-xs space-y-2 text-[11px]">
                <strong className="text-[11.5px] text-[#17211E] block">
                  🔍 Riwayat Audit Otorisasi (4-Tier Trail):
                </strong>

                <div className="space-y-1.5 text-[10px]">
                  <div className="flex items-center gap-2 p-1.5 rounded-[8px] bg-emerald-50 text-emerald-900 border border-emerald-200">
                    <i className="ri-checkbox-circle-fill text-emerald-600 text-sm"></i>
                    <div>
                      <strong>1. Pengajuan Awal (Manajer Ops)</strong>
                      <span className="block text-[9px] text-emerald-700">Oleh: {selectedReviewPO.requester} • {selectedReviewPO.date}</span>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 p-1.5 rounded-[8px] border ${
                    selectedReviewPO.financeVerifiedAt
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}>
                    <i className={`text-sm ${
                      selectedReviewPO.financeVerifiedAt ? 'ri-checkbox-circle-fill text-emerald-600' : 'ri-time-line text-amber-600'
                    }`}></i>
                    <div>
                      <strong>2. Verifikasi Faktur & Pajak (Finance)</strong>
                      <span className="block text-[9px]">
                        {selectedReviewPO.financeVerifiedAt ? `Terverifikasi: ${selectedReviewPO.financeVerifiedAt}` : 'Menunggu validasi faktur Finance'}
                      </span>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 p-1.5 rounded-[8px] border ${
                    selectedReviewPO.direkturApprovedAt
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    <i className={`text-sm ${
                      selectedReviewPO.direkturApprovedAt ? 'ri-checkbox-circle-fill text-emerald-600' : 'ri-time-line text-slate-500'
                    }`}></i>
                    <div>
                      <strong>3. Persetujuan Anggaran (Direktur Utama)</strong>
                      <span className="block text-[9px]">
                        {selectedReviewPO.direkturApprovedAt ? `Disetujui: ${selectedReviewPO.direkturApprovedAt}` : 'Menunggu persetujuan Direktur'}
                      </span>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 p-1.5 rounded-[8px] border ${
                    selectedReviewPO.investorAuthorizedAt
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    <i className={`text-sm ${
                      selectedReviewPO.investorAuthorizedAt ? 'ri-checkbox-circle-fill text-emerald-600' : 'ri-time-line text-slate-500'
                    }`}></i>
                    <div>
                      <strong>4. Pengesahan & Pencairan Modal (Investor Utama)</strong>
                      <span className="block text-[9px]">
                        {selectedReviewPO.investorAuthorizedAt ? `Disahkan: ${selectedReviewPO.investorAuthorizedAt}` : 'Menunggu otorisasi pencairan Investor'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Sticky Bottom Actions */}
            <div
              style={{
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
              }}
              className="p-3 bg-white border-t border-[#DDE5DF] flex gap-2 shrink-0 shadow-lg"
            >
              {isActionNeededForRole(selectedReviewPO) ? (
                <>
                  <button
                    type="button"
                    onClick={() => setConfirmDialog({ action: 'REJECT', po: selectedReviewPO })}
                    className="flex-1 py-2.5 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] font-extrabold text-[11px] rounded-[10px] cursor-pointer hover:bg-red-100 flex items-center justify-center gap-1"
                  >
                    <i className="ri-close-circle-line"></i>
                    <span>Tolak PO</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfirmDialog({ action: 'APPROVE', po: selectedReviewPO })}
                    className="flex-[2] py-2.5 bg-[#0F5545] text-white font-black text-[11.5px] rounded-[10px] cursor-pointer hover:bg-[#0B3B30] shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <i className="ri-checkbox-circle-line text-base text-[#C8E86B]"></i>
                    <span>
                      {role === 'FINANCE'
                        ? 'Verifikasi Faktur (Lolos)'
                        : role === 'DIREKTUR'
                        ? 'Setujui Anggaran'
                        : 'Sahkan & Cairkan Dana'}
                    </span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedReviewPO(null)}
                  className="w-full py-2.5 bg-[#F4F6F4] text-[#17211E] font-bold text-[11px] rounded-[10px] cursor-pointer hover:bg-slate-200"
                >
                  Tutup Tinjauan
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE NEW PO FORM */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[99999] flex items-end justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={() => setShowCreateModal(false)}
          ></div>

          <div
            style={{
              maxHeight: '90dvh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            className="relative w-full max-w-[480px] mx-auto bg-[#FAFBF8] text-[#17211E] rounded-t-[24px] shadow-2xl z-10 border-t border-[#DDE5DF] overflow-hidden"
          >
            {/* Header */}
            <div className="p-3.5 bg-gradient-to-r from-[#061E18] via-[#0A382E] to-[#0F4E40] text-white flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-2">
                <i className="ri-add-circle-fill text-[#C8E86B] text-lg"></i>
                <strong className="text-[13px] text-white">Form Pengajuan PO Belanja</strong>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-base cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form
              onSubmit={handleCreateSubmit}
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
              className="p-3.5 space-y-3 text-[11px]"
            >
              <div>
                <label className="block font-bold text-[#17211E] mb-1">
                  Nama Kebutuhan / Barang <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Pupuk Hayati NPK Organik & Trichoderma"
                  className="w-full px-3 py-2 rounded-[8px] border border-[#DDE5DF] text-[11px] bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#17211E] mb-1">Kategori Belanja</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-[8px] border border-[#DDE5DF] text-[11px] bg-white font-bold text-[#0F5545]"
                  >
                    <option value="Pupuk">Pupuk & Nutrisi</option>
                    <option value="Bibit">Benih & Bibit Unggul</option>
                    <option value="Saprotan">Saprotan & Mulsa</option>
                    <option value="Infrastruktur">Infrastruktur & Irigasi</option>
                    <option value="Alsintan">Alsintan & Mesin</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#17211E] mb-1">
                    Estimasi Biaya (Rp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="Contoh: 15000000"
                    className="w-full px-3 py-2 rounded-[8px] border border-[#DDE5DF] text-[11px] bg-white font-black text-[#0B3B30]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#17211E] mb-1">Vendor / Toko</label>
                  <input
                    type="text"
                    value={newVendor}
                    onChange={(e) => setNewVendor(e.target.value)}
                    placeholder="Contoh: PT Agro Tani Makmur"
                    className="w-full px-3 py-2 rounded-[8px] border border-[#DDE5DF] text-[11px] bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#17211E] mb-1">No. Penawaran / Invoice</label>
                  <input
                    type="text"
                    value={newInvoice}
                    onChange={(e) => setNewInvoice(e.target.value)}
                    placeholder="Contoh: INV-ATM-2026"
                    className="w-full px-3 py-2 rounded-[8px] border border-[#DDE5DF] text-[11px] bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#17211E] mb-1">Justifikasi Kebutuhan & Target Blok</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  rows={3}
                  placeholder="Jelaskan tujuan penggunaan barang dan alokasi blok perkebunan..."
                  className="w-full px-3 py-2 rounded-[8px] border border-[#DDE5DF] text-[11px] bg-white"
                ></textarea>
              </div>

              <div className="p-2.5 rounded-[10px] bg-[#E8F1EA] text-[#0F5545] text-[10px] flex items-center gap-2">
                <i className="ri-information-line text-base shrink-0"></i>
                <span>PO akan otomatis diteruskan ke Tim Finance untuk validasi faktur, kemudian Direktur & Investor.</span>
              </div>

              {/* Submit Buttons */}
              <div
                style={{
                  paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
                }}
                className="pt-2 flex gap-2"
              >
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 border border-[#DDE5DF] text-[#52615A] font-bold rounded-[10px] cursor-pointer hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-2.5 bg-[#0F5545] text-white font-black rounded-[10px] cursor-pointer hover:bg-[#0B3B30] shadow-xs flex items-center justify-center gap-1.5"
                >
                  <i className="ri-send-plane-fill text-[#C8E86B]"></i>
                  <span>Kirimkan Pengajuan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIRMATION / REJECT DIALOG */}
      {/* ========================================================================= */}
      {confirmDialog && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-[380px] bg-white rounded-[20px] p-4 text-[#17211E] shadow-2xl border border-[#DDE5DF] space-y-3 animate-in zoom-in-95">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg ${
                confirmDialog.action === 'APPROVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                <i className={confirmDialog.action === 'APPROVE' ? 'ri-shield-check-fill' : 'ri-error-warning-fill'}></i>
              </div>
              <div>
                <strong className="text-[13px] block">
                  {confirmDialog.action === 'APPROVE' ? 'Konfirmasi Persetujuan PO' : 'Konfirmasi Penolakan PO'}
                </strong>
                <span className="text-[10px] text-[#52615A]">{confirmDialog.po.id} • {confirmDialog.po.title}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#52615A] m-0">
              {confirmDialog.action === 'APPROVE'
                ? `Apakah Anda yakin ingin menyetujui pengeluaran modal sebesar Rp ${confirmDialog.po.amount.toLocaleString('id-ID')}?`
                : 'Silakan cantumkan alasan penolakan untuk dikembalikan ke tim pengaju:'}
            </p>

            {confirmDialog.action === 'REJECT' && (
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Tuliskan catatan perbaikan atau alasan penolakan..."
                rows={2}
                className="w-full p-2 rounded-[8px] border border-[#DDE5DF] text-[11px]"
              />
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setConfirmDialog(null);
                  setRejectReason('');
                }}
                className="flex-1 py-2 border border-[#DDE5DF] text-[#52615A] font-bold text-[11px] rounded-[10px] cursor-pointer hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleExecuteApproval}
                className={`flex-1 py-2 text-white font-black text-[11px] rounded-[10px] cursor-pointer shadow-xs ${
                  confirmDialog.action === 'APPROVE'
                    ? 'bg-[#0F5545] hover:bg-[#0B3B30]'
                    : 'bg-[#B91C1C] hover:bg-red-800'
                }`}
              >
                {confirmDialog.action === 'APPROVE' ? 'Ya, Sahkan' : 'Ya, Tolak'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
