import React, { useState, useEffect } from 'react';
import { useRole } from '../context/RoleContext';

export type POStatus = 
  | 'PENDING_FINANCE'                // Step 1 -> Layer 1: Waiting for Finance Verification
  | 'PENDING_DIREKTUR'               // Step 2 -> Layer 2: Waiting for Direktur Authorization
  | 'PENDING_INVESTOR'               // Step 3 -> Layer 3: Waiting for Investor Approval
  | 'APPROVED_WAITING_DISBURSEMENT'  // Step 4 -> Approved by 3 Layers, waiting for Finance Cash Disbursal
  | 'DISBURSED'                      // Step 5 -> Funds Disbursed by Finance (Completed)
  | 'REJECTED';                      // Rejected

export interface PurchaseItem {
  id: string;
  poNumber: string;
  itemName: string;
  category: string;
  targetLand: string;
  quantity: string;
  unitPriceRp: number;
  totalAmountRp: number;
  usageTargetDate: string;
  requestedBy: string;
  requestDate: string;
  usageDetails: string;
  status: POStatus;
  financeVerifiedAt?: string;
  direkturApprovedAt?: string;
  investorApprovedAt?: string;
  disbursedAt?: string;
  rejectionNote?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stockQty: string;
  minStock: string;
  status: 'CUKUP' | 'REORDER_NOW' | 'HAMPIR_HABIS';
}

export const INITIAL_MOCK_PO_LIST: PurchaseItem[] = [
  {
    id: 'po-101',
    poNumber: 'PO-2026-0804-01',
    itemName: '10 Ton Pupuk NPK Granul Presisi & Kapur Dolomit',
    category: 'PUPUK & KAPUR',
    targetLand: 'Blok A2 - Tanam Hibrida Utama (2.0 Ha Jonggol)',
    quantity: '10 Ton',
    unitPriceRp: 2800000,
    totalAmountRp: 28000000,
    usageTargetDate: '10 Aug 2026',
    requestedBy: 'Budi Santoso, S.P. (Manajer Operasional)',
    requestDate: '03 Aug 2026',
    usageDetails: 'Pemupukan NPK susulan fase pertumbuhan vegetatif tanaman hibrida 2.0 Ha Jonggol. Dosis 250gram/titik sesuai SOP-PUPUK-02.',
    status: 'PENDING_FINANCE',
  },
  {
    id: 'po-102',
    poNumber: 'PO-2026-0804-02',
    itemName: '500 Meter Selang Drip Irigasi Tetes & Nozzle Satelit',
    category: 'PERALATAN & SPAREPART',
    targetLand: 'Blok A1 - Kebun Anggur Impor (1.000m² Jonggol)',
    quantity: '500 Meter',
    unitPriceRp: 29000,
    totalAmountRp: 14500000,
    usageTargetDate: '12 Aug 2026',
    requestedBy: 'Budi Santoso, S.P. (Manajer Operasional)',
    requestDate: '03 Aug 2026',
    usageDetails: 'Perluasan modul fertigasi tetes otomatis terhubung sensor kelembaban BMKG.',
    status: 'PENDING_DIREKTUR',
    financeVerifiedAt: '03 Aug 2026 14:20',
  },
  {
    id: 'po-103',
    poNumber: 'PO-2026-0804-03',
    itemName: '500 Batang Bibit Anggur Impor Shine Muscat (Rootstock SO4)',
    category: 'BIBIT UNGGUL',
    targetLand: 'Blok A1 - Kebun Anggur Impor (1.000m² Jonggol)',
    quantity: '500 Batang',
    unitPriceRp: 70000,
    totalAmountRp: 35000000,
    usageTargetDate: '15 Aug 2026',
    requestedBy: 'Budi Santoso, S.P. (Manajer Operasional)',
    requestDate: '02 Aug 2026',
    usageDetails: 'Penyulaman bibit unggul varietas Shine Muscat tersertifikasi Balai Benih Indonesia.',
    status: 'PENDING_INVESTOR',
    financeVerifiedAt: '02 Aug 2026 14:00',
    direkturApprovedAt: '03 Aug 2026 09:15',
  },
  {
    id: 'po-104',
    poNumber: 'PO-2026-0803-04',
    itemName: '1.200 Liter BBM Solar Industri B35 Traktor Kubota',
    category: 'LOGISTIK & BBM SOLAR',
    targetLand: 'Fasilitas Workshop & Machine Yard Jonggol',
    quantity: '1.200 Liter',
    unitPriceRp: 15000,
    totalAmountRp: 18000000,
    usageTargetDate: '08 Aug 2026',
    requestedBy: 'Budi Santoso, S.P. (Manajer Operasional)',
    requestDate: '02 Aug 2026',
    usageDetails: 'BBM Solar Industri B35 operasional 3 traktor pembajak & cultivator lahan Jonggol.',
    status: 'APPROVED_WAITING_DISBURSEMENT',
    financeVerifiedAt: '02 Aug 2026 15:10',
    direkturApprovedAt: '02 Aug 2026 17:30',
    investorApprovedAt: '03 Aug 2026 10:45',
  },
  {
    id: 'po-105',
    poNumber: 'PO-2026-0801-05',
    itemName: 'Suku Cadang Traktor & Valve Drip Irigasi Satelit',
    category: 'PERALATAN & SPAREPART',
    targetLand: 'Fasilitas Workshop & Machine Yard Jonggol',
    quantity: '1 Paket',
    unitPriceRp: 12500000,
    totalAmountRp: 12500000,
    usageTargetDate: '05 Aug 2026',
    requestedBy: 'Budi Santoso, S.P. (Manajer Operasional)',
    requestDate: '01 Aug 2026',
    usageDetails: 'Perawatan rutin filter membran irigasi & penggantian oli traktor Kubota.',
    status: 'DISBURSED',
    financeVerifiedAt: '01 Aug 2026 10:00',
    direkturApprovedAt: '01 Aug 2026 11:30',
    investorApprovedAt: '01 Aug 2026 14:20',
    disbursedAt: '01 Aug 2026 15:45 (Ref: VCH-2026-8801)',
  },
];

