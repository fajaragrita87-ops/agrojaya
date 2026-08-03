import { useEffect, useState } from 'react';
import { getFinancials } from '../services/api';
import { useRole } from '../context/RoleContext';
import { FinancialLedgerShowcase } from '../components/FinancialLedgerShowcase';
import { PurchaseOrderInventoryShowcase } from '../components/PurchaseOrderInventoryShowcase';

export const FinancialsPage = () => {
  const { role } = useRole();
  const [financials, setFinancials] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const finRes = await getFinancials();
      setFinancials(finRes.data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportPDF = () => {
    alert('Mengunduh Laporan Arus Kas & Jurnal Keuangan Terverifikasi Audit (PDF)...');
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="card-box p-4 rounded-4 space-y-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <span className="tmp-badge-card blue mb-2 d-inline-block">
              <i className="ri-wallet-3-line me-1"></i> MODUL KEUANGAN OTOMATIS & APPROVAL PO 3-LAYER
            </span>
            <h2 className="font-weight-extrabold text-dark mb-1 !text-base">
              Manajemen Keuangan, Otorisasi PO, & Jurnal Arus Kas Kebun
            </h2>
            <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13 }}>
              Persetujuan Pembelian PO Multi-Layer, Otorisasi Pencairan Dana, & Jurnal Real-Time Laporan Auditor (Mode Akses: {role})
            </p>
          </div>
          <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
            <i className="ri-shield-user-line"></i> Hak Akses: {role}
          </span>
        </div>
      </div>

      {/* 1. Modul Master Data PO, Pengajuan, & Otorisasi Persetujuan Berdasarkan Role */}
      <PurchaseOrderInventoryShowcase />

      {/* 2. Modul Jurnal Arus Kas Ledger & Export PDF BAP Audit */}
      <FinancialLedgerShowcase financials={financials} onExportPDF={handleExportPDF} />
    </div>
  );
};
