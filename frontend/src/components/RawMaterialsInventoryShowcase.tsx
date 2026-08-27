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
      status: 'AMAN',
    },
    {
      id: 'STK-002',
      code: 'BBT-SWT-02',
      name: 'Bibit Porang Sertifikasi BSM',
      category: 'BIBIT',
      warehouse: 'Greenhouse & Pembibitan A1',
      currentStock: 450,
      minStock: 100,
      unit: 'Batang',
      unitPriceRp: 55000,
      lastRestockDate: '15 Jul 2026',
      status: 'AMAN',
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
      status: 'MENIPIS',
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
      status: 'AMAN',
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
      status: 'KRITIS',
    },
  ]);

  // Form & Filter States
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [name, setName] = useState('');
  const [category, setCategory] = useState<'PUPUK' | 'BIBIT' | 'PESTISIDA' | 'BBM' | 'PERALATAN'>('PUPUK');
  const [warehouse, setWarehouse] = useState('Gudang Utama A2 Jonggol');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState('');
  const [unit, setUnit] = useState('Kg');
  const [price, setPrice] = useState('');

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !stock || !price) return;
    const newStockNum = Number(stock);
    const minStockNum = Number(minStock) || 100;
    const newItem: InventoryItem = {
      id: `STK-00${items.length + 1}`,
      code: `RAW-${category.substring(0, 3)}-0${items.length + 1}`,
      name,
      category,
      warehouse,
      currentStock: newStockNum,
      minStock: minStockNum,
      unit,
      unitPriceRp: Number(price),
      lastRestockDate: '27 Agu 2026',
      status: newStockNum >= minStockNum ? 'AMAN' : newStockNum >= minStockNum * 0.4 ? 'MENIPIS' : 'KRITIS',
    };
    setItems([newItem, ...items]);
    setFilterCategory('ALL');
    setSearchQuery('');
    setName('');
    setStock('');
    setMinStock('');
    setPrice('');
    setShowAddForm(false);
    alert(`Berhasil mencatatkan barang baru: ${name} (${newStockNum} ${unit})!`);
  };

  const isAllowedToEdit = role === 'DIREKTUR' || role === 'MANAGER' || role === 'KEPALA_KEBUN';

  const totalValuation = items.reduce((acc, curr) => acc + curr.currentStock * curr.unitPriceRp, 0);
  const criticalItems = items.filter((i) => i.status === 'MENIPIS' || i.status === 'KRITIS');

  const filteredItems = items.filter((item) => {
    const matchCat = filterCategory === 'ALL' || item.category === filterCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'PUPUK':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">PUPUK</span>;
      case 'BIBIT':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">BIBIT</span>;
      case 'PESTISIDA':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">PESTISIDA</span>;
      case 'BBM':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">BBM</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">{cat}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* 4 Clean Metric Cards */}
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Total Jenis Barang</span>
              <strong className="text-dark font-weight-bold d-block my-0.5" style={{ fontSize: 20 }}>{items.length} Komoditas</strong>
              <span className="text-success font-weight-medium" style={{ fontSize: 11 }}>Tergudang di Jonggol</span>
            </div>
            <div className="corpox-icon-box emerald" style={{ width: 38, height: 38, fontSize: 18 }}>
              <i className="ri-archive-stack-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Perlu Restock Segera</span>
              <strong className="text-danger font-weight-bold d-block my-0.5" style={{ fontSize: 20 }}>{criticalItems.length} Bahan</strong>
              <span className="text-danger font-weight-medium" style={{ fontSize: 11 }}>Stok Menipis & Kritis</span>
            </div>
            <div className="corpox-icon-box red" style={{ width: 38, height: 38, fontSize: 18 }}>
              <i className="ri-alarm-warning-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Total Nilai Stok Fisik</span>
              <strong className="text-dark font-weight-bold d-block my-0.5" style={{ fontSize: 20 }}>
                Rp {totalValuation.toLocaleString('id-ID')}
              </strong>
              <span className="text-primary font-weight-medium" style={{ fontSize: 11 }}>Valuasi Aset Gudang</span>
            </div>
            <div className="corpox-icon-box blue" style={{ width: 38, height: 38, fontSize: 18 }}>
              <i className="ri-money-dollar-circle-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card-box p-3.5 border bg-white rounded-4 shadow-sm h-100 d-flex justify-content-between align-items-center">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Kondisi Gudang Simpan</span>
              <strong className="text-success font-weight-bold d-block my-0.5" style={{ fontSize: 20 }}>Optimal (100%)</strong>
              <span className="text-muted font-weight-medium" style={{ fontSize: 11 }}>Suhu & Sanitasi Terjaga</span>
            </div>
            <div className="corpox-icon-box emerald" style={{ width: 38, height: 38, fontSize: 18 }}>
              <i className="ri-shield-check-line"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Form Input Penerimaan Barang Baru (Ergonomic & Spacious) */}
      {isAllowedToEdit && (
        <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
          <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
            <div>
              <h4 className="font-weight-bold text-dark m-0" style={{ fontSize: 15 }}>
                <i className="ri-add-circle-line text-success me-1.5"></i> Formulir Penerimaan Barang Masuk ke Gudang
              </h4>
              <p className="text-muted mb-0 mt-0.5" style={{ fontSize: 12.5 }}>
                Pencatatan persediaan fisik pupuk, bibit, pestisida, BBM solar, & peralatan kebun
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn btn-sm btn-outline-success font-weight-bold px-3 py-1.5 rounded-2 d-inline-flex align-items-center gap-1.5 shadow-xs"
              style={{ fontSize: 12 }}
            >
              <i className={showAddForm ? 'ri-close-line' : 'ri-add-line'}></i>
              <span>{showAddForm ? 'Tutup Formulir' : 'Catat Barang Masuk'}</span>
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddStock} className="p-3.5 bg-light rounded-3 border space-y-3">
              <div className="row g-3">
                <div className="col-12 col-md-5">
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                    Nama Barang / Material <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="misal: Pupuk Organik Cair Hayati Bio-Grow"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                    style={{ fontSize: 13 }}
                    required
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                    Kategori Barang
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="form-select p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                    style={{ fontSize: 13 }}
                  >
                    <option value="PUPUK">Pupuk & Dolomit</option>
                    <option value="BIBIT">Bibit Tanaman</option>
                    <option value="PESTISIDA">Pestisida & Bio-Proteksi</option>
                    <option value="BBM">BBM Solar Traktor</option>
                    <option value="PERALATAN">Peralatan & Sparepart</option>
                  </select>
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                    Lokasi Gudang Penyimpanan
                  </label>
                  <input
                    type="text"
                    value={warehouse}
                    onChange={(e) => setWarehouse(e.target.value)}
                    className="form-control p-2.5 bg-white border rounded-3 text-dark font-weight-medium"
                    style={{ fontSize: 13 }}
                    required
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                    Jumlah Stok Masuk <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="500"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="form-control p-2.5 bg-white border text-dark font-weight-bold"
                      style={{ fontSize: 13 }}
                      required
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="form-select bg-light border text-dark font-weight-bold"
                      style={{ maxWidth: 90, fontSize: 12 }}
                    >
                      <option value="Kg">Kg</option>
                      <option value="Liter">Liter</option>
                      <option value="Batang">Batang</option>
                      <option value="Unit">Unit</option>
                      <option value="Zak">Zak</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                    Batas Minimum Aman (Safety Stock)
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    value={minStock}
                    onChange={(e) => setMinStock(e.target.value)}
                    className="form-control p-2.5 bg-white border text-dark"
                    style={{ fontSize: 13 }}
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>
                    Harga Beli Satuan (Rp) <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-muted font-weight-bold" style={{ fontSize: 12 }}>Rp</span>
                    <input
                      type="number"
                      placeholder="15000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="form-control p-2.5 bg-white border text-dark font-weight-bold"
                      style={{ fontSize: 13 }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 pt-2 border-top">
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
                  <i className="ri-save-line"></i>
                  <span>Simpan ke Register Stok</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tabel Monitoring Stok Gudang */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        {/* Search & Category Filter Toolbar (Neat 1-row flex) */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 pb-2 border-bottom">
          <div className="w-100 w-lg-auto" style={{ maxWidth: '320px' }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-0 text-muted">
                <i className="ri-search-line"></i>
              </span>
              <input
                type="text"
                placeholder="Cari nama bahan atau kode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control bg-light border-0 rounded-end-3"
                style={{ fontSize: 13 }}
              />
            </div>
          </div>

          <div className="d-flex align-items-center gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            <span className="text-muted font-weight-semibold me-1" style={{ fontSize: 12 }}>Kategori:</span>
            {[
              { id: 'ALL', label: 'Semua' },
              { id: 'PUPUK', label: 'Pupuk' },
              { id: 'BIBIT', label: 'Bibit' },
              { id: 'PESTISIDA', label: 'Pestisida' },
              { id: 'BBM', label: 'BBM' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`btn btn-sm px-3 py-1 rounded-pill font-weight-semibold transition ${
                  filterCategory === cat.id ? 'btn-success text-white shadow-xs' : 'btn-light text-slate-600 border'
                }`}
                style={{ fontSize: 12 }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 13 }}>
            <thead>
              <tr>
                <th>NAMA BAHAN & KODE</th>
                <th>KATEGORI</th>
                <th>LOKASI GUDANG</th>
                <th>STOK TERSEDIA</th>
                <th>BATAS AMAN</th>
                <th>HARGA SATUAN</th>
                <th>TOTAL NILAI</th>
                <th className="text-end">STATUS STOK</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const totalVal = item.currentStock * item.unitPriceRp;
                return (
                  <tr key={item.id}>
                    <td>
                      <div>
                        <strong className="text-slate-900 d-block font-weight-bold" style={{ fontSize: 13.5 }}>{item.name}</strong>
                        <span className="text-muted font-mono" style={{ fontSize: 11 }}>{item.code}</span>
                      </div>
                    </td>
                    <td>{getCategoryBadge(item.category)}</td>
                    <td className="text-slate-600">{item.warehouse}</td>
                    <td>
                      <strong className="text-slate-900 font-weight-bold" style={{ fontSize: 13.5 }}>
                        {item.currentStock.toLocaleString('id-ID')} {item.unit}
                      </strong>
                    </td>
                    <td className="text-muted">{item.minStock.toLocaleString('id-ID')} {item.unit}</td>
                    <td className="text-slate-700">Rp {item.unitPriceRp.toLocaleString('id-ID')} / {item.unit}</td>
                    <td className="font-weight-bold text-success" style={{ fontSize: 13.5 }}>
                      Rp {totalVal.toLocaleString('id-ID')}
                    </td>
                    <td className="text-end">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'AMAN'
                          ? 'bg-emerald-500 text-white'
                          : item.status === 'MENIPIS'
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-rose-500 text-white'
                      }`}>
                        {item.status === 'AMAN' ? 'STOK AMAN' : item.status === 'MENIPIS' ? 'MENIPIS' : 'KRITIS'}
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
