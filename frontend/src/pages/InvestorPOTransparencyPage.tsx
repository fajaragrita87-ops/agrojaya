import React, { useState, useEffect } from 'react';
import { useRole } from '../context/RoleContext';
import { getPurchases, createPurchase, updatePurchaseStatus } from '../services/api';
import type { PurchaseItem } from '../components/PurchaseOrderInventoryShowcase';

export const InvestorPOTransparencyPage: React.FC = () => {
  const { role } = useRole();
  const [poList, setPoList] = useState<PurchaseItem[]>([]);

  // Form State for Manager Operasional
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('PUPUK & KAPUR');
  const [targetLand, setTargetLand] = useState('Blok A2 - Tanam Hibrida Utama (2.0 Ha Jonggol)');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [usageTargetDate, setUsageTargetDate] = useState('');
  const [usageDetails, setUsageDetails] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchPOs = async () => {
    try {
      const res = await getPurchases();
      setPoList(res.data);
    } catch (error) {
      console.error('Failed to load POs', error);
    }
  };

  useEffect(() => {
    fetchPOs();
    const handleSync = () => fetchPOs();
    window.addEventListener('agrojaya-po-updated', handleSync);
    return () => window.removeEventListener('agrojaya-po-updated', handleSync);
  }, []);

  const calculatedTotal = Number(unitPrice || 0) * (parseFloat(quantity) || 1);

  // 1. Manager Action: Create PO
  const handleCreatePO = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !quantity || !unitPrice) return;

    const poNumber = `PO-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(10 + Math.random() * 90)}`;

    try {
      await createPurchase({
        itemName,
        category,
        targetLand,
        quantity,
        unitPriceRp: Number(unitPrice),
        totalPrice: calculatedTotal,
        usageTargetDate: usageTargetDate || 'Segera (Minggu Ini)',
        usageDetails: usageDetails || 'Pengadaan operasional rutin budidaya',
        poNumber,
      });

      setItemName('');
      setQuantity('');
      setUnitPrice('');
      setUsageDetails('');
      setShowAddForm(false);
      alert(`Pengajuan ${poNumber} (${itemName}) berhasil dikirim ke Tim Finance (Layer 1)!`);
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch (error) {
      alert('Gagal membuat pengajuan PO');
    }
  };

  // 2. Finance Action: Verify Layer 1
  const handleFinanceVerify = async (id: string, poNum: string) => {
    try {
      await updatePurchaseStatus(id, { status: 'PENDING_DIREKTUR' });
      alert(`PO ${poNum} berhasil diverifikasi Finance (Layer 1) & diteruskan ke Direktur!`);
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch {
      alert('Gagal memverifikasi PO');
    }
  };

  // 3. Direktur Action: Authorize Layer 2
  const handleDirekturApprove = async (id: string, poNum: string) => {
    try {
      await updatePurchaseStatus(id, { status: 'PENDING_INVESTOR' });
      alert(`PO ${poNum} berhasil diotorisasi Direktur (Layer 2) & diteruskan ke Investor!`);
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch {
      alert('Gagal mengotorisasi PO');
    }
  };

  // 4. Investor Action: Approve Layer 3
  const handleInvestorApprove = async (id: string, poNum: string) => {
    try {
      await updatePurchaseStatus(id, { status: 'APPROVED_WAITING_DISBURSEMENT' });
      alert(`PO ${poNum} berhasil disetujui Investor (Layer 3) & siap dicairkan Finance!`);
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch {
      alert('Gagal menyetujui PO');
    }
  };

  // 5. Finance Action: Disburse Funds
  const handleDisburseFunds = async (id: string, poNum: string) => {
    try {
      await updatePurchaseStatus(id, { status: 'DISBURSED' });
      alert(`Dana kas untuk PO ${poNum} berhasil dicairkan!`);
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch {
      alert('Gagal mencairkan dana');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Filtered lists per role
  const pendingFinancePOs = poList.filter((p) => p.status === 'PENDING_FINANCE');
  const pendingDirekturPOs = poList.filter((p) => p.status === 'PENDING_DIREKTUR');
  const pendingInvestorPOs = poList.filter((p) => p.status === 'PENDING_INVESTOR');
  const readyToDisbursePOs = poList.filter((p) => p.status === 'APPROVED_WAITING_DISBURSEMENT');

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner - Contextual per Role */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-primary-subtle text-primary border border-primary px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            {role === 'MANAGER' && '👔 OTORISASI: PENGAJU PENGADAAN BARANG (MANAJER OPS)'}
            {role === 'FINANCE' && '💵 OTORISASI: VERIFIKASI ANGGARAN (LAYER 1) & KASIR'}
            {role === 'DIREKTUR' && '👑 OTORISASI: OTORISASI DIREKSI KORPORASI (LAYER 2)'}
            {role === 'INVESTOR' && '💼 OTORISASI: PERSETUJUAN ALOKASI MODAL INVESTOR (LAYER 3)'}
          </span>
          <h2 className="page-header-title font-weight-bold text-dark mb-0" style={{ fontSize: 20 }}>
            {role === 'MANAGER' && 'Pengajuan Purchase Order (PO) & Belanja Kebun'}
            {role === 'FINANCE' && 'Verifikasi Anggaran PO (Layer 1) & Pencairan Dana'}
            {role === 'DIREKTUR' && 'Otorisasi Belanja Operasional Direktur (Layer 2)'}
            {role === 'INVESTOR' && 'Transparansi Belanja Modal & Persetujuan Investor (Layer 3)'}
          </h2>
          <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
            Alur verifikasi 3-level berjenjang: Manajer Ops (Pengaju) ➔ Finance (Layer 1) ➔ Direktur (Layer 2) ➔ Investor (Layer 3) ➔ Kasir
          </p>
        </div>

        {role === 'MANAGER' && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-success text-white font-weight-bold px-3.5 py-2 rounded-3 shadow-xs d-inline-flex align-items-center gap-1.5"
            style={{ fontSize: 12.5 }}
          >
            <i className={showAddForm ? 'ri-close-line' : 'ri-add-line'}></i>
            <span>{showAddForm ? 'Tutup Formulir' : '+ Buat Pengajuan PO Baru'}</span>
          </button>
        )}
      </div>

      {/* 1. KHUSUS MANAJER OPERASIONAL: FORM PENGAJUAN PO BARU */}
      {role === 'MANAGER' && showAddForm && (
        <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
          <div className="pb-2 border-bottom">
            <h4 className="font-weight-bold text-dark m-0 !text-sm">
              <i className="ri-file-add-line text-success me-1.5"></i> Formulir Pengajuan Pembelian Barang (PO Baru)
            </h4>
            <span className="text-muted" style={{ fontSize: 12 }}>
              Diisi oleh Manajer Operasional untuk diajukan ke Tim Finance
            </span>
          </div>

          <form onSubmit={handleCreatePO} className="p-3.5 bg-light rounded-3 border space-y-3">
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Nama Barang / Material <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="misal: 1.000 Kg Pupuk NPK Granul 16-16-16"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="form-control p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                  required
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Kategori Pengadaan
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                >
                  <option value="PUPUK & KAPUR">Pupuk & Kapur Dolomit</option>
                  <option value="BIBIT TANAMAN">Bibit Tanaman Unggul</option>
                  <option value="PESTISIDA">Biopestisida</option>
                  <option value="BBM SOLAR">BBM Solar Traktor</option>
                  <option value="PERALATAN">Peralatan & Sparepart</option>
                </select>
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Target Lahan Kebun
                </label>
                <select
                  value={targetLand}
                  onChange={(e) => setTargetLand(e.target.value)}
                  className="form-select p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                >
                  <option value="Blok A1 - Greenhouse Anggur (1000m²)">Blok A1 - Greenhouse Anggur</option>
                  <option value="Blok A2 - Tanam Hibrida Utama (2.0 Ha)">Blok A2 - Porang Utama (2.0 Ha)</option>
                  <option value="Blok B1 - Hortikultura Melon (5000m²)">Blok B1 - Melon Intanon</option>
                </select>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Jumlah / Volume <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="misal: 1000 Kg / 50 Batang"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Estimasi Harga Satuan (Rp) <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  placeholder="14000"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  className="form-control p-2.5 bg-white border rounded-3 text-dark font-weight-bold"
                  style={{ fontSize: 13 }}
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Target Tanggal Pemakaian
                </label>
                <input
                  type="text"
                  placeholder="misal: 15 Sep 2026"
                  value={usageTargetDate}
                  onChange={(e) => setUsageTargetDate(e.target.value)}
                  className="form-control p-2.5 bg-white border rounded-3 text-dark"
                  style={{ fontSize: 13 }}
                />
              </div>

              <div className="col-12">
                <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                  Rincian Kebutuhan & Alasan Pengadaan
                </label>
                <textarea
                  placeholder="Jelaskan tujuan pemakaian barang ini di kebun..."
                  value={usageDetails}
                  onChange={(e) => setUsageDetails(e.target.value)}
                  className="form-control p-2.5 bg-white border rounded-3 text-dark"
                  rows={2}
                  style={{ fontSize: 12.5 }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-2 border-top">
              <div>
                <span className="text-muted" style={{ fontSize: 12 }}>Total Anggaran Diajukan: </span>
                <strong className="text-success font-weight-extrabold" style={{ fontSize: 16 }}>
                  Rp {calculatedTotal.toLocaleString('id-ID')}
                </strong>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-light border font-weight-bold px-3 py-2 rounded-3"
                  style={{ fontSize: 12.5 }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn-success text-white font-weight-bold px-4 py-2 rounded-3 shadow-xs d-flex align-items-center gap-1.5"
                  style={{ fontSize: 12.5 }}
                >
                  <i className="ri-send-plane-fill"></i>
                  <span>Kirim Pengajuan ke Finance (Layer 1)</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 2. KHUSUS FINANCE: CARD APPROVAL LAYER 1 & PENCAIRAN DANA */}
      {role === 'FINANCE' && (
        <div className="space-y-4">
          {/* Layer 1 Approval Pending */}
          <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <div>
                <h4 className="font-weight-bold text-dark m-0 !text-sm">
                  <i className="ri-shield-check-line text-primary me-1.5"></i> Berkas Menunggu Verifikasi Anggaran (Layer 1)
                </h4>
                <span className="text-muted" style={{ fontSize: 12 }}>Periksa kelayakan harga & ketersediaan dana sebelum diteruskan ke Direktur</span>
              </div>
              <span className="badge bg-primary text-white font-weight-bold px-2.5 py-1 rounded-pill" style={{ fontSize: 11 }}>
                {pendingFinancePOs.length} Menunggu Verifikasi
              </span>
            </div>

            {pendingFinancePOs.length === 0 ? (
              <div className="p-3 bg-light rounded-3 text-muted text-center" style={{ fontSize: 12.5 }}>
                Tidak ada pengajuan PO yang menunggu verifikasi Finance saat ini.
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingFinancePOs.map((po) => (
                  <div key={po.id} className="p-3.5 rounded-3 border bg-light d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="badge bg-dark text-white font-mono">{po.poNumber}</span>
                        <span className="badge bg-light text-dark border font-weight-bold">{po.category}</span>
                      </div>
                      <strong className="text-dark d-block" style={{ fontSize: 13.5 }}>{po.itemName}</strong>
                      <span className="text-secondary" style={{ fontSize: 12 }}>📍 {po.targetLand} • Pemohon: {po.createdBy?.name || 'Manajer Ops'}</span>
                    </div>

                    <div className="text-end d-flex flex-column align-items-md-end gap-1.5">
                      <strong className="text-dark font-weight-bold" style={{ fontSize: 16 }}>Rp {po.totalPrice?.toLocaleString('id-ID')}</strong>
                      <button
                        onClick={() => handleFinanceVerify(po.id, po.poNumber)}
                        className="btn btn-sm btn-primary text-white font-weight-bold px-3 py-1.5 rounded-2 d-flex align-items-center gap-1 shadow-xs"
                        style={{ fontSize: 11.5 }}
                      >
                        <i className="ri-check-line"></i>
                        <span>Verifikasi & Teruskan ke Direktur</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Disbursement Pending */}
          <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <div>
                <h4 className="font-weight-bold text-dark m-0 !text-sm">
                  <i className="ri-money-dollar-circle-line text-success me-1.5"></i> Berkas Telah Disetujui Investor (Siap Cairkan Dana)
                </h4>
                <span className="text-muted" style={{ fontSize: 12 }}>Pencairan kas operasional ke vendor / manajer lapangan</span>
              </div>
              <span className="badge bg-success text-white font-weight-bold px-2.5 py-1 rounded-pill" style={{ fontSize: 11 }}>
                {readyToDisbursePOs.length} Siap Cair
              </span>
            </div>

            {readyToDisbursePOs.length === 0 ? (
              <div className="p-3 bg-light rounded-3 text-muted text-center" style={{ fontSize: 12.5 }}>
                Tidak ada PO yang menunggu pencairan dana saat ini.
              </div>
            ) : (
              <div className="space-y-2.5">
                {readyToDisbursePOs.map((po) => (
                  <div key={po.id} className="p-3.5 rounded-3 border border-success bg-success-subtle d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="badge bg-dark text-white font-mono">{po.poNumber}</span>
                        <span className="badge bg-success text-white font-weight-bold" style={{ fontSize: 10 }}>DISETUJUI INVESTOR</span>
                      </div>
                      <strong className="text-dark d-block" style={{ fontSize: 13.5 }}>{po.itemName}</strong>
                      <span className="text-secondary" style={{ fontSize: 12 }}>📍 {po.targetLand}</span>
                    </div>

                    <div className="text-end d-flex flex-column align-items-md-end gap-1.5">
                      <strong className="text-success font-weight-extrabold" style={{ fontSize: 16 }}>Rp {po.totalPrice?.toLocaleString('id-ID')}</strong>
                      <button
                        onClick={() => handleDisburseFunds(po.id, po.poNumber)}
                        className="btn btn-sm btn-success text-white font-weight-bold px-3 py-1.5 rounded-2 d-flex align-items-center gap-1 shadow-xs"
                        style={{ fontSize: 11.5 }}
                      >
                        <i className="ri-wallet-3-line"></i>
                        <span>Cairkan Dana Kas</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. KHUSUS DIREKTUR: CARD OTORISASI LAYER 2 */}
      {role === 'DIREKTUR' && (
        <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
          <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
            <div>
              <h4 className="font-weight-bold text-dark m-0 !text-sm">
                <i className="ri-shield-user-line text-warning me-1.5"></i> Berkas Menunggu Otorisasi Direksi (Layer 2)
              </h4>
              <span className="text-muted" style={{ fontSize: 12 }}>Telah diverifikasi oleh Finance. Butuh otorisasi Direktur sebelum diteruskan ke Investor</span>
            </div>
            <span className="badge bg-warning text-dark font-weight-bold px-2.5 py-1 rounded-pill" style={{ fontSize: 11 }}>
              {pendingDirekturPOs.length} Menunggu Otorisasi
            </span>
          </div>

          {pendingDirekturPOs.length === 0 ? (
            <div className="p-3 bg-light rounded-3 text-muted text-center" style={{ fontSize: 12.5 }}>
              Tidak ada pengajuan PO yang membutuhkan otorisasi Direktur saat ini.
            </div>
          ) : (
            <div className="space-y-2.5">
              {pendingDirekturPOs.map((po) => (
                <div key={po.id} className="p-3.5 rounded-3 border bg-light d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="badge bg-dark text-white font-mono">{po.poNumber}</span>
                      <span className="badge bg-light text-dark border font-weight-bold">{po.category}</span>
                      <span className="badge bg-info-subtle text-info border border-info font-weight-bold" style={{ fontSize: 10 }}>VERIFIED FINANCE</span>
                    </div>
                    <strong className="text-dark d-block" style={{ fontSize: 13.5 }}>{po.itemName}</strong>
                    <span className="text-secondary" style={{ fontSize: 12 }}>📍 {po.targetLand} • Alasan: {po.usageDetails}</span>
                  </div>

                  <div className="text-end d-flex flex-column align-items-md-end gap-1.5">
                    <strong className="text-dark font-weight-bold" style={{ fontSize: 16 }}>Rp {po.totalPrice?.toLocaleString('id-ID')}</strong>
                    <button
                      onClick={() => handleDirekturApprove(po.id, po.poNumber)}
                      className="btn btn-sm btn-warning text-dark font-weight-bold px-3 py-1.5 rounded-2 d-flex align-items-center gap-1 shadow-xs"
                      style={{ fontSize: 11.5 }}
                    >
                      <i className="ri-check-double-line"></i>
                      <span>Otorisasi & Teruskan ke Investor</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. KHUSUS INVESTOR: CARD PERSETUJUAN LAYER 3 */}
      {role === 'INVESTOR' && (
        <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
          <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
            <div>
              <h4 className="font-weight-bold text-dark m-0 !text-sm">
                <i className="ri-funds-box-line text-success me-1.5"></i> Pengajuan Belanja Modal Menunggu Persetujuan Investor (Layer 3)
              </h4>
              <span className="text-muted" style={{ fontSize: 12 }}>Telah diverifikasi oleh Finance & diotorisasi Direktur</span>
            </div>
            <span className={`badge px-2.5 py-1 font-weight-bold rounded-pill ${pendingInvestorPOs.length > 0 ? 'bg-warning text-dark' : 'bg-success text-white'}`} style={{ fontSize: 11 }}>
              {pendingInvestorPOs.length} Menunggu Persetujuan
            </span>
          </div>

          {pendingInvestorPOs.length === 0 ? (
            <div className="p-3 bg-success-subtle text-success rounded-3 border border-success d-flex align-items-center gap-2">
              <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: 18 }}></i>
              <span className="font-weight-bold" style={{ fontSize: 12.5 }}>Semua pengajuan belanja telah disetujui. Tidak ada berkas tertunda.</span>
            </div>
          ) : (
            <div className="space-y-2.5">
              {pendingInvestorPOs.map((po) => (
                <div key={po.id} className="p-3.5 rounded-3 border border-success bg-light d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="badge bg-dark text-white font-mono">{po.poNumber}</span>
                      <span className="badge bg-light text-dark border font-weight-bold">{po.category}</span>
                      <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 10 }}>VERIFIED FINANCE & DIREKTUR</span>
                    </div>
                    <strong className="text-dark d-block" style={{ fontSize: 13.5 }}>{po.itemName}</strong>
                    <span className="text-secondary" style={{ fontSize: 12 }}>📍 {po.targetLand} • Pemohon: {po.createdBy?.name || 'Manajer Ops'}</span>
                  </div>

                  <div className="text-end d-flex flex-column align-items-md-end gap-1.5">
                    <strong className="text-success font-weight-extrabold" style={{ fontSize: 16 }}>Rp {po.totalPrice?.toLocaleString('id-ID')}</strong>
                    <button
                      onClick={() => handleInvestorApprove(po.id, po.poNumber)}
                      className="btn btn-sm btn-success text-white font-weight-bold px-3.5 py-1.5 rounded-2 d-flex align-items-center gap-1 shadow-xs"
                      style={{ fontSize: 12 }}
                    >
                      <i className="ri-check-line"></i>
                      <span>Setujui Alokasi Modal</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TABEL UNIVERSAL: TRACKING SELURUH PO & STATUS ALUR PERSETUJUAN */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <div>
            <h4 className="font-weight-bold text-dark m-0 !text-sm">
              <i className="ri-history-line text-secondary me-1.5"></i> Status & Riwayat Seluruh Purchase Order (PO)
            </h4>
            <span className="text-muted" style={{ fontSize: 12 }}>
              Pemantauan status alur persetujuan dari pengajuan hingga pencairan kas
            </span>
          </div>
          <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
            Total {poList.length} Berkas
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 12.5 }}>
            <thead className="table-light">
              <tr style={{ fontSize: 11.5 }}>
                <th>NO. PO</th>
                <th>BARANG / MATERIAL</th>
                <th>LOKASI BLOK</th>
                <th>TOTAL ANGGARAN</th>
                <th>TANGGAL PENGAJUAN</th>
                <th className="text-end">STATUS PERSETUJUAN</th>
              </tr>
            </thead>
            <tbody>
              {poList.map((po) => {
                let badgeClass = 'bg-secondary text-white';
                let statusLabel: string = po.status;
                if (po.status === 'PENDING_FINANCE') {
                  badgeClass = 'bg-primary-subtle text-primary border border-primary';
                  statusLabel = '1. REVIEW FINANCE';
                } else if (po.status === 'PENDING_DIREKTUR') {
                  badgeClass = 'bg-warning-subtle text-warning-emphasis border border-warning';
                  statusLabel = '2. OTORISASI DIREKTUR';
                } else if (po.status === 'PENDING_INVESTOR') {
                  badgeClass = 'bg-info-subtle text-info border border-info';
                  statusLabel = '3. REVIEW INVESTOR';
                } else if (po.status === 'APPROVED_WAITING_DISBURSEMENT') {
                  badgeClass = 'bg-success-subtle text-success border border-success';
                  statusLabel = '4. SIAP CAIR (KAS)';
                } else if (po.status === 'DISBURSED') {
                  badgeClass = 'bg-success text-white';
                  statusLabel = '✅ DANA CAIR';
                }

                return (
                  <tr key={po.id}>
                    <td><span className="badge bg-light text-dark border font-mono">{po.poNumber}</span></td>
                    <td>
                      <strong className="text-dark d-block">{po.itemName}</strong>
                      <span className="text-muted" style={{ fontSize: 11 }}>Kategori: {po.category}</span>
                    </td>
                    <td className="text-secondary">{po.targetLand}</td>
                    <td className="font-weight-bold text-dark">Rp {po.totalPrice?.toLocaleString('id-ID')}</td>
                    <td className="text-muted font-mono">{formatDate(po.createdAt)}</td>
                    <td className="text-end">
                      <span className={`badge px-2.5 py-1 rounded-pill font-weight-bold ${badgeClass}`} style={{ fontSize: 10.5 }}>
                        {statusLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
