import React, { useState, useEffect } from 'react';
import { useRole } from '../context/RoleContext';

export interface LifecycleStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  kearifanLokalNotes: string;
  progressPercent: number;
  status: 'SELESAI' | 'SEDANG BERJALAN' | 'TAHAP BERIKUTNYA';
  statusRaw: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING';
  opexEstimateRp: number;
  photoUrl: string;
  durationDays: string;
  targetMetrics: string;
  updatedBy?: string;
  updatedAt?: string;
}

export const INITIAL_LIFECYCLE_STEPS: LifecycleStep[] = [
  {
    stepNumber: 1,
    title: 'Pembukaan & Pembabatan Lahan',
    subtitle: 'Pembersihan Semak Belukar Tropis & Sanitasi Lahan',
    description: 'Pembersihan fisik vegetasi liar, pembabatan semak tropis, serta pemetaan batas topografi geofencing lokasi kebun Jonggol.',
    kearifanLokalNotes: 'Penggunaan alat mekanis ramah lingkungan tanpa pembakaran lahan (Standar Tanpa Bakar Indonesia).',
    progressPercent: 100,
    status: 'SELESAI',
    statusRaw: 'COMPLETED',
    opexEstimateRp: 25000000,
    photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    durationDays: '14 Hari',
    targetMetrics: 'Bebas Tunggul 100%',
    updatedBy: 'Rahmat Hidayat (Kepala Kebun)',
    updatedAt: '25 Jul 2026',
  },
  {
    stepNumber: 2,
    title: 'Penggarapan & Pembajakan Tanah',
    subtitle: 'Pembuatan Bedengan Subur & Saluran Drainase',
    description: 'Penggemburan struktur tanah aluvial/latosol dengan traktor pembajak Kubota untuk aerasi udara dan pembuatan saluran drainase.',
    kearifanLokalNotes: 'Pengaturan arah bedengan membujur Utara-Selatan mengoptimalkan pencahayaan sinar matahari tropis.',
    progressPercent: 100,
    status: 'SELESAI',
    statusRaw: 'COMPLETED',
    opexEstimateRp: 18500000,
    photoUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80',
    durationDays: '10 Hari',
    targetMetrics: 'Kedalaman Olah 40 cm',
    updatedBy: 'Rahmat Hidayat (Kepala Kebun)',
    updatedAt: '28 Jul 2026',
  },
  {
    stepNumber: 3,
    title: 'Fermentasi Tanah & Bio-Pupuk',
    subtitle: 'Pengayaan Kapur Dolomit & Kompos Bio-Organik',
    description: 'Aplikasi kapur dolomit penyeimbang pH tanah serta pemberian pupuk organik yang difermentasi mikroba lokal.',
    kearifanLokalNotes: 'Memanfaatkan racikan kompos bio-fermentasi lokal untuk menaikkan pH tanah dari 4.5 menjadi 6.5 netral.',
    progressPercent: 100,
    status: 'SELESAI',
    statusRaw: 'COMPLETED',
    opexEstimateRp: 15000000,
    photoUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=80',
    durationDays: '15 Hari',
    targetMetrics: 'pH Tanah Ideal 6.5',
    updatedBy: 'Rahmat Hidayat (Kepala Kebun)',
    updatedAt: '01 Aug 2026',
  },
  {
    stepNumber: 4,
    title: 'Penanaman Bibit Unggul Sertifikasi',
    subtitle: 'Transplantasi Bibit Sertifikasi Balai Benih',
    description: 'Penanaman bibit varietas unggul tersertifikasi Balai Benih Indonesia (Anggur Shine Muscat / Porang / Sawit Tenera / Melon Intanon).',
    kearifanLokalNotes: 'Bibit bersertifikasi resmi dengan tingkat kelangsungan hidup di atas 98%.',
    progressPercent: 85,
    status: 'SEDANG BERJALAN',
    statusRaw: 'IN_PROGRESS',
    opexEstimateRp: 35000000,
    photoUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1000&q=80',
    durationDays: '20 Hari',
    targetMetrics: 'Kepadatan 500 Pohon/Ha',
    updatedBy: 'Budi Santoso, S.P. (Manajer Ops)',
    updatedAt: '03 Aug 2026',
  },
  {
    stepNumber: 5,
    title: 'Perawatan & Fertigasi Presisi',
    subtitle: 'Pemupukan Berjadwal Presisi & Sensor BMKG',
    description: 'Pemupukan NPK berjadwal presisi dan penyiraman sistem irigasi tetes (drip fertigation) terhubung sensor BMKG real-time.',
    kearifanLokalNotes: 'Jadwal pemupukan menyesuaikan BMKG presisi untuk mencegah kehilangan nutrisi akibat erosi air hujan.',
    progressPercent: 60,
    status: 'SEDANG BERJALAN',
    statusRaw: 'IN_PROGRESS',
    opexEstimateRp: 28000000,
    photoUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80',
    durationDays: 'Berjalan Rutin',
    targetMetrics: 'Efisiensi Pupuk 95%',
    updatedBy: 'Rahmat Hidayat (Kepala Kebun)',
    updatedAt: '03 Aug 2026',
  },
  {
    stepNumber: 6,
    title: 'Panen Raya & Grading Kualitas',
    subtitle: 'Pemetikan Hasil Panen & Seleksi Mutu Ekspor',
    description: 'Pemetikan hasil panen puncak komoditas dengan sortir kualitas ketat (Grade A super premium untuk pasar ekspor/supermarket).',
    kearifanLokalNotes: 'Teknik potong janjang matang panen optimal dengan standar losase di bawah 0.5%.',
    progressPercent: 40,
    status: 'TAHAP BERIKUTNYA',
    statusRaw: 'UPCOMING',
    opexEstimateRp: 22000000,
    photoUrl: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1000&q=80',
    durationDays: '30 Hari',
    targetMetrics: 'Target Yield 24 Ton/Ha',
    updatedBy: 'Rahmat Hidayat (Kepala Kebun)',
    updatedAt: '02 Aug 2026',
  },
  {
    stepNumber: 7,
    title: 'Penimbangan Digital Tonase PKS',
    subtitle: 'Jembatan Timbang Truk Digital Anti-Tamper',
    description: 'Penimbangan bruto, tarra, dan netto di jembatan timbang digital PKS serta pencatatan otomatis pendapatan ke jurnal kas ERP.',
    kearifanLokalNotes: 'Integrasi timbangan digital anti-tamper langsung terhubung ke jurnal kas keuangan ERP.',
    progressPercent: 20,
    status: 'TAHAP BERIKUTNYA',
    statusRaw: 'UPCOMING',
    opexEstimateRp: 12000000,
    photoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    durationDays: 'Berjalan Kontinu',
    targetMetrics: 'Akurasi Timbangan 99.9%',
    updatedBy: 'Rahmat Hidayat (Kepala Kebun)',
    updatedAt: '01 Aug 2026',
  },
  {
    stepNumber: 8,
    title: 'Rotasi Lahan & Pergantian Tanaman',
    subtitle: 'Pemulihan Unsur Hara Lahan Berkelanjutan',
    description: 'Evaluasi kesuburan unsur hara pasca-panen dan pelaksanaan rotasi tanaman penambat nitrogen untuk siklus berikutnya.',
    kearifanLokalNotes: 'Prinsip pertanian berkelanjutan khas Nusantara untuk menjaga keawetan dan nilai valuasi tanah lahan.',
    progressPercent: 0,
    status: 'TAHAP BERIKUTNYA',
    statusRaw: 'UPCOMING',
    opexEstimateRp: 10000000,
    photoUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1000&q=80',
    durationDays: '15 Hari',
    targetMetrics: 'Pemulihan Hara 100%',
    updatedBy: 'Rahmat Hidayat (Kepala Kebun)',
    updatedAt: '20 Jul 2026',
  },
];

