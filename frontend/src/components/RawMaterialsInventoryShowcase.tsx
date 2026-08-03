import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';

interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: 'PUPUK' | 'BIBIT' | 'PESTISIDA' | 'BBM' | 'PERALATAN';
  warehouse: string;
  currentStock: number;
  minStock: number;
  unit: string;
  unitPriceRp: number;
  lastRestockDate: string;
  status: 'AMAN' | 'MENIPIS' | 'KRITIS';
}

export const RawMaterialsInventoryShowcase = () => {
  const { role } = useRole();

  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: 'STK-001',
      code: 'PPK-NPK-01',
      name: 'Pupuk NPK Granul 16-16-16 High Grade',
      category: 'PUPUK',
      warehouse: 'Gudang Utama A2 Jonggol',
      currentStock: 1850,
      minStock: 300,
      unit: 'Kg',
      unitPriceRp: 14000,
      lastRestockDate: '28 Jul 2026',
      status: 'AMAN'
    },
    {
      id: 'STK-002',
      code: 'BBT-SWT-02',
      name: 'Bibit Kelapa Sawit Tenera Sertifikasi BSM',
      category: 'BIBIT',
      warehouse: 'Greenhouse & Pembibitan A1',
      currentStock: 450,
      minStock: 100,
      unit: 'Batang',
      unitPriceRp: 55000,
      lastRestockDate: '15 Jul 2026',
      status: 'AMAN'
    },
    {
      id: 'STK-003',
      code: 'PST-TRI-03',
      name: 'Biopestisida Trikoderma Harzianum Spores',
      category: 'PESTISIDA',
      warehouse: 'Gudang Kimia & Bio A1',
      currentStock: 35,
      minStock: 50,
      unit: 'Liter',
      unitPriceRp: 120000,
      lastRestockDate: '10 Jun 2026',
      status: 'MENIPIS'
    },
    {
      id: 'STK-004',
      code: 'BBM-SOL-04',
      name: 'Bahan Bakar Solar B35 Traktor Kubota',
      category: 'BBM',
      warehouse: 'Tangki Cadangan Workshop',
      currentStock: 680,
      minStock: 200,
      unit: 'Liter',
      unitPriceRp: 15500,
      lastRestockDate: '01 Aug 2026',
      status: 'AMAN'
    },
    {
      id: 'STK-005',
      code: 'PPK-DOL-05',
      name: 'Kapur Dolomit Netralisasi pH Tanah',
      category: 'PUPUK',
      warehouse: 'Gudang Utama A2 Jonggol',
      currentStock: 80,
      minStock: 500,
      unit: 'Kg',
      unitPriceRp: 3500,
      lastRestockDate: '02 Mei 2026',
      status: 'KRITIS'
    }
  ]);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'PUPUK' | 'BIBIT' | 'PESTISIDA' | 'BBM' | 'PERALATAN'>('PUPUK');
  const [stock, setStock] = useState('');
  const [unit, setUnit] = useState('Kg');
  const [price, setPrice] = useState('');

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !stock || !price) return;
    const newStockNum = Number(stock);
    const newItem: InventoryItem = {
      id: `STK-00${items.length + 1}`,
      code: `RAW-${category.substring(0, 3)}-0${items.length + 1}`,
      name,
      category,
      warehouse: 'Gudang Utama A2 Jonggol',
      currentStock: newStockNum,
      minStock: 200,
      unit,
      unitPriceRp: Number(price),
      lastRestockDate: '03 Aug 2026',
      status: newStockNum > 300 ? 'AMAN' : newStockNum > 100 ? 'MENIPIS' : 'KRITIS'
    };
    setItems([newItem, ...items]);
    setName('');
    setStock('');
    setPrice('');
    alert(`Berhasil mencatatkan barang baru: ${name} (${newStockNum} ${unit})!`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AMAN':
        return <span className="tmp-badge-card success"><i className="ri-checkbox-circle-fill me-1"></i> STOK AMAN</span>;
      case 'MENIPIS':
        return <span className="badge bg-warning text-dark font-weight-bold" style={{ fontSize: 11 }}><i className="ri-alert-fill me-1"></i> STOK MENIPIS</span>;
      case 'KRITIS':
        return <span className="badge bg-danger text-white font-weight-bold" style={{ fontSize: 11 }}><i className="ri-error-warning-fill me-1"></i> STOK KRITIS</span>;
      default:
        return null;
    }
  };

  const isAllowedToEdit = role === 'DIREKTUR' || role === 'MANAGER' || role === 'KEPALA_KEBUN';

  return (
    <div className="space-y-4">
      {/* Stat Cards Bahan Baku (Corpox Bento Grid) */}
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Jenis Bahan</span>
              <strong className="h4 font-weight-extrabold text-dark m-0 d-block !text-base">5 Varian Item</strong>
              <span className="d-block text-success font-weight-bold mt-1" style={{ fontSize: 11 }}>
                <i className="ri-checkbox-circle-line me-1"></i> Terdata di Gudang Jonggol
              </span>
            </div>
            <div className="corpox-icon-box emerald" style={{ width: 40, height: 40, fontSize: 18 }}>
              <i className="ri-archive-stack-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Perlu Penambahan</span>
              <strong className="h4 font-weight-extrabold text-danger m-0 d-block !text-base">2 Bahan Restock</strong>
              <span className="d-block text-danger font-weight-bold mt-1" style={{ fontSize: 11 }}>
                <i className="ri-alert-line me-1"></i> Stok Menipis & Kritis
              </span>
            </div>
            <div className="corpox-icon-box amber" style={{ width: 40, height: 40, fontSize: 18 }}>
              <i className="ri-alert-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Nilai Persediaan</span>
              <strong className="h4 font-weight-extrabold text-dark m-0 d-block !text-base">
                Rp {items.reduce((acc, curr) => acc + (curr.currentStock * curr.unitPriceRp), 0).toLocaleString('id-ID')}
              </strong>
              <span className="d-block text-secondary font-weight-bold mt-1" style={{ fontSize: 11 }}>
                Valuasi Stok Fisik Gudang
              </span>
            </div>
            <div className="corpox-icon-box blue" style={{ width: 40, height: 40, fontSize: 18 }}>
              <i className="ri-coins-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box card-box-hover p-3.5 d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Kondisi Gudang Simpan</span>
              <strong className="h4 font-weight-extrabold text-success m-0 d-block !text-base">Sangat Baik (100%)</strong>
              <span className="d-block text-success font-weight-bold mt-1" style={{ fontSize: 11 }}>
                Suhu & Kelembapan Optimal
              </span>
            </div>
            <div className="corpox-icon-box emerald" style={{ width: 40, height: 40, fontSize: 18 }}>
              <i className="ri-shield-check-line"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Form Input Tambah Stok (Filtered by Role) */}
      {isAllowedToEdit && (
        <div className="card-box p-4 rounded-4 space-y-4">
          <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
            <div>
              <h4 className="font-weight-extrabold text-dark m-0 d-flex align-items-center gap-2 !text-sm">
                <span className="corpox-icon-box emerald" style={{ width: 32, height: 32, fontSize: 16 }}>
                  <i className="ri-add-circle-line"></i>
                </span>
                Pencatatan Masuk & Penerimaan Bahan Baku Baru
              </h4>
              <p className="text-secondary mb-0 font-weight-medium mt-0.5" style={{ fontSize: 12 }}>
                Catat penerimaan fisik barang gudang (Pupuk, Bibit, Pestisida, Solar, & Peralatan)
              </p>
            </div>
            <span className="tmp-badge-card success">Form Logistik Gudang</span>
          </div>

          <form onSubmit={handleAddStock} className="row g-3 align-items-end">
            <div className="col-12 col-md-3">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                🏷️ Nama Bahan Baku <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Pupuk NPK 16-16-16"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control bg-light border rounded-3 text-dark font-weight-medium"
                style={{ fontSize: 13, height: 42 }}
                required
              />
            </div>

            <div className="col-12 col-md-2">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                📁 Kategori Item
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="form-select bg-light border rounded-3 text-dark font-weight-medium"
                style={{ fontSize: 13, height: 42 }}
              >
                <option value="PUPUK">Pupuk</option>
                <option value="BIBIT">Bibit</option>
                <option value="PESTISIDA">Pestisida</option>
                <option value="BBM">BBM / Solar</option>
                <option value="PERALATAN">Peralatan</option>
              </select>
            </div>

            <div className="col-12 col-md-2">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                📦 Jumlah Stok Masuk
              </label>
              <div className="input-group" style={{ height: 42 }}>
                <input
                  type="number"
                  placeholder="500"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="form-control bg-light border text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                  required
                />
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="form-control bg-light border text-muted font-weight-bold text-center"
                  style={{ fontSize: 12, maxWidth: 60 }}
                />
              </div>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                💰 Harga Per Satuan (Rp)
              </label>
              <div className="input-group" style={{ height: 42 }}>
                <span className="input-group-text bg-light text-muted font-weight-bold" style={{ fontSize: 12 }}>Rp</span>
                <input
                  type="number"
                  placeholder="14000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control bg-light border text-dark font-weight-medium"
                  style={{ fontSize: 13 }}
                  required
                />
              </div>
            </div>

            <div className="col-12 col-md-2">
              <button type="submit" className="btn btn-primary-gradient font-weight-bold p-0 w-100 rounded-3 shadow-xs d-flex align-items-center justify-content-center gap-2" style={{ height: 42, fontSize: 13 }}>
                <i className="ri-save-line !text-sm"></i> Catat Ke Stok
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabel Monitoring Stok Gudang */}
      <div className="card-box p-4 rounded-4 space-y-4">
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
          <h4 className="font-weight-extrabold text-dark m-0 d-flex align-items-center gap-2 !text-sm">
            <i className="ri-file-list-3-line text-success"></i> Buku Register Stok Bahan Baku Gudang Jonggol
          </h4>
          <span className="tmp-badge-card success">
            Total {items.length} Barang
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead className="table-light">
              <tr>
                <th className="font-weight-bold text-dark">Kode & Nama Bahan Baku</th>
                <th className="font-weight-bold text-dark">Kategori</th>
                <th className="font-weight-bold text-dark">Lokasi Gudang</th>
                <th className="font-weight-bold text-dark">Stok Fisik Tersedia</th>
                <th className="font-weight-bold text-dark">Batas Aman</th>
                <th className="font-weight-bold text-dark">Harga Per Satuan</th>
                <th className="font-weight-bold text-dark">Total Nilai Stok</th>
                <th className="font-weight-bold text-dark">Status Stok</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex flex-column">
                      <strong className="text-dark font-weight-extrabold" style={{ fontSize: 13 }}>{item.name}</strong>
                      <span className="text-secondary font-mono" style={{ fontSize: 11 }}>Kode: {item.code}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border font-weight-bold">{item.category}</span>
                  </td>
                  <td className="text-secondary font-weight-medium">{item.warehouse}</td>
                  <td>
                    <strong className="text-dark font-weight-extrabold" style={{ fontSize: 14 }}>
                      {item.currentStock.toLocaleString('id-ID')} {item.unit}
                    </strong>
                  </td>
                  <td className="text-secondary font-weight-medium">{item.minStock.toLocaleString('id-ID')} {item.unit}</td>
                  <td className="text-dark font-weight-medium">Rp {item.unitPriceRp.toLocaleString('id-ID')} / {item.unit}</td>
                  <td className="text-success font-weight-extrabold">
                    Rp {(item.currentStock * item.unitPriceRp).toLocaleString('id-ID')}
                  </td>
                  <td>{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
