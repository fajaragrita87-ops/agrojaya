import React, { useState } from 'react';
import { useRole } from '../context/RoleContext';

export interface FinancialRecord {
  id: string | number;
  date: string;
  category: string;
  note: string;
  type: 'REVENUE' | 'EXPENSE' | 'PEMASUKAN' | 'PENGELUARAN';
  amount: number;
  pic?: string;
  location?: string;
  bapNo?: string;
}

interface FinancialLedgerShowcaseProps {
  financials: FinancialRecord[];
  onExportPDF: () => void;
}

export const FinancialLedgerShowcase: React.FC<FinancialLedgerShowcaseProps> = ({ financials, onExportPDF }) => {
  const { role, userName } = useRole();
  const [filterType, setFilterType] = useState<'ALL' | 'REVENUE' | 'EXPENSE'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Custom OPEX Submission
  const [customNote, setCustomNote] = useState('');
  const [customCategory, setCustomCategory] = useState('PUPUK_ORGANIK');
  const [customLocation, setCustomLocation] = useState('Blok A2 - Lahan Porang (2.0 Ha)');
  const [customPic, setCustomPic] = useState(userName || 'Budi Santoso, S.P. (Manajer Ops)');
  const [customAmount, setCustomAmount] = useState('1500000');
  const [customBap, setCustomBap] = useState(`BAP-OPEX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [customNotesDetail, setCustomNotesDetail] = useState('');

  // Initial Seed Data if financials prop is empty
  const initialData: FinancialRecord[] = [
    {
      id: 'OPEX-001',
      date: '2026-08-01',
      category: 'PUPUK_ORGANIK',
      note: 'Pengadaan Pupuk NPK & Dolomit Kebun Jonggol (PO-2026-0801)',
      type: 'EXPENSE',
      amount: 18000000,
      pic: 'Budi Santoso, S.P.',
      location: 'Blok A2 & B1',
      bapNo: 'BAP-PUPUK-2026-0801',
    },
    {
      id: 'REV-001',
      date: '2026-06-20',
      category: 'PENJUALAN_PANEN',
      note: 'Penjualan Perdana Anggur Impor Shine Muscat & Melon Intanon',
      type: 'REVENUE',
      amount: 42000000,
      pic: 'Tim Pemasaran AgroJaya',
      location: 'Greenhouse Blok A1',
      bapNo: 'BAP-SALES-2026-0620',
    },
    {
      id: 'OPEX-002',
      date: '2026-08-03',
      category: 'TENAGA_KERJA',
      note: 'Upah Harian & Insentif Perawatan 18 Petani Lapangan',
      type: 'EXPENSE',
      amount: 8850000,
      pic: 'Pak Joko Sukardi (Kepala Kebun)',
      location: 'Seluruh Blok Kebun',
      bapNo: 'BAP-SDM-2026-0803',
    },
    {
      id: 'OPEX-003',
      date: '2026-07-28',
      category: 'PERALATAN_IRIGASI',
      note: 'Perawatan Pompa Drip Irigasi Satelit & Beli Solar B35 Traktor',
      type: 'EXPENSE',
      amount: 4500000,
      pic: 'M. Arifin (Mekanik)',
      location: 'Workshop Bengkel',
      bapNo: 'BAP-ALAT-2026-0728',
    },
  ];

  const [records, setRecords] = useState<FinancialRecord[]>(
    financials && financials.length > 0
      ? financials.map((f, idx) => ({
          ...f,
          id: f.id || `TX-${idx + 1}`,
          pic: f.pic || 'Budi Santoso, S.P.',
          location: f.location || 'Kebun Inti Jonggol',
          bapNo: f.bapNo || `BAP-OPEX-2026-${100 + idx}`,
        }))
      : initialData
  );

  const formatDateLabel = (dateStr: string) => {
    if (!dateStr) return '-';
    try {
      const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
      const parts = cleanDate.split('-');
      if (parts.length === 3) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const day = parts[2];
        const monthIdx = parseInt(parts[1], 10) - 1;
        const year = parts[0];
        return `${day} ${months[monthIdx] || parts[1]} ${year}`;
      }
      return cleanDate;
    } catch {
      return dateStr;
    }
  };

  const handleAddOpex = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNote.trim()) {
      alert('Mohon isi jenis atau keterangan biaya pengajuan OPEX!');
      return;
    }

    const nominalNum = parseFloat(customAmount.replace(/[^0-9]/g, '')) || 0;
    if (nominalNum <= 0) {
      alert('Nominal pengajuan harus lebih dari Rp 0!');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const newRecord: FinancialRecord = {
      id: `OPEX-${String(records.length + 1).padStart(3, '0')}`,
      date: todayStr,
      category: customCategory,
      note: customNote.trim(),
      type: 'EXPENSE',
      amount: nominalNum,
      pic: customPic,
      location: customLocation,
      bapNo: customBap,
    };

    setRecords([newRecord, ...records]);
    setIsModalOpen(false);
    setCustomNote('');
    setCustomAmount('1500000');
    setCustomNotesDetail('');
    alert(`✅ Pengajuan Biaya OPEX "${newRecord.note}" sebesar Rp ${nominalNum.toLocaleString('id-ID')} Berhasil Didaftarkan ke Jurnal!`);
  };

  const totalRevenue = records
    .filter((f) => f.type === 'REVENUE' || f.type === 'PEMASUKAN')
    .reduce((sum, f) => sum + Number(f.amount), 0);

  const totalExpense = records
    .filter((f) => f.type === 'EXPENSE' || f.type === 'PENGELUARAN')
    .reduce((sum, f) => sum + Number(f.amount), 0);

  const netCashflow = totalRevenue - totalExpense;

  const filteredData = records.filter((item) => {
    if (filterType === 'REVENUE') return item.type === 'REVENUE' || item.type === 'PEMASUKAN';
    if (filterType === 'EXPENSE') return item.type === 'EXPENSE' || item.type === 'PENGELUARAN';
    return true;
  });

  const getCategoryBadge = (category: string) => {
    const cat = category.toUpperCase();
    if (cat.includes('TENAGA') || cat.includes('PAYROLL') || cat.includes('GAJI') || cat.includes('SDM')) {
      return { label: 'Upah Petani & SDM', bg: '#dbeafe', color: '#1e40af' };
    }
    if (cat.includes('PUPUK') || cat.includes('NUTRISI') || cat.includes('KIMIA')) {
      return { label: 'Pupuk & Kimia', bg: '#dcfce7', color: '#166534' };
    }
    if (cat.includes('PANEN') || cat.includes('JUAL') || cat.includes('PENJUALAN')) {
      return { label: 'Hasil Penjualan Panen', bg: '#fef3c7', color: '#92400e' };
    }
    if (cat.includes('IRIGASI') || cat.includes('ALAT') || cat.includes('MESIN') || cat.includes('BBM')) {
      return { label: 'Alat & Bahan Bakar', bg: '#f3e8ff', color: '#6b21a8' };
    }
    if (cat.includes('PROTEKSI') || cat.includes('HAMA') || cat.includes('OBAT')) {
      return { label: 'Proteksi Hama Hayati', bg: '#fee2e2', color: '#991b1b' };
    }
    return { label: category.replace('_', ' '), bg: '#f1f5f9', color: '#334155' };
  };

  // Check if role is allowed to submit OPEX
  const canSubmitOpex = role === 'MANAGER' || role === 'KEPALA_KEBUN' || role === 'DIREKTUR' || role === 'FINANCE';

  return (
    <div className="space-y-4">
      {/* 3 Summary KPI Cards */}
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="card-box p-3.5 rounded-4 border bg-white shadow-sm d-flex align-items-center justify-content-between">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Total Pemasukan</span>
              <strong className="text-success font-weight-extrabold d-block" style={{ fontSize: 20 }}>
                +Rp {totalRevenue.toLocaleString('id-ID')}
              </strong>
            </div>
            <div className="corpox-icon-box emerald" style={{ width: 36, height: 36, fontSize: 18 }}>
              <i className="ri-arrow-down-circle-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card-box p-3.5 rounded-4 border bg-white shadow-sm d-flex align-items-center justify-content-between">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Total Pengeluaran</span>
              <strong className="text-danger font-weight-extrabold d-block" style={{ fontSize: 20 }}>
                -Rp {totalExpense.toLocaleString('id-ID')}
              </strong>
            </div>
            <div className="corpox-icon-box red" style={{ width: 36, height: 36, fontSize: 18 }}>
              <i className="ri-arrow-up-circle-line"></i>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card-box p-3.5 rounded-4 border bg-white shadow-sm d-flex align-items-center justify-content-between">
            <div>
              <span className="text-uppercase text-muted font-weight-bold d-block" style={{ fontSize: 11 }}>Saldo Kas Bersih</span>
              <strong className={`font-weight-extrabold d-block ${netCashflow >= 0 ? 'text-primary' : 'text-danger'}`} style={{ fontSize: 20 }}>
                Rp {netCashflow.toLocaleString('id-ID')}
              </strong>
            </div>
            <div className="corpox-icon-box blue" style={{ width: 36, height: 36, fontSize: 18 }}>
              <i className="ri-wallet-3-line"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Table Card */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 pb-2 border-bottom">
          <div className="d-flex flex-wrap align-items-center gap-1.5">
            <span className="text-muted font-weight-bold" style={{ fontSize: 11 }}>Filter Transaksi:</span>
            {[
              { id: 'ALL', label: 'Semua Transaksi' },
              { id: 'REVENUE', label: 'Pemasukan (+)' },
              { id: 'EXPENSE', label: 'Pengeluaran (-)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`btn btn-sm px-3 py-1 rounded-pill font-weight-bold ${
                  filterType === f.id ? 'btn-success text-white' : 'btn-outline-secondary'
                }`}
                style={{ fontSize: 11.5 }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2">
            {canSubmitOpex && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn btn-success text-white font-weight-bold px-3.5 py-1.5 rounded-pill shadow-xs d-inline-flex align-items-center gap-1.5 cursor-pointer"
                style={{ fontSize: 12 }}
              >
                <i className="ri-add-circle-fill"></i>
                <span>+ Ajukan Biaya OPEX Baru</span>
              </button>
            )}

            <button
              onClick={onExportPDF}
              className="btn btn-outline-secondary font-weight-bold px-3 py-1.5 rounded-pill d-inline-flex align-items-center gap-1.5 shadow-xs"
              style={{ fontSize: 11.5 }}
            >
              <i className="ri-file-pdf-line text-danger"></i>
              <span>Unduh Laporan PDF</span>
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: 12.5 }}>
            <thead className="table-light">
              <tr style={{ fontSize: 11.5 }}>
                <th>TANGGAL</th>
                <th>KATEGORI</th>
                <th>KETERANGAN BIAYA / TRANSAKSI</th>
                <th>LOKASI & PEMOHON</th>
                <th>ARUS KAS</th>
                <th className="text-end">NOMINAL (RP)</th>
                <th className="text-end">BERITA ACARA</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record) => {
                const badge = getCategoryBadge(record.category);
                const isRev = record.type === 'REVENUE' || record.type === 'PEMASUKAN';
                return (
                  <tr key={record.id}>
                    <td className="text-dark font-weight-medium" style={{ whiteSpace: 'nowrap' }}>
                      {formatDateLabel(record.date)}
                    </td>
                    <td>
                      <span
                        className="badge font-weight-bold px-2 py-0.5 rounded-pill"
                        style={{ backgroundColor: badge.bg, color: badge.color, fontSize: 10.5 }}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td className="font-weight-bold text-dark">
                      <div>{record.note}</div>
                      <span className="text-muted font-monospace" style={{ fontSize: 10.5 }}>ID: {record.id}</span>
                    </td>
                    <td style={{ fontSize: 11.5 }}>
                      <div className="text-dark font-weight-medium">{record.location || 'Kebun Jonggol'}</div>
                      <span className="text-muted">PIC: {record.pic || 'Budi Santoso'}</span>
                    </td>
                    <td>
                      <span className={`badge font-weight-bold ${isRev ? 'bg-success-subtle text-success border border-success' : 'bg-danger-subtle text-danger border border-danger'}`} style={{ fontSize: 10.5 }}>
                        {isRev ? 'MASUK' : 'KELUAR'}
                      </span>
                    </td>
                    <td className={`text-end font-weight-extrabold font-mono ${isRev ? 'text-success' : 'text-danger'}`} style={{ fontSize: 13, whiteSpace: 'nowrap' }}>
                      {isRev ? '+' : '-'} Rp {Number(record.amount).toLocaleString('id-ID')}
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        onClick={() => alert(`Mengunduh Berita Acara Pekerjaan & Nota Bukti Fisik: ${record.bapNo || record.id}.pdf`)}
                        className="btn btn-sm btn-outline-primary font-weight-bold px-2 py-0.5 rounded-2 d-inline-flex align-items-center gap-1"
                        style={{ fontSize: 10.5 }}
                      >
                        <i className="ri-file-text-line"></i>
                        <span>{record.bapNo || 'BAP-OPEX'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================== MODAL PENGAJUAN OPEX BARU (MANAGER / KEPALA KEBUN) ==================== */}
      {isModalOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              <div className="modal-header bg-[#0F5545] text-white p-3.5 border-0">
                <div className="d-flex align-items-center gap-2">
                  <div className="w-8 h-8 rounded-circle bg-white/20 d-flex align-items-center justify-content-center text-white">
                    <i className="ri-wallet-3-fill"></i>
                  </div>
                  <div>
                    <h5 className="modal-title font-weight-bold m-0 text-white" style={{ fontSize: 16 }}>
                      Formulir Pengajuan Biaya Operasional (OPEX)
                    </h5>
                    <span className="text-white-50" style={{ fontSize: 11 }}>
                      Diajukan oleh Manager / Kepala Kebun untuk kebutuhan harian kebun
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-close btn-close-white cursor-pointer"
                ></button>
              </div>

              <form onSubmit={handleAddOpex}>
                <div className="modal-body p-4 space-y-3">
                  <div className="row g-3">
                    {/* Jenis / Keterangan Biaya (Diisi Sendiri/Bebas) */}
                    <div className="col-12">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Jenis / Keterangan Biaya (Diisi Sendiri Sesuai Kebutuhan): <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={customNote}
                        onChange={(e) => setCustomNote(e.target.value)}
                        placeholder="Contoh: Pengadaan 15 Zak Kapur Dolomit & 50 Liter Solar Traktor B35"
                        className="form-control rounded-3"
                        style={{ fontSize: 13 }}
                      />
                      <span className="text-muted mt-1 d-block" style={{ fontSize: 11 }}>
                        Tuliskan rincian barang, jasa, upah, atau perbaikan alat yang diajukan.
                      </span>
                    </div>

                    {/* Kategori Biaya & Lokasi Blok */}
                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Kategori Pos Biaya:
                      </label>
                      <select
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="form-select form-select-sm rounded-3"
                      >
                        <option value="PUPUK_ORGANIK">Pupuk Organik & Nutrisi Kimia</option>
                        <option value="TENAGA_KERJA">Upah Tenaga Kerja / Harian Petani</option>
                        <option value="PERALATAN_IRIGASI">Bahan Bakar Mesin & Irigasi Satelit</option>
                        <option value="PROTEKSI_HAMA">Bio-Proteksi Hama & Pestisida Hayati</option>
                        <option value="BIBIT_BENIH">Bibit / Katak Porang / Benih F1</option>
                        <option value="LOGISTIK_UMUM">Logistik & Pemeliharaan Umum</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Lokasi Blok / Site Penyerapan:
                      </label>
                      <select
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        className="form-select form-select-sm rounded-3"
                      >
                        <option value="Blok A1 - Greenhouse Melon Golden">Blok A1 - Greenhouse Melon Golden</option>
                        <option value="Blok A2 - Lahan Porang (2.0 Ha)">Blok A2 - Lahan Porang (2.0 Ha)</option>
                        <option value="Blok B1 - Hortikultura Melon Premium">Blok B1 - Hortikultura Melon Premium</option>
                        <option value="Blok C1 - Cabai Rawit Ori 212">Blok C1 - Cabai Rawit Ori 212</option>
                        <option value="Workshop & Gudang Jonggol">Workshop & Gudang Jonggol</option>
                        <option value="Seluruh Blok Kebun Jonggol">Seluruh Blok Kebun Jonggol</option>
                      </select>
                    </div>

                    {/* Pemohon (PIC) & Nominal (Rp) */}
                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Nama Pemohon / Penanggung Jawab (PIC):
                      </label>
                      <select
                        value={customPic}
                        onChange={(e) => setCustomPic(e.target.value)}
                        className="form-select form-select-sm rounded-3"
                      >
                        <option value="Budi Santoso, S.P. (Manajer Ops)">Budi Santoso, S.P. (Manajer Operasional)</option>
                        <option value="Pak Joko Sukardi (Kepala Kebun)">Pak Joko Sukardi (Kepala Kebun)</option>
                        <option value="Ahmad Hidayat (Mandor Logistik)">Ahmad Hidayat (Mandor Logistik)</option>
                        <option value="Rahmat Hidayat (Teknisi Irigasi)">Rahmat Hidayat (Teknisi Irigasi)</option>
                        <option value="Kang Asep (Koordinator Regu A)">Kang Asep (Koordinator Regu A)</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Nominal Biaya Diajukan (Rp): <span className="text-danger">*</span>
                      </label>
                      <div className="input-group input-group-sm">
                        <span className="input-group-text font-weight-bold">Rp</span>
                        <input
                          type="number"
                          required
                          min={1000}
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Contoh: 1500000"
                          className="form-control rounded-end-3 font-weight-bold text-dark"
                        />
                      </div>
                    </div>

                    {/* Nomor BAP & Keterangan Tambahan */}
                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Nomor Berita Acara / Nota Fisik (BAP):
                      </label>
                      <input
                        type="text"
                        required
                        value={customBap}
                        onChange={(e) => setCustomBap(e.target.value)}
                        className="form-control form-control-sm rounded-3 font-monospace"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Urgensi Kebutuhan:
                      </label>
                      <select className="form-select form-select-sm rounded-3">
                        <option value="NORMAL">Rutin (Siklus Mingguan)</option>
                        <option value="URGENT">Mendesak (Proteksi Hama / Cuaca)</option>
                        <option value="PLANNED">Terencana (Fase Tanam Baru)</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Catatan & Alasan Kebutuhan Lapangan:
                      </label>
                      <textarea
                        rows={2}
                        value={customNotesDetail}
                        onChange={(e) => setCustomNotesDetail(e.target.value)}
                        placeholder="Contoh: Dibutuhkan segera untuk pemupukan susulan fase vegetatif Blok A2 guna mengejar target bobot umbi..."
                        className="form-control form-control-sm rounded-3"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light p-3 border-top d-flex justify-content-between">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-sm btn-outline-secondary font-weight-bold px-3 rounded-pill cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm btn-success font-weight-bold px-4 rounded-pill shadow-sm d-inline-flex align-items-center gap-1.5 cursor-pointer"
                  >
                    <i className="ri-send-plane-fill"></i>
                    <span>Ajukan Biaya OPEX Sekarang</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
