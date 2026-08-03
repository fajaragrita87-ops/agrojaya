import React, { useState, useEffect } from 'react';
import { useRole } from '../context/RoleContext';
import { getPurchases, createPurchase, updatePurchaseStatus } from '../services/api';

export type POStatus = 
  | 'PENDING_FINANCE'                
  | 'PENDING_DIREKTUR'               
  | 'PENDING_INVESTOR'               
  | 'APPROVED_WAITING_DISBURSEMENT'  
  | 'DISBURSED'                      
  | 'REJECTED';                      

export interface PurchaseItem {
  id: string;
  poNumber: string;
  itemName: string;
  category: string;
  targetLand: string;
  quantity: string;
  unitPriceRp: number;
  totalPrice: number;
  usageTargetDate: string;
  createdById?: string;
  createdAt?: string;
  usageDetails: string;
  status: POStatus;
  financeVerifiedAt?: string;
  direkturApprovedAt?: string;
  investorApprovedAt?: string;
  disbursedAt?: string;
  rejectionNote?: string;
  voucherNo?: string;
  createdBy?: { name: string };
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stockQty: string;
  minStock: string;
  status: 'CUKUP' | 'REORDER_NOW' | 'HAMPIR_HABIS';
}

// Kept for backward compatibility if needed by other components momentarily, but better to remove later
export const INITIAL_MOCK_PO_LIST: PurchaseItem[] = [];

