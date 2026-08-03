import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';

export interface PurchaseItem {
  id: string;
  poNumber: string;
  itemName: string;
  category: string;
  quantity: string;
  totalAmountRp: number;
  requestedBy: string;
  requestDate: string;
  reason: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stockQty: string;
  minStock: string;
  status: 'CUKUP' | 'REORDER_NOW' | 'HAMPIR_HABIS';
}

export const PurchaseOrderInventoryShowcase: React.FC = () => {
  const { role, canCreatePO, canApprovePO } = useRole();

  const [inventoryList] = useState<InventoryItem[]>([
    { id: '1', name: 'Pupuk NPK Granul 15-15-15', category: 'PUPUK', stockQty: '12.5 Ton', minStock: '15.0 Ton', status: 'REORDER_NOW' },
    { id: '2', name: 'Bibit Kelapa Sawit Tenera', category: 'BIBIT', stockQty: '4,500 Batang', minStock: '1,000 Batang', status: 'CUKUP' },
    { id: '3', name: 'Kapur Dolomit Kebun', category: 'PUPUK', stockQty: '8.0 Ton', minStock: '5.0 Ton', status: 'CUKUP' },
    { id: '4', name: 'BBM Solar Industri B35', category: 'OPERASIONAL', stockQty: '1,200 Liter', minStock: '2,000 Liter', status: 'HAMPIR_HABIS' },
    { id: '5', name: 'Traktor & Cultivator Kubota', category: 'PERALATAN', stockQty: '3 Unit', minStock: '2 Unit', status: 'CUKUP' },
  ]);

  const [poList, setPoList] = useState<PurchaseItem[]>([
    {
      id: 'po-1',
      poNumber: 'PO-2026-0801',
      itemName: '5 Ton Pupuk NPK Granul & Kapur Dolomit',
      category: 'PUPUK',
      quantity: '5 Ton',
      totalAmountRp: 28000000,
      requestedBy: 'Ir. Ahmad (Kepala Kebun)',
      requestDate: '02 Aug 2026',
      reason: 'Pemupukan Fungsional Fase 2 Pemeliharaan Blok A1',
      status: 'PENDING_APPROVAL',
    },
    {
      id: 'po-2',
      poNumber: 'PO-2026-0802',
      itemName: 'Suku Cadang Traktor & Pompa Irigasi',
      category: 'PERALATAN',
      quantity: '1 Paket',
      totalAmountRp: 15000000,
      requestedBy: 'Budi S. (Manajer Operasional)',
      requestDate: '01 Aug 2026',
      reason: 'Perawatan Berkala Mesin Olah Tanah Lahan B1',
      status: 'APPROVED',
    },
    {
      id: 'po-3',
      poNumber: 'PO-2026-0803',
      itemName: '1,000 Batang Bibit Sawit Superior',
      category: 'BIBIT',
      quantity: '1,000 Batang',
      totalAmountRp: 35000000,
      requestedBy: 'Budi S. (Manajer Operasional)',
      requestDate: '28 Jul 2026',
      reason: 'Persiapan Penanaman Blok Lahan C1 Baru',
      status: 'APPROVED',
    },
  ]);

  // Form State
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('PUPUK');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCreatePO) return;

    const newPO: PurchaseItem = {
      id: `po-${Date.now()}`,
      poNumber: `PO-2026-080${poList.length + 1}`,
      itemName,
      category,
      quantity,
      totalAmountRp: Number(amount),
      requestedBy: role === 'DIREKTUR' ? 'Direksi' : role === 'MANAGER' ? 'Manajer Operasional' : 'Kepala Kebun',
      requestDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      reason,
      status: 'PENDING_APPROVAL',
    };

    setPoList([newPO, ...poList]);
    setItemName('');
    setQuantity('');
    setAmount('');
    setReason('');
  };

  const handleApprovePO = (id: string) => {
    if (!canApprovePO) return;
    setPoList(poList.map((po) => (po.id === id ? { ...po, status: 'APPROVED' } : po)));
  };

  const handleRejectPO = (id: string) => {
    if (!canApprovePO) return;
    setPoList(poList.map((po) => (po.id === id ? { ...po, status: 'REJECTED' } : po)));
  };

  return (
    <div className="w-100 space-y-4">
      {/* Module Title */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-shopping-cart-2-line me-1"></i> LOGISTIK & LOG PURCHASE ORDER (PO)
          </span>
          <h2 className="font-weight-bold text-dark mb-1" style={{ fontSize: 18 }}>Inventaris Stok & Pengajuan Purchase Order (PO)</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Sistem Hak Akses RBAC: Manajer/Kepala Kebun Mengajukan • Direktur Menyetujui Disbursment PO
          </p>
        </div>
        <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
          <i className="ri-shield-check-line"></i> Akses Mode: {role}
        </span>
      </div>

      {/* Grid 2 Column: Inventory Stock Table & PO Creation Form */}
      <div className="row g-4">
        {/* Inventory Stock Table */}
        <div className="col-12 col-xl-7">
          <div className="bg-white p-4 rounded-4 border shadow-sm h-100 space-y-3">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
                <i className="ri-archive-line text-success"></i> Kolom Inventaris Kebun & Monitoring Stok
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
                    <th>Batas Minimum</th>
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
                          <span className="badge bg-danger text-white font-weight-bold" style={{ fontSize: 10 }}>AJUKAN REORDER</span>
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

        {/* Form Pengajuan PO Baru (RBAC Restricted) */}
        <div className="col-12 col-xl-5">
          <div className="bg-white p-4 rounded-4 border shadow-sm h-100 space-y-3">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
              <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
                <i className="ri-add-box-line text-success"></i> Form Pengajuan PO Baru
              </h4>
              <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 10 }}>
                {canCreatePO ? 'Dapat Mengajukan' : 'Khusus Investor (Read-Only)'}
              </span>
            </div>

            {canCreatePO ? (
              <form onSubmit={handleCreatePO} className="space-y-3 pt-1">
                <div>
                  <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Nama Material / Barang PO</label>
                  <input
                    type="text"
                    placeholder="misal: 5 Ton Pupuk NPK Granul"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="form-control p-2.5 bg-light border-0 rounded-3"
                    style={{ fontSize: 13 }}
                    required
                  />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Kategori</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-select p-2.5 bg-light border-0 rounded-3 font-weight-bold"
                      style={{ fontSize: 13 }}
                    >
                      <option value="PUPUK">PUPUK & KAPUR</option>
                      <option value="BIBIT">BIBIT UNGGUL</option>
                      <option value="PERALATAN">PERALATAN / SPAREPART</option>
                      <option value="OPERASIONAL">OPERASIONAL / BBM</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Jumlah (Qty)</label>
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
                </div>
                <div>
                  <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Estimasi Nominal OPEX (Rp)</label>
                  <input
                    type="number"
                    placeholder="28000000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-control p-2.5 bg-light border-0 rounded-3 font-weight-bold"
                    style={{ fontSize: 13 }}
                    required
                  />
                </div>
                <div>
                  <label className="form-label font-weight-bold text-secondary mb-1" style={{ fontSize: 11 }}>Alasan & Peruntukan Pengajuan PO</label>
                  <input
                    type="text"
                    placeholder="Alasan teknis pemupukan / perawatan"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="form-control p-2.5 bg-light border-0 rounded-3"
                    style={{ fontSize: 13 }}
                    required
                  />
                </div>
                <button type="submit" className="tmp-btn bg-success text-white font-weight-bold p-2.5 w-100 rounded-3 border-0 shadow-xs" style={{ fontSize: 13 }}>
                  <i className="ri-send-plane-fill me-1"></i> Ajukan Purchase Order Ke Direksi
                </button>
              </form>
            ) : (
              <div className="p-4 bg-light rounded-3 text-center text-muted font-weight-bold" style={{ fontSize: 13 }}>
                <i className="ri-lock-line h4 d-block text-secondary mb-1"></i>
                Mode {role} tidak memiliki hak akses untuk membuat pengajuan PO baru.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Log Tabel Persetujuan PO (RBAC Approval Actions) */}
      <div className="bg-white p-4 rounded-4 border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
            <i className="ri-file-list-3-line text-success"></i> Log Pengajuan Purchase Order (PO) & Persetujuan Direksi
          </h4>
          <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
            Total Pengajuan PO: {poList.length}
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr>
                <th>No Tiket PO</th>
                <th>Detail Barang & Kategori</th>
                <th>Jumlah</th>
                <th>Nominal OPEX</th>
                <th>Pemohon Lapangan</th>
                <th>Status Persetujuan</th>
                <th className="text-center">Tindakan Persetujuan (RBAC)</th>
              </tr>
            </thead>
            <tbody>
              {poList.map((po) => (
                <tr key={po.id}>
                  <td><strong className="badge bg-light text-dark border px-2 py-1">{po.poNumber}</strong></td>
                  <td>
                    <strong className="d-block text-dark">{po.itemName}</strong>
                    <span className="text-muted" style={{ fontSize: 11 }}>{po.reason}</span>
                  </td>
                  <td>{po.quantity}</td>
                  <td><strong className="text-danger">Rp {po.totalAmountRp.toLocaleString('id-ID')}</strong></td>
                  <td>
                    <strong className="d-block text-dark">{po.requestedBy}</strong>
                    <span className="text-muted" style={{ fontSize: 11 }}>Tanggal: {po.requestDate}</span>
                  </td>
                  <td>
                    {po.status === 'PENDING_APPROVAL' && (
                      <span className="badge bg-warning text-dark font-weight-bold px-2.5 py-1" style={{ fontSize: 11 }}>
                        MENUNGGU DIREKSI
                      </span>
                    )}
                    {po.status === 'APPROVED' && (
                      <span className="badge bg-success text-white font-weight-bold px-2.5 py-1" style={{ fontSize: 11 }}>
                        DISETUJUI DIREKSI
                      </span>
                    )}
                    {po.status === 'REJECTED' && (
                      <span className="badge bg-danger text-white font-weight-bold px-2.5 py-1" style={{ fontSize: 11 }}>
                        DITOLAK
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    {po.status === 'PENDING_APPROVAL' ? (
                      canApprovePO ? (
                        <div className="d-flex align-items-center justify-content-center gap-1.5">
                          <button
                            onClick={() => handleApprovePO(po.id)}
                            className="btn btn-success text-white font-weight-bold btn-sm rounded-3 px-2.5 py-1"
                            style={{ fontSize: 11 }}
                          >
                            <i className="ri-check-line me-1"></i> Setujui
                          </button>
                          <button
                            onClick={() => handleRejectPO(po.id)}
                            className="btn btn-outline-danger font-weight-bold btn-sm rounded-3 px-2.5 py-1"
                            style={{ fontSize: 11 }}
                          >
                            <i className="ri-close-line me-1"></i> Tolak
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted font-weight-bold" style={{ fontSize: 11 }}>
                          Menunggu Persetujuan Direksi
                        </span>
                      )
                    ) : (
                      <span className="badge bg-light text-dark border font-weight-bold px-2.5 py-1" style={{ fontSize: 11 }}>
                        Selesai Dikelola
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