export const PlantationLifecycleProgress: React.FC = () => {
  const { role } = useRole();
  const [steps, setSteps] = useState<LifecycleStep[]>(() => {
    try {
      const saved = localStorage.getItem('agrojaya_lifecycle_steps');
      return saved ? JSON.parse(saved) : INITIAL_LIFECYCLE_STEPS;
    } catch {
      return INITIAL_LIFECYCLE_STEPS;
    }
  });

  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Sync state when updated elsewhere or on storage event
  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem('agrojaya_lifecycle_steps');
        if (saved) setSteps(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('agrojaya-lifecycle-updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('agrojaya-lifecycle-updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Form State for Updating Stage Progress
  const activeStep = steps[selectedStepIndex] || steps[0];
  const [editPercent, setEditPercent] = useState<number>(activeStep.progressPercent);
  const [editStatus, setEditStatus] = useState<'SELESAI' | 'SEDANG BERJALAN' | 'TAHAP BERIKUTNYA'>(activeStep.status);
  const [editNotes, setEditNotes] = useState<string>(activeStep.description);
  const [editKearifan, setEditKearifan] = useState<string>(activeStep.kearifanLokalNotes);

  // Who is authorized to edit: KEPALA_KEBUN and MANAGER (and DIREKTUR)
  const canUpdateLifecycle = role === 'KEPALA_KEBUN' || role === 'MANAGER' || role === 'DIREKTUR';

  const overallReadiness = Math.round(
    steps.reduce((sum, s) => sum + s.progressPercent, 0) / steps.length
  );

  const handleOpenForm = (idx: number) => {
    setSelectedStepIndex(idx);
    const target = steps[idx];
    setEditPercent(target.progressPercent);
    setEditStatus(target.status);
    setEditNotes(target.description);
    setEditKearifan(target.kearifanLokalNotes);
    setIsEditing(true);
  };

  const handleSaveProgress = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStatusRaw: 'COMPLETED' | 'IN_PROGRESS' | 'UPCOMING' =
      editStatus === 'SELESAI' ? 'COMPLETED' : editStatus === 'SEDANG BERJALAN' ? 'IN_PROGRESS' : 'UPCOMING';
    const updaterName = role === 'KEPALA_KEBUN' ? 'Rahmat Hidayat (Kepala Kebun)' : role === 'MANAGER' ? 'Budi Santoso, S.P. (Manajer Ops)' : 'Direksi Kebun';

    const newSteps = steps.map((s, idx) => {
      if (idx === selectedStepIndex) {
        return {
          ...s,
          progressPercent: Number(editPercent),
          status: editStatus,
          statusRaw: updatedStatusRaw,
          description: editNotes,
          kearifanLokalNotes: editKearifan,
          updatedBy: updaterName,
          updatedAt: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        };
      }
      return s;
    });

    setSteps(newSteps);
    try {
      localStorage.setItem('agrojaya_lifecycle_steps', JSON.stringify(newSteps));
      window.dispatchEvent(new Event('agrojaya-lifecycle-updated'));
    } catch (e) {
      console.error(e);
    }
    setIsEditing(false);
    alert(`Progress Tahap ${activeStep.stepNumber} (${activeStep.title}) Berhasil Diperbarui oleh ${updaterName}!`);
  };

  return (
    <div className="card-box bg-white p-4 p-md-5 rounded-4 border shadow-sm space-y-4">
      {/* Header Info */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 pb-3 border-bottom">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 12 }}>
            <i className="ri-plant-line me-1"></i> SIKLUS PENUH PENGOLAHAN LAHAN PERKEBUNAN
          </span>
          <h3 className="h4 font-weight-bold text-dark mb-1">
            Siklus Penuh Pengolahan Lahan (Awal → Panen & Rotasi Tanaman)
          </h3>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Diisi Eksklusif oleh <b>Kepala Kebun & Manajer Operasional</b> • Transparansi Real-Time Kesiapan Fisik Lahan Investor
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-3 bg-light p-3 rounded-3 border">
            <div className="text-end">
              <span className="d-block text-uppercase text-muted font-weight-bold" style={{ fontSize: 11 }}>Tingkat Kesiapan Fisik Lahan</span>
              <strong className="h4 text-success font-weight-extrabold mb-0">{overallReadiness}% Siap</strong>
            </div>
            <div style={{ width: 48, height: 48, backgroundColor: '#059669', color: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18 }}>
              {overallReadiness}%
            </div>
          </div>

          {canUpdateLifecycle && (
            <button
              onClick={() => handleOpenForm(selectedStepIndex)}
              className="btn btn-success text-white font-weight-bold px-4 py-3 rounded-3 border-0 d-inline-flex align-items-center gap-2 shadow"
              style={{ fontSize: 13 }}
            >
              <i className="ri-edit-box-line h5 m-0"></i> Update Tahap {activeStep.stepNumber}
            </button>
          )}
        </div>
      </div>

      {/* Operator Role Badge & Form Toggle Banner */}
      <div className="bg-success-subtle p-3.5 rounded-3 border border-success d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success text-white font-weight-bold px-3 py-1.5 rounded-pill" style={{ fontSize: 11 }}>
            🔒 PENANGGUNG JAWAB PENGISI FORM: KEPALA KEBUN & MANAJER OPS
          </span>
          <span className="text-dark font-weight-bold" style={{ fontSize: 12 }}>
            Status Peran Aktif: <b>{role}</b>
          </span>
        </div>

        {canUpdateLifecycle && (
          <button
            onClick={() => handleOpenForm(selectedStepIndex)}
            className="btn btn-success text-white font-weight-bold px-4 py-2.5 rounded-3 border-0 d-inline-flex align-items-center gap-2 shadow-sm"
            style={{ fontSize: 13 }}
          >
            <i className="ri-pencil-line"></i> Buka Form Edit Tahap {activeStep.stepNumber} ({activeStep.status})
          </button>
        )}
      </div>

      {/* Interactive Form Drawer (If Editing) */}
      {isEditing && (
        <form onSubmit={handleSaveProgress} className="bg-success-subtle p-4 rounded-4 border border-success space-y-3">
          <div className="d-flex justify-content-between align-items-center pb-2 border-bottom border-success-subtle">
            <h5 className="font-weight-bold text-success-emphasis m-0 d-flex align-items-center gap-2" style={{ fontSize: 15 }}>
              <i className="ri-edit-line"></i> Form Update Progress Fisik: Tahap {activeStep.stepNumber} - {activeStep.title}
            </h5>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-sm btn-outline-secondary font-weight-bold"
              style={{ fontSize: 11 }}
            >
              Batal
            </button>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Persentase Selesai (%):</label>
              <input
                type="number"
                min="0"
                max="100"
                value={editPercent}
                onChange={(e) => setEditPercent(Number(e.target.value))}
                className="form-control p-2.5 bg-white border font-weight-bold"
                style={{ fontSize: 13 }}
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Status Tahapan:</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as any)}
                className="form-select p-2.5 bg-white border font-weight-bold"
                style={{ fontSize: 13 }}
              >
                <option value="SELESAI">SELESAI (100%)</option>
                <option value="SEDANG BERJALAN">SEDANG BERJALAN</option>
                <option value="TAHAP BERIKUTNYA">TAHAP BERIKUTNYA</option>
              </select>
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Petugas Pengisi Form:</label>
              <input
                type="text"
                value={role === 'KEPALA_KEBUN' ? 'Rahmat Hidayat (Kepala Kebun)' : 'Budi Santoso, S.P. (Manajer Ops)'}
                className="form-control p-2.5 bg-light border font-weight-bold"
                style={{ fontSize: 13 }}
                disabled
              />
            </div>
          </div>

          <div>
            <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Catatan Pengamatan Agronomi & Kondisi Fisik Lahan Lapangan:</label>
            <textarea
              rows={2}
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              className="form-control p-2.5 bg-white border"
              style={{ fontSize: 13 }}
              required
            ></textarea>
          </div>

          <div>
            <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Standar Perkebunan & Kearifan Lokal Nusantara:</label>
            <input
              type="text"
              value={editKearifan}
              onChange={(e) => setEditKearifan(e.target.value)}
              className="form-control p-2.5 bg-white border"
              style={{ fontSize: 13 }}
            />
          </div>

          <div className="d-flex justify-content-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-light border font-weight-bold px-3 py-2"
              style={{ fontSize: 12 }}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-success text-white font-weight-bold px-4 py-2 shadow-sm"
              style={{ fontSize: 12 }}
            >
              <i className="ri-save-line me-1"></i> Simpan & Perbarui Progress Lahan
            </button>
          </div>
        </form>
      )}

      {/* Stepper Navigation */}
      <div className="row g-2 py-2">
        {steps.map((step, idx) => {
          const isSelected = idx === selectedStepIndex;
          const isCompleted = step.statusRaw === 'COMPLETED';
          const isInProgress = step.statusRaw === 'IN_PROGRESS';

          return (
            <div key={step.stepNumber} className="col-6 col-sm-3 col-md-3 col-lg-1-5">
              <button
                onClick={() => {
                  setSelectedStepIndex(idx);
                  setIsEditing(false);
                }}
                className={`w-100 p-2.5 text-center rounded-3 border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-success text-white border-success shadow'
                    : isCompleted
                    ? 'bg-success-subtle text-success border-success'
                    : isInProgress
                    ? 'bg-warning-subtle text-warning border-warning'
                    : 'bg-light text-muted border-secondary-subtle'
                }`}
                style={{ borderStyle: 'solid' }}
              >
                <div className="font-weight-extrabold" style={{ fontSize: 12 }}>
                  TAHAP {step.stepNumber}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {step.status} ({step.progressPercent}%)
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Step Detail Box */}
      <div className="row g-4 bg-light p-4 rounded-4 border align-items-center">
        {/* Real Photography Asset */}
        <div className="col-lg-6">
          <div className="rounded-3 overflow-hidden border bg-white shadow-sm">
            <img
              key={activeStep.stepNumber}
              src={activeStep.photoUrl}
              alt={activeStep.title}
              className="w-100"
              style={{ height: 320, objectFit: 'cover' }}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3 bg-white p-3 rounded-3 border text-secondary" style={{ fontSize: 13 }}>
            <span><i className="ri-time-line me-1 text-success"></i> Durasi: <b>{activeStep.durationDays}</b></span>
            <span><i className="ri-target-line me-1 text-primary"></i> Target: <b>{activeStep.targetMetrics}</b></span>
          </div>
        </div>

        {/* Info & Financials */}
        <div className="col-lg-6 space-y-3">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <span className="badge bg-success text-white px-2.5 py-1 rounded uppercase font-weight-bold" style={{ fontSize: 11 }}>
                TAHAP {activeStep.stepNumber} DARI 8
              </span>
              <h4 className="font-weight-bold text-dark mt-2 mb-1">{activeStep.title}</h4>
              <p className="text-muted font-weight-bold" style={{ fontSize: 13 }}>{activeStep.subtitle}</p>
            </div>
            <span className={`badge px-3 py-1.5 font-weight-bold ${
              activeStep.statusRaw === 'COMPLETED' ? 'bg-success text-white' : activeStep.statusRaw === 'IN_PROGRESS' ? 'bg-warning text-dark' : 'bg-secondary text-white'
            }`}>
              {activeStep.status} ({activeStep.progressPercent}%)
            </span>
          </div>

          <p className="bg-white p-3 rounded-3 border text-dark" style={{ fontSize: 14, lineHeight: 1.6 }}>
            {activeStep.description}
          </p>

          <div className="bg-warning-subtle border border-warning p-3 rounded-3 text-dark" style={{ fontSize: 13 }}>
            <strong className="d-block text-warning-emphasis mb-1"><i className="ri-checkbox-circle-line me-1"></i> Standar Perkebunan & Kearifan Lokal Nusantara:</strong>
            <span className="text-secondary">{activeStep.kearifanLokalNotes}</span>
          </div>

          {/* Audit Verification Log */}
          <div className="bg-white p-3 rounded-3 border space-y-2">
            <div className="d-flex justify-content-between align-items-center text-dark" style={{ fontSize: 14 }}>
              <span>Alokasi Anggaran OPEX Tahap Ini:</span>
              <strong className="h5 font-weight-extrabold text-success mb-0">Rp {activeStep.opexEstimateRp.toLocaleString('id-ID')}</strong>
            </div>

            <div className="w-100 bg-light rounded-pill overflow-hidden border" style={{ height: 12 }}>
              <div
                className="bg-success h-100 transition-all rounded-pill"
                style={{ width: `${activeStep.progressPercent}%` }}
              ></div>
            </div>

            <div className="pt-1.5 border-top d-flex justify-content-between align-items-center text-muted" style={{ fontSize: 11 }}>
              <span><i className="ri-user-check-line text-success me-1"></i> Diperbarui Oleh: <b>{activeStep.updatedBy || 'Kepala Kebun'}</b></span>
              <span><i className="ri-calendar-event-line me-1"></i> Tanggal: <b>{activeStep.updatedAt || '03 Aug 2026'}</b></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
