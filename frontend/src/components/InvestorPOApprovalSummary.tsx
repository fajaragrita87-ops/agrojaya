import React, { useState, useEffect } from 'react';
import { getPurchases, updatePurchaseStatus } from '../services/api';
import type { PurchaseItem } from './PurchaseOrderInventoryShowcase';

export const InvestorPOApprovalSummary: React.FC = () => {
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

  const pendingInvestorPOs = poList.filter((po) => po.status === 'PENDING_INVESTOR');
  const approvedPOs = poList.filter((po) => po.status === 'APPROVED_WAITING_DISBURSEMENT' || po.status === 'DISBURSED');

  const handleApprovePO = async (id: string, poNumber: string) => {
    try {
      await updatePurchaseStatus(id, { status: 'APPROVED_WAITING_DISBURSEMENT' });
      alert(`Pengadaan ${poNumber} berhasil disetujui untuk pencairan dana!`);
      fetchPOs();
      window.dispatchEvent(new Event('agrojaya-po-updated'));
    } catch (error) {
      alert('Gagal menyetujui pengadaan.');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {/* Pending Approval Section */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <div>
            <h3 className="h6 font-weight-bold text-dark mb-0">
              Pengajuan Belanja Menunggu Persetujuan Investor
            </h3>
            <span className="text-muted" style={{ fontSize: 12 }}>
              Telah diverifikasi oleh Manajer Kebun dan Direktur Operasional
            </span>
          </div>
          <span className={`badge px-3 py-1.5 rounded-pill font-weight-bold ${pendingInvestorPOs.length > 0 ? 'bg-warning text-dark' : 'bg-success text-white'}`} style={{ fontSize: 11.5 }}>
            {pendingInvestorPOs.length > 0 ? `${pendingInvestorPOs.length} Berkas Menunggu` : 'Semua Berkas Selesai'}
          </span>
        </div>

        {loading && pendingInvestorPOs.length === 0 ? (
          <div className="p-3 text-center text-muted" style={{ fontSize: 13 }}>Memuat data pengadaan...</div>
        ) : pendingInvestorPOs.length > 0 ? (
          <div className="space-y-3 pt-1">
            {pendingInvestorPOs.map((po) => (
              <div key={po.id} className="p-3.5 rounded-3 border bg-light d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div className="space-y-1">
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-dark text-white font-mono font-weight-bold" style={{ fontSize: 11 }}>{po.poNumber}</span>
                    <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 10.5 }}>{po.category}</span>
                  </div>
                  <strong className="text-dark d-block" style={{ fontSize: 14 }}>{po.itemName}</strong>
                  <p className="text-secondary mb-0" style={{ fontSize: 12 }}>
                    📍 <b>{po.targetLand}</b> • {po.usageDetails}
                  </p>
                </div>

                <div className="text-start text-md-end d-flex flex-column align-items-md-end gap-1.5">
                  <span className="text-muted font-weight-bold" style={{ fontSize: 11 }}>Total Anggaran:</span>
                  <strong className="text-success font-weight-extrabold" style={{ fontSize: 18 }}>
                    Rp {po.totalPrice?.toLocaleString('id-ID')}
                  </strong>
                  <button
                    onClick={() => handleApprovePO(po.id, po.poNumber)}
                    className="btn btn-success text-white font-weight-bold px-3 py-1.5 rounded-2 shadow-xs d-inline-flex align-items-center gap-1.5"
                    style={{ fontSize: 12 }}
                  >
                    <i className="ri-checkbox-circle-line"></i>
                    <span>Setujui Pengadaan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3.5 bg-success-subtle rounded-3 border border-success text-success d-flex align-items-center gap-2.5">
            <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: 20 }}></i>
            <span className="font-weight-bold" style={{ fontSize: 13 }}>
              Tidak ada pengajuan belanja yang menunggu persetujuan. Anggaran modal terkendali.
            </span>
          </div>
        )}
      </div>

      {/* Approved History Table */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
          <div>
            <h4 className="font-weight-bold text-dark m-0 !text-sm">
              Riwayat Pengadaan yang Disetujui ({approvedPOs.length})
            </h4>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 12.5 }}>
            <thead className="table-light">
              <tr style={{ fontSize: 11.5 }}>
                <th>NO. PO</th>
                <th>BARANG / MATERIAL</th>
                <th>LOKASI BLOK</th>
                <th>NOMINAL BIAYA</th>
                <th>TANGGAL DISETUJUI</th>
                <th className="text-end">STATUS PENCAIRAN</th>
              </tr>
            </thead>
            <tbody>
              {approvedPOs.map((po) => (
                <tr key={po.id}>
                  <td><span className="badge bg-light text-dark border font-mono">{po.poNumber}</span></td>
                  <td className="font-weight-bold text-dark">{po.itemName}</td>
                  <td className="text-secondary">{po.targetLand}</td>
                  <td className="font-weight-bold text-success">Rp {po.totalPrice?.toLocaleString('id-ID')}</td>
                  <td className="text-muted">{formatDate(po.investorApprovedAt)}</td>
                  <td className="text-end">
                    <span className="badge bg-success text-white font-weight-bold" style={{ fontSize: 11 }}>
                      {po.status === 'DISBURSED' ? 'DANA SUDAH CAIR' : 'DISETUJUI'}
                    </span>
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