export const PurchaseOrderInventoryShowcase: React.FC = () => {
  const { role, canCreatePO } = useRole();

  const [inventoryList] = useState<InventoryItem[]>([
    { id: '1', name: 'Pupuk NPK Granul 16-16-16', category: 'PUPUK', stockQty: '12.5 Ton', minStock: '15.0 Ton', status: 'REORDER_NOW' },
    { id: '2', name: 'Bibit Anggur Impor Shine Muscat', category: 'BIBIT', stockQty: '350 Batang', minStock: '500 Batang', status: 'HAMPIR_HABIS' },
    { id: '3', name: 'Kapur Dolomit Kebun', category: 'PUPUK', stockQty: '8.0 Ton', minStock: '5.0 Ton', status: 'CUKUP' },
    { id: '4', name: 'BBM Solar Industri B35 Traktor', category: 'OPERASIONAL', stockQty: '1,200 Liter', minStock: '2,000 Liter', status: 'HAMPIR_HABIS' },
    { id: '5', name: 'Traktor & Cultivator Kubota', category: 'PERALATAN', stockQty: '3 Unit', minStock: '2 Unit', status: 'CUKUP' },
  ]);

  const [poList, setPoList] = useState<PurchaseItem[]>(() => {
    try {
      const saved = localStorage.getItem('agrojaya_po_list');
      return saved ? JSON.parse(saved) : INITIAL_MOCK_PO_LIST;
    } catch {
      return INITIAL_MOCK_PO_LIST;
    }
  });

  // Sync state when PO is updated in localStorage
  const updateAndSavePoList = (newList: PurchaseItem[]) => {
    setPoList(newList);
    try {
      localStorage.setItem('agrojaya_po_list', JSON.stringify(newList));
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem('agrojaya_po_list');
        if (saved) setPoList(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('agrojaya-po-updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('agrojaya-po-updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
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

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCreatePO) return;

    const newPO: PurchaseItem = {
      id: `po-${Date.now()}`,
      poNumber: `PO-2026-0804-0${poList.length + 1}`,
      itemName,
      category,
      targetLand,
      quantity,
      unitPriceRp: Number(unitPrice),
      totalAmountRp: calculatedTotal,
      usageTargetDate: usageTargetDate || '15 Aug 2026',
      requestedBy: 'Budi Santoso, S.P. (Manajer Operasional)',
      requestDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      usageDetails,
      status: 'PENDING_FINANCE',
    };

    updateAndSavePoList([newPO, ...poList]);
    setItemName('');
    setQuantity('');
    setUnitPrice('');
    setUsageTargetDate('');
    setUsageDetails('');
    alert(`Pengajuan PO ${newPO.poNumber} Berhasil Dikirimkan ke Finance (Layer 1 Verifikasi)!`);
  };

  // Workflow Handlers
  const handleFinanceVerify = (id: string) => {
    const updated = poList.map((po) => po.id === id ? {
      ...po,
      status: 'PENDING_DIREKTUR' as const,
      financeVerifiedAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    } : po);
    updateAndSavePoList(updated);
  };

  const handleDirekturApprove = (id: string) => {
    const updated = poList.map((po) => po.id === id ? {
      ...po,
      status: 'PENDING_INVESTOR' as const,
      direkturApprovedAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    } : po);
    updateAndSavePoList(updated);
  };

  const handleInvestorApprove = (id: string) => {
    const updated = poList.map((po) => po.id === id ? {
      ...po,
      status: 'APPROVED_WAITING_DISBURSEMENT' as const,
      investorApprovedAt: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
    } : po);
    updateAndSavePoList(updated);
  };

  const handleFinanceDisburse = (id: string) => {
    const voucherNo = `VCH-${Math.floor(1000 + Math.random() * 9000)}`;
    const updated = poList.map((po) => po.id === id ? {
      ...po,
      status: 'DISBURSED' as const,
      disbursedAt: `${new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })} (Ref: ${voucherNo})`,
    } : po);
    updateAndSavePoList(updated);
    alert(`Dana PO Berhasil Dicairkan oleh Finance! Voucher Kas Terbit: ${voucherNo}`);
  };

  const handleRejectPO = (id: string, layerName: string) => {
    const reason = prompt(`Masukkan alasan penolakan PO (${layerName}):`);
    if (!reason) return;
    const updated = poList.map((po) => po.id === id ? {
      ...po,
      status: 'REJECTED' as const,
      rejectionNote: `Ditolak pada ${layerName}: ${reason}`,
    } : po);
    updateAndSavePoList(updated);
  };

  return (
    <div className="w-100 space-y-4">
      {/* Module Title & Workflow Overview */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-git-commit-line me-1"></i> WORKFLOW PO 3-LAYER PERSERTUJUAN & PENCAIRAN
          </span>
          <h2 className="font-weight-bold text-dark mb-1" style={{ fontSize: 18 }}>Pengajuan PO Ops & Workflow Persetujuan 3 Layer</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Pengajuan (Manajer Ops) ➔ Layer 1: Finance ➔ Layer 2: Direktur ➔ Layer 3: Investor ➔ Pencairan (Finance)
          </p>
        </div>
        <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
          <i className="ri-shield-check-line"></i> Akses Peran: {role}
        </span>
      </div>

      {/* Visual Workflow Layer Progress Diagram */}
      <div className="bg-white p-4 rounded-4 border shadow-sm space-y-3">
        <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
          <i className="ri-flow-chart text-success"></i> Skema Alur Eksekusi PO Perkebunan (End-to-End Audit)
        </h4>

        <div className="row g-3 text-center">
          <div className="col-12 col-md-2.4">
            <div className="p-3 bg-light rounded-3 border">
              <span className="badge bg-secondary text-white rounded-circle mb-1" style={{ width: 24, height: 24, lineHeight: '18px' }}>1</span>
              <strong className="d-block text-dark" style={{ fontSize: 13 }}>1. Pengajuan PO</strong>
              <small className="text-muted d-block" style={{ fontSize: 11 }}>Manajer Operasional</small>
            </div>
          </div>
          <div className="col-12 col-md-2.4">
            <div className="p-3 bg-primary-subtle text-primary rounded-3 border border-primary">
              <span className="badge bg-primary text-white rounded-circle mb-1" style={{ width: 24, height: 24, lineHeight: '18px' }}>2</span>
              <strong className="d-block text-primary" style={{ fontSize: 13 }}>Layer 1: Finance</strong>
              <small className="text-primary-subtle d-block text-dark" style={{ fontSize: 11 }}>Cek Kelayakan Anggaran</small>
            </div>
          </div>
          <div className="col-12 col-md-2.4">
            <div className="p-3 bg-warning-subtle text-warning rounded-3 border border-warning">
              <span className="badge bg-warning text-dark rounded-circle mb-1" style={{ width: 24, height: 24, lineHeight: '18px' }}>3</span>
              <strong className="d-block text-dark" style={{ fontSize: 13 }}>Layer 2: Direktur</strong>
              <small className="text-muted d-block" style={{ fontSize: 11 }}>Otorisasi Direksi Kebun</small>
            </div>
          </div>
          <div className="col-12 col-md-2.4">
            <div className="p-3 bg-info-subtle text-info rounded-3 border border-info">
              <span className="badge bg-info text-white rounded-circle mb-1" style={{ width: 24, height: 24, lineHeight: '18px' }}>4</span>
              <strong className="d-block text-dark" style={{ fontSize: 13 }}>Layer 3: Investor</strong>
              <small className="text-muted d-block" style={{ fontSize: 11 }}>Transparansi Modal</small>
            </div>
          </div>
          <div className="col-12 col-md-2.4">
            <div className="p-3 bg-success-subtle text-success rounded-3 border border-success">
              <span className="badge bg-success text-white rounded-circle mb-1" style={{ width: 24, height: 24, lineHeight: '18px' }}>5</span>
              <strong className="d-block text-success font-weight-extrabold" style={{ fontSize: 13 }}>Pencairan: Finance</strong>
              <small className="text-success d-block" style={{ fontSize: 11 }}>Cair Ke Rekening Vendor</small>
            </div>
          </div>
        </div>
      </div>

      {/* Grid 2 Column: Inventory Stock & Complete PO Form */}
      <div className="row g-4">
        {/* Inventory Stock Monitor */}
        <div className="col-12 col-xl-6">
          <div className="bg-white p-4 rounded-4 border shadow-sm h-100 space-y-3">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
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
              <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
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
                  <strong className="h5 font-weight-extrabold text-danger m-0" style={{ fontSize: 16 }}>
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
          <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
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
                <th>Pemohon (Manajer Ops)</th>
                <th>Status Lifecycle 3 Layer</th>
                <th className="text-center">Tindakan Layer (Sesuai Peran)</th>
              </tr>
            </thead>
            <tbody>
              {poList.map((po) => (
                <tr key={po.id}>
                  <td><strong className="badge bg-light text-dark border font-mono px-2 py-1">{po.poNumber}</strong></td>
                  <td>
                    <strong className="d-block text-dark">{po.itemName}</strong>
                    <span className="badge bg-light text-dark border mt-1">{po.category}</span>
                    <span className="d-block text-secondary mt-1" style={{ fontSize: 11 }}>📍 {po.targetLand}</span>
                  </td>
                  <td>
                    <span className="d-block text-dark font-weight-medium" style={{ fontSize: 12 }}>Qty: <b>{po.quantity}</b> (@ Rp {po.unitPriceRp.toLocaleString('id-ID')})</span>
                    <p className="text-muted mb-0 mt-1" style={{ fontSize: 11 }}>{po.usageDetails}</p>
                    <span className="text-primary font-weight-bold d-block mt-1" style={{ fontSize: 11 }}>📅 Target Pakai: {po.usageTargetDate}</span>
                  </td>
                  <td><strong className="text-danger h6 font-weight-extrabold m-0">Rp {po.totalAmountRp.toLocaleString('id-ID')}</strong></td>
                  <td>
                    <strong className="d-block text-dark" style={{ fontSize: 12 }}>{po.requestedBy}</strong>
                    <span className="text-muted" style={{ fontSize: 11 }}>Tanggal: {po.requestDate}</span>
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
                        <span className="d-block text-muted" style={{ fontSize: 10 }}>{po.disbursedAt}</span>
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
                      role === 'FINANCE' || role === 'DIREKTUR' ? (
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
                      role === 'INVESTOR' || role === 'DIREKTUR' ? (
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
                      role === 'FINANCE' || role === 'DIREKTUR' ? (
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