export const PurchaseOrderInventoryShowcase: React.FC = () => {
  const { role, canCreatePO } = useRole();

  const [inventoryList] = useState<InventoryItem[]>([
    { id: '1', name: 'Pupuk NPK Granul 16-16-16', category: 'PUPUK', stockQty: '12.5 Ton', minStock: '15.0 Ton', status: 'REORDER_NOW' },
    { id: '2', name: 'Bibit Anggur Impor Shine Muscat', category: 'BIBIT', stockQty: '350 Batang', minStock: '500 Batang', status: 'HAMPIR_HABIS' },
    { id: '3', name: 'Kapur Dolomit Kebun', category: 'PUPUK', stockQty: '8.0 Ton', minStock: '5.0 Ton', status: 'CUKUP' },
    { id: '4', name: 'BBM Solar Industri B35 Traktor', category: 'OPERASIONAL', stockQty: '1,200 Liter', minStock: '2,000 Liter', status: 'HAMPIR_HABIS' },
    { id: '5', name: 'Traktor & Cultivator Kubota', category: 'PERALATAN', stockQty: '3 Unit', minStock: '2 Unit', status: 'CUKUP' },
  ]);

  const [poList, setPoList] = useState<PurchaseItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPOs = async () => {
    try {
      setLoading(true);
      const res = await getPurchases();
      setPoList(res.data);
    } catch (error) {
      console.error('Failed to load POs', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPOs();
    const handleSync = () => fetchPOs();
    window.addEventListener('agrojaya-po-updated', handleSync);
    return () => window.removeEventListener('agrojaya-po-updated', handleSync);
  }, []);

  // Form State for Manager Operasional
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('PUPUK & KAPUR');
  const [targetLand, setTargetLand] = useState('Blok A2 - Tanam Hibrida Utama (2.0 Ha Jonggol)');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [usageTargetDate, setUsageTargetDate] = useState('');
  const [usageDetails, setUsageDetails] = useState('');

  const calculatedTotal = Number(unitPrice || 0) * (parseFloat(quantity) || 1);

  const handleCreatePO = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCreatePO) return;

    const poNumber = `PO-${new Date().getFullYear()}-${new Date().getMonth()+1}${new Date().getDate()}-${Math.floor(Math.random() * 100)}`;
    
    try {
      await createPurchase({
        itemName,
        category,
        targetLand,
        quantity: parseFloat(quantity),
        unitPriceRp: Number(unitPrice),
        totalPrice: calculatedTotal,
        usageTargetDate: usageTargetDate || '15 Aug 2026',
        usageDetails,
        poNumber,
        createdById: 'manager-ops-123' // placeholder ID
      });
      
      setItemName('');
      setQuantity('');
      setUnitPrice('');
      setUsageTargetDate('');
      setUsageDetails('');
      alert(`Pengajuan PO ${poNumber} Berhasil Dikirimkan ke Finance (Layer 1 Verifikasi)!`);
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch (error) {
      alert('Gagal membuat PO');
      console.error(error);
    }
  };

  // Workflow Handlers
  const handleFinanceVerify = async (id: string) => {
    try {
      await updatePurchaseStatus(id, { status: 'PENDING_DIREKTUR' });
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch (error) {
      alert('Gagal verifikasi layer 1');
    }
  };

  const handleDirekturApprove = async (id: string) => {
    try {
      await updatePurchaseStatus(id, { status: 'PENDING_INVESTOR' });
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch (error) {
      alert('Gagal otorisasi layer 2');
    }
  };

  const handleInvestorApprove = async (id: string) => {
    try {
      await updatePurchaseStatus(id, { status: 'APPROVED_WAITING_DISBURSEMENT' });
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch (error) {
      alert('Gagal persetujuan layer 3');
    }
  };

  const handleFinanceDisburse = async (id: string) => {
    const voucherNo = `VCH-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      await updatePurchaseStatus(id, { status: 'DISBURSED', voucherNo });
      alert(`Dana PO Berhasil Dicairkan oleh Finance! Voucher Kas Terbit: ${voucherNo}`);
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch (error) {
      alert('Gagal pencairan');
    }
  };

  const handleRejectPO = async (id: string, layerName: string) => {
    const reason = prompt(`Masukkan alasan penolakan PO (${layerName}):`);
    if (!reason) return;
    try {
      await updatePurchaseStatus(id, { status: 'REJECTED', rejectionNote: `Ditolak pada ${layerName}: ${reason}` });
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch (error) {
      alert('Gagal menolak PO');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
  };

  return (
    <div className="w-100 space-y-4">
      {/* Module Title & Workflow Overview */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-git-commit-line me-1"></i> WORKFLOW PO 3-LAYER PERSERTUJUAN & PENCAIRAN
          </span>
          <h2 className="font-weight-bold text-dark mb-1 !text-base">Pengajuan PO Ops & Workflow Persetujuan 3 Layer</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Pengajuan (Manajer Ops) ➔ Layer 1: Finance ➔ Layer 2: Direktur ➔ Layer 3: Investor ➔ Pencairan (Finance)
          </p>
        </div>
        <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
          <i className="ri-shield-check-line"></i> Akses Peran: {role}
        </span>
      </div>



      {/* Grid 2 Column: Inventory Stock & Complete PO Form */}
      <div className="row g-4">
        {/* Inventory Stock Monitor */}
        <div className="col-12 col-xl-6">
          <div className="bg-white p-4 rounded-4 border shadow-sm h-100 space-y-3">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2 !text-sm">
                <i className="ri-archive-line text-success"></i> Kolom Stok Inventaris & Peringatan Reorder
              </h4>
              <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>Real-Time Inventory</span>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
                <thead className="table-light">
                  <tr>
                    <th>Nama Material / Alat</th>
                    <th>Kategori</th>
                    <th>Stok Saat Ini</th>
                    <th>Batas Min</th>
                    <th>Status Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryList.map((item) => (
                    <tr key={item.id}>
                      <td className="font-weight-bold text-dark">{item.name}</td>
                      <td><span className="badge bg-light text-dark border">{item.category}</span></td>
                      <td className="font-weight-bold text-success">{item.stockQty}</td>
                      <td className="text-secondary">{item.minStock}</td>
                      <td>
                        {item.status === 'REORDER_NOW' && (
                          <span className="badge bg-danger text-white font-weight-bold" style={{ fontSize: 10 }}>REORDER SEGERA</span>
                        )}
                        {item.status === 'HAMPIR_HABIS' && (
                          <span className="badge bg-warning text-dark font-weight-bold" style={{ fontSize: 10 }}>HAMPIR HABIS</span>
                        )}
                        {item.status === 'CUKUP' && (
                          <span className="badge bg-success text-white font-weight-bold" style={{ fontSize: 10 }}>STOK CUKUP</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Complete PO Form (Manager Operasional Exclusive) */}
        <div className="col-12 col-xl-6">
          <div className="bg-white p-4 rounded-4 border shadow-sm h-100 space-y-3">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2 !text-sm">
                <i className="ri-file-add-line text-success"></i> Form Pengajuan PO Lengkap (Manajer Operasional)
              </h4>
              <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 10 }}>
                {canCreatePO ? 'Akses Pengajuan Aktif' : `Mode ${role} (Read-Only)`}
              </span>
            </div>

            {canCreatePO ? (
              <form onSubmit={handleCreatePO} className="space-y-3 pt-1">
                <div>
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Nama Material / Barang PO:</label>
                  <input
                    type="text"
                    placeholder="misal: 10 Ton Pupuk NPK Granul 16-16-16"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="form-control p-2.5 bg-light border-0 rounded-3"
                    style={{ fontSize: 13 }}
                    required
                  />
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Kategori Pengadaan:</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-select p-2.5 bg-light border-0 rounded-3 font-weight-bold"
                      style={{ fontSize: 13 }}
                    >
                      <option value="PUPUK & KAPUR">PUPUK & KAPUR</option>
                      <option value="BIBIT UNGGUL">BIBIT UNGGUL</option>
                      <option value="PERALATAN & SPAREPART">PERALATAN & SPAREPART</option>
                      <option value="LOGISTIK & BBM SOLAR">LOGISTIK & BBM SOLAR</option>
                      <option value="PEKERJA & KONTRAK">PEKERJA & KONTRAK</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Target Blok Lahan:</label>
                    <select
                      value={targetLand}
                      onChange={(e) => setTargetLand(e.target.value)}
                      className="form-select p-2.5 bg-light border-0 rounded-3 font-weight-bold"
                      style={{ fontSize: 13 }}
                    >
                      <option value="Blok A1 - Kebun Anggur Impor (1.000m² Jonggol)">Blok A1 - Anggur Impor (1000m²)</option>
                      <option value="Blok A2 - Tanam Hibrida Utama (2.0 Ha Jonggol)">Blok A2 - Tanam Hibrida (2.0 Ha)</option>
                      <option value="Blok B1 - Melon Premium (5.000m² Jonggol)">Blok B1 - Melon Premium (5000m²)</option>
                      <option value="Fasilitas Workshop & Machine Yard Jonggol">Fasilitas Workshop & Mesin</option>
                    </select>
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-4">
                    <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Kuantitas Qty:</label>
                    <input
                      type="text"
                      placeholder="misal: 5 Ton"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="form-control p-2.5 bg-light border-0 rounded-3"
                      style={{ fontSize: 13 }}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Harga Satuan (Rp):</label>
                    <input
                      type="number"
                      placeholder="5600000"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                      className="form-control p-2.5 bg-light border-0 rounded-3 font-weight-bold"
                      style={{ fontSize: 13 }}
                      required
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Target Tgl Pakai:</label>
                    <input
                      type="date"
                      value={usageTargetDate}
                      onChange={(e) => setUsageTargetDate(e.target.value)}
                      className="form-control p-2.5 bg-light border-0 rounded-3"
                      style={{ fontSize: 13 }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-light rounded-3 border d-flex justify-content-between align-items-center">
                  <span className="text-uppercase text-muted font-weight-bold" style={{ fontSize: 11 }}>Total Estimasi Anggaran OPEX:</span>
                  <strong className="h5 font-weight-extrabold text-danger m-0 !text-sm">
                    Rp {calculatedTotal.toLocaleString('id-ID')}
                  </strong>
                </div>

                <div>
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Tujuan & Rencana Estimasi Penggunaan Detail (Agronomi/Teknis):</label>
                  <textarea
                    rows={2}
                    placeholder="Rincian teknis penggunaan material di lahan, dosis per titik, & estimasi efisiensi panen..."
                    value={usageDetails}
                    onChange={(e) => setUsageDetails(e.target.value)}
                    className="form-control p-2.5 bg-light border-0 rounded-3"
                    style={{ fontSize: 13 }}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="tmp-btn bg-success text-white font-weight-bold p-2.5 w-100 rounded-3 border-0 shadow-xs" style={{ fontSize: 13 }}>
                  <i className="ri-send-plane-fill me-1"></i> Kirim Pengajuan PO Ke Finance (Layer 1)
                </button>
              </form>
            ) : (
              <div className="p-4 bg-light rounded-3 text-center text-muted font-weight-bold" style={{ fontSize: 13 }}>
                <i className="ri-lock-line h4 d-block text-secondary mb-1"></i>
                Pengajuan PO Baru Khusus Diisi Oleh <strong>Manajer Operasional</strong>. Peran Anda ({role}) berfokus pada tahapan verifikasi/otorisasi layer.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main PO Approval & Disbursal Table Log */}
      <div className="bg-white p-4 rounded-4 border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2 !text-sm">
            <i className="ri-file-list-3-line text-success"></i> Log Pengajuan PO & Status Persetujuan 3 Layer
          </h4>
          <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
            Total Tiket PO: {poList.length}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr>
                <th>No Tiket PO</th>
                <th>Detail Material & Lokasi Lahan</th>
                <th>Estimasi Penggunaan Detail</th>
                <th>Total OPEX</th>
                <th>Pemohon</th>
                <th>Status Lifecycle 3 Layer</th>
                <th className="text-center">Tindakan Layer (Sesuai Peran)</th>
              </tr>
            </thead>
            <tbody>
              {loading && poList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">Memuat data PO dari server...</td>
                </tr>
              ) : poList.map((po) => (
                <tr key={po.id}>
                  <td><strong className="badge bg-light text-dark border font-mono px-2 py-1">{po.poNumber}</strong></td>
                  <td>
                    <strong className="d-block text-dark">{po.itemName}</strong>
                    <span className="badge bg-light text-dark border mt-1">{po.category}</span>
                    <span className="d-block text-secondary mt-1" style={{ fontSize: 11 }}>📍 {po.targetLand}</span>
                  </td>
                  <td>
                    <span className="d-block text-dark font-weight-medium" style={{ fontSize: 12 }}>Qty: <b>{po.quantity}</b> (@ Rp {po.unitPriceRp?.toLocaleString('id-ID') || 0})</span>
                    <p className="text-muted mb-0 mt-1" style={{ fontSize: 11 }}>{po.usageDetails}</p>
                    <span className="text-primary font-weight-bold d-block mt-1" style={{ fontSize: 11 }}>📅 Target Pakai: {po.usageTargetDate}</span>
                  </td>
                  <td><strong className="text-danger h6 font-weight-extrabold m-0">Rp {po.totalPrice?.toLocaleString('id-ID')}</strong></td>
                  <td>
                    <strong className="d-block text-dark" style={{ fontSize: 12 }}>{po.createdBy?.name || 'Manajer Ops'}</strong>
                    <span className="text-muted" style={{ fontSize: 11 }}>Tgl: {formatDate(po.createdAt)}</span>
                  </td>
                  <td>
                    {po.status === 'PENDING_FINANCE' && (
                      <span className="badge bg-primary text-white font-weight-bold px-2.5 py-1.5 rounded-pill" style={{ fontSize: 10 }}>
                        ⏳ LAYER 1: MENUNGGU FINANCE
                      </span>
                    )}
                    {po.status === 'PENDING_DIREKTUR' && (
                      <span className="badge bg-warning text-dark font-weight-bold px-2.5 py-1.5 rounded-pill" style={{ fontSize: 10 }}>
                        ⏳ LAYER 2: MENUNGGU DIREKTUR
                      </span>
                    )}
                    {po.status === 'PENDING_INVESTOR' && (
                      <span className="badge bg-info text-white font-weight-bold px-2.5 py-1.5 rounded-pill" style={{ fontSize: 10 }}>
                        ⏳ LAYER 3: MENUNGGU INVESTOR
                      </span>
                    )}
                    {po.status === 'APPROVED_WAITING_DISBURSEMENT' && (
                      <span className="badge bg-success-subtle text-success border border-success font-weight-bold px-2.5 py-1.5 rounded-pill" style={{ fontSize: 10 }}>
                        ✅ 3 LAYER SETUJU • MENUNGGU CAIR
                      </span>
                    )}
                    {po.status === 'DISBURSED' && (
                      <div>
                        <span className="badge bg-success text-white font-weight-bold px-2.5 py-1.5 rounded-pill d-inline-block mb-1" style={{ fontSize: 10 }}>
                          💵 DANA CAIR KE VENDOR
                        </span>
                        <span className="d-block text-muted" style={{ fontSize: 10 }}>{formatDate(po.disbursedAt)} (Ref: {po.voucherNo})</span>
                      </div>
                    )}
                    {po.status === 'REJECTED' && (
                      <div>
                        <span className="badge bg-danger text-white font-weight-bold px-2.5 py-1.5 rounded-pill d-inline-block mb-1" style={{ fontSize: 10 }}>
                          ❌ PO DITOLAK
                        </span>
                        <span className="d-block text-danger font-weight-bold" style={{ fontSize: 10 }}>{po.rejectionNote}</span>
                      </div>
                    )}
                  </td>

                  {/* Actions according to Layer & Role */}
                  <td className="text-center">
                    {po.status === 'PENDING_FINANCE' && (
                      role === 'FINANCE' ? (
                        <div className="d-flex align-items-center justify-content-center gap-1">
                          <button
                            onClick={() => handleFinanceVerify(po.id)}
                            className="btn btn-sm btn-primary text-white font-weight-bold rounded-3 px-2 py-1"
                            style={{ fontSize: 11 }}
                          >
                            <i className="ri-check-line"></i> Layer 1: Verifikasi
                          </button>
                          <button
                            onClick={() => handleRejectPO(po.id, 'Layer 1 Finance')}
                            className="btn btn-sm btn-outline-danger font-weight-bold rounded-3 px-2 py-1"
                            style={{ fontSize: 11 }}
                          >
                            Tolak
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted font-weight-bold" style={{ fontSize: 11 }}>Menunggu Finance</span>
                      )
                    )}

                    {po.status === 'PENDING_DIREKTUR' && (
                      role === 'DIREKTUR' ? (
                        <div className="d-flex align-items-center justify-content-center gap-1">
                          <button
                            onClick={() => handleDirekturApprove(po.id)}
                            className="btn btn-sm btn-warning text-dark font-weight-bold rounded-3 px-2 py-1"
                            style={{ fontSize: 11 }}
                          >
                            <i className="ri-shield-check-line"></i> Layer 2: Otorisasi
                          </button>
                          <button
                            onClick={() => handleRejectPO(po.id, 'Layer 2 Direktur')}
                            className="btn btn-sm btn-outline-danger font-weight-bold rounded-3 px-2 py-1"
                            style={{ fontSize: 11 }}
                          >
                            Tolak
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted font-weight-bold" style={{ fontSize: 11 }}>Menunggu Direktur</span>
                      )
                    )}

                    {po.status === 'PENDING_INVESTOR' && (
                      role === 'INVESTOR' ? (
                        <div className="d-flex align-items-center justify-content-center gap-1">
                          <button
                            onClick={() => handleInvestorApprove(po.id)}
                            className="btn btn-sm btn-info text-white font-weight-bold rounded-3 px-2 py-1"
                            style={{ fontSize: 11 }}
                          >
                            <i className="ri-eye-line"></i> Layer 3: Setujui Investor
                          </button>
                          <button
                            onClick={() => handleRejectPO(po.id, 'Layer 3 Investor')}
                            className="btn btn-sm btn-outline-danger font-weight-bold rounded-3 px-2 py-1"
                            style={{ fontSize: 11 }}
                          >
                            Tolak
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted font-weight-bold" style={{ fontSize: 11 }}>Menunggu Investor</span>
                      )
                    )}

                    {po.status === 'APPROVED_WAITING_DISBURSEMENT' && (
                      role === 'FINANCE' ? (
                        <button
                          onClick={() => handleFinanceDisburse(po.id)}
                          className="btn btn-sm btn-success text-white font-weight-bold rounded-3 px-3 py-1.5 shadow-sm"
                          style={{ fontSize: 11 }}
                        >
                          <i className="ri-coins-line me-1"></i> Cairkan Dana PO (Finance)
                        </button>
                      ) : (
                        <span className="badge bg-success-subtle text-success font-weight-bold" style={{ fontSize: 11 }}>Menunggu Pencairan Finance</span>
                      )
                    )}

                    {po.status === 'DISBURSED' && (
                      <span className="badge bg-light text-dark border font-weight-bold px-2.5 py-1" style={{ fontSize: 11 }}>
                        ✅ Dana Terbayar
                      </span>
                    )}

                    {po.status === 'REJECTED' && (
                      <span className="badge bg-light text-danger border border-danger font-weight-bold px-2.5 py-1" style={{ fontSize: 11 }}>
                        Ditolak
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
