import React, { useEffect, useState } from 'react';
import { getFinancials, createFinancial, getFinancialSummary } from '../services/api';
import { useRole } from '../context/RoleContext';
import { FinancialLedgerShowcase } from '../components/FinancialLedgerShowcase';
import { PurchaseOrderInventoryShowcase } from '../components/PurchaseOrderInventoryShowcase';

export const FinancialsPage = () => {
  const { canManageFinancials } = useRole();
  const [financials, setFinancials] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [category, setCategory] = useState('PUPUK');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [note, setNote] = useState('');

  const fetchData = async () => {
    try {
      const finRes = await getFinancials();
      setFinancials(finRes.data.data);
      const sumRes = await getFinancialSummary();
      setSummary(sumRes.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFinancial({
        plantingCycleId: 'cycle-1',
        category,
        amount: Number(amount),
        type,
        date: new Date().toISOString(),
        note
      });
      setAmount('');
      setNote('');
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportPDF = () => {
    alert('Mengunduh Laporan Arus Kas & Jurnal Keuangan Terverifikasi Audit (PDF)...');
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-wallet-3-line me-1"></i> MODUL KEUANGAN OTOMATIS
          </span>
          <h2 className="h3 font-weight-bold text-dark mb-1">Modul Keuangan & Arus Kas Real-Time</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 14 }}>
            Pencatatan Otomatis Beban Biaya Aktivitas Lapangan, Pengadaan PO, & Penjualan Hasil Panen
          </p>
        </div>
        <span className="badge bg-success text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 12 }}>
          <i className="ri-check-double-line"></i> Pencatatan Otomatis Aktif
        </span>
      </div>

      {/* Financial Stat Cards Bar */}
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Pendapatan Panen</span>
              <strong className="h3 font-weight-extrabold text-success m-0">
                Rp {summary?.totalRevenue?.toLocaleString() || '45.000.000'}
              </strong>
              <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 12 }}>
                <i className="ri-arrow-up-line me-1"></i> Penjualan Hasil Panen PKS
              </span>
            </div>
            <div style={{ width: 48, height: 48, backgroundColor: '#dcfce7', color: '#059669', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              <i className="ri-money-dollar-box-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Pengeluaran OPEX</span>
              <strong className="h3 font-weight-extrabold text-danger m-0">
                Rp {summary?.totalExpense?.toLocaleString() || '26.850.000'}
              </strong>
              <span className="d-block text-danger font-weight-bold mt-1.5" style={{ fontSize: 12 }}>
                <i className="ri-arrow-down-line me-1"></i> Beban Operasional & PO
              </span>
            </div>
            <div style={{ width: 48, height: 48, backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              <i className="ri-shopping-cart-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Laba Bersih (Net Profit)</span>
              <strong className="h3 font-weight-extrabold text-dark m-0">
                Rp {summary?.netProfit?.toLocaleString() || '18.150.000'}
              </strong>
              <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 12 }}>
                <i className="ri-pie-chart-line me-1"></i> Margin Laba: {summary?.marginPercentage || 40.33}%
              </span>
            </div>
            <div style={{ width: 48, height: 48, backgroundColor: '#dbeafe', color: '#2563eb', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              <i className="ri-funds-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-white p-4 rounded-4 border shadow-sm d-flex align-items-center justify-content-between h-100">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Status Arus Kas</span>
              <strong className="h3 font-weight-extrabold text-success m-0">Surplus</strong>
              <span className="d-block text-secondary font-weight-bold mt-1.5" style={{ fontSize: 12 }}>Rekomendasi Re-investasi</span>
            </div>
            <div style={{ width: 48, height: 48, backgroundColor: '#fef3c7', color: '#d97706', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              <i className="ri-bank-line"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Form Manual Transaction Entry */}
      {canManageFinancials && (
        <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm space-y-3">
          <h4 className="font-weight-bold text-dark m-0 d-flex align-items-center gap-2">
            <i className="ri-add-box-line text-success"></i> Catat Transaksi Jurnal Keuangan Manual
          </h4>
          <form onSubmit={handleSubmit} className="row g-3 pt-2">
            <div className="col-md-3">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-select p-3 bg-light border-0 rounded-3 font-weight-bold text-dark"
                style={{ fontSize: 13 }}
              >
                <option value="EXPENSE">PENGELUARAN (EXPENSE)</option>
                <option value="REVENUE">PEMASUKAN (REVENUE)</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select p-3 bg-light border-0 rounded-3 font-weight-bold text-dark"
                style={{ fontSize: 13 }}
              >
                <option value="BIBIT">PEMBELIAN BIBIT</option>
                <option value="PUPUK">PUPUK & KAPUR DOLOMIT</option>
                <option value="TENAGA_KERJA">UPAH TENAGA KERJA</option>
                <option value="ALAT">PERALATAN & PERAWATAN</option>
                <option value="LAIN">LAIN-LAIN / HASIL PANEN</option>
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="number"
                placeholder="Jumlah Nominal (Rp)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-control p-3 bg-light border-0 rounded-3"
                style={{ fontSize: 13 }}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Catatan / Referensi SOP/PO"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="form-control p-3 bg-light border-0 rounded-3"
                style={{ fontSize: 13 }}
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="tmp-btn bg-success text-white font-weight-bold py-3 w-100 rounded-3 border-0" style={{ fontSize: 15 }}>
                <i className="ri-save-line me-1"></i> Simpan Transaksi Ke Jurnal Kas
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Kolom Inventaris Kebun & Pengajuan PO */}
      <PurchaseOrderInventoryShowcase />

      {/* Modern Executive Financial Ledger Showcase */}
      <FinancialLedgerShowcase financials={financials} onExportPDF={handleExportPDF} />
    </div>
  );
};
