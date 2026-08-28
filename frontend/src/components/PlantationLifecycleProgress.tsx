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

// Strictly curated, 100% relevant high-definition agricultural photography for each step
const STEP_PHOTOS: Record<number, string> = {
  // Tahap 1: Pembersihan semak belukar & persiapan lahan terbuka
  1: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80',
  // Tahap 2: Traktor pembajak tanah & pembuatan bedengan drainase
  2: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80',
  // Tahap 3: Tanah gembur organik kaya kompos bio-pupuk & kapur dolomit penyeimbang pH
  3: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=1000&q=80',
  // Tahap 4: Bibit tanaman muda ditanam ke dalam tanah kebun
  4: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1000&q=80',
  // Tahap 5: Irigasi tetes (drip fertigation) presisi di kebun greenhouse
  5: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80',
  // Tahap 6: Panen raya komoditas segar berkualitas super
  6: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80',
  // Tahap 7: Truk logistik angkut panen ke timbangan tonase PKS
  7: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80',
  // Tahap 8: Hamparan lahan rotasi tanaman hijau subur berkelanjutan
  8: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
};

export const INITIAL_LIFECYCLE_STEPS: LifecycleStep[] = [
  {
    stepNumber: 1,
    title: 'Pembukaan & Pembabatan Lahan',
    subtitle: 'Pembersihan Semak Belukar Tropis & Sanitasi Lahan',
    description: 'Pembersihan fisik vegetasi liar, pembabatan semak tropis, serta pemetaan batas topografi geofencing lokasi sentra perkebunan.',
    kearifanLokalNotes: 'Penggunaan alat mekanis ramah lingkungan tanpa pembakaran lahan (Standar Tanpa Bakar Indonesia).',
    progressPercent: 100,
    status: 'SELESAI',
    statusRaw: 'COMPLETED',
    opexEstimateRp: 25000000,
    photoUrl: STEP_PHOTOS[1],
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
    photoUrl: STEP_PHOTOS[2],
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
    photoUrl: STEP_PHOTOS[3],
    durationDays: '15 Hari',
    targetMetrics: 'pH Tanah Ideal 6.5',
    updatedBy: 'Rahmat Hidayat (Kepala Kebun)',
    updatedAt: '01 Aug 2026',
  },
  {
    stepNumber: 4,
    title: 'Penanaman Bibit Unggul Sertifikasi',
    subtitle: 'Transplantasi Bibit Sertifikasi Balai Benih',
    description: 'Penanaman bibit varietas unggul tersertifikasi Balai Benih Indonesia (Anggur Shine Muscat / Porang / Melon Intanon).',
    kearifanLokalNotes: 'Bibit bersertifikasi resmi dengan tingkat kelangsungan hidup di atas 98%.',
    progressPercent: 85,
    status: 'SEDANG BERJALAN',
    statusRaw: 'IN_PROGRESS',
    opexEstimateRp: 35000000,
    photoUrl: STEP_PHOTOS[4],
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
    photoUrl: STEP_PHOTOS[5],
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
    photoUrl: STEP_PHOTOS[6],
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
    photoUrl: STEP_PHOTOS[7],
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
    photoUrl: STEP_PHOTOS[8],
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
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((s: LifecycleStep) => ({
          ...s,
          photoUrl: STEP_PHOTOS[s.stepNumber] || s.photoUrl,
        }));
      }
      return INITIAL_LIFECYCLE_STEPS;
    } catch {
      return INITIAL_LIFECYCLE_STEPS;
    }
  });

  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem('agrojaya_lifecycle_steps');
        if (saved) {
          const parsed = JSON.parse(saved);
          setSteps(
            parsed.map((s: LifecycleStep) => ({
              ...s,
              photoUrl: STEP_PHOTOS[s.stepNumber] || s.photoUrl,
            }))
          );
        }
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

  const activeStep = steps[selectedStepIndex] || steps[0];
  // Always enforce the exact relevant photo corresponding to the active step number
  const activePhoto = STEP_PHOTOS[activeStep.stepNumber];

  const [editPercent, setEditPercent] = useState<number>(activeStep.progressPercent);
  const [editStatus, setEditStatus] = useState<'SELESAI' | 'SEDANG BERJALAN' | 'TAHAP BERIKUTNYA'>(activeStep.status);
  const [editNotes, setEditNotes] = useState<string>(activeStep.description);
  const [editKearifan, setEditKearifan] = useState<string>(activeStep.kearifanLokalNotes);

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
          photoUrl: STEP_PHOTOS[s.stepNumber],
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
    alert(`Progress Tahap ${activeStep.stepNumber} (${activeStep.title}) berhasil diperbarui!`);
  };

  return (
    <div className="space-y-4">
      {/* Top Overall Progress Strip */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div className="d-flex align-items-center gap-3 w-100 w-md-50">
          <div className="corpox-icon-box emerald" style={{ width: 44, height: 44, fontSize: 20 }}>
            <i className="ri-plant-line"></i>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-dark font-weight-bold" style={{ fontSize: 13 }}>Kesiapan Fisik Lahan Keseluruhan</span>
              <strong className="text-success font-weight-extrabold" style={{ fontSize: 15 }}>{overallReadiness}% Siap</strong>
            </div>
            <div className="progress" style={{ height: 8 }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${overallReadiness}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 font-weight-bold rounded-pill" style={{ fontSize: 11 }}>
            3 Tahap Selesai
          </span>
          <span className="badge bg-primary-subtle text-primary border border-primary px-2.5 py-1 font-weight-bold rounded-pill" style={{ fontSize: 11 }}>
            2 Sedang Berjalan
          </span>
          <span className="badge bg-light text-muted border px-2.5 py-1 font-weight-bold rounded-pill" style={{ fontSize: 11 }}>
            3 Tahap Berikutnya
          </span>
          {canUpdateLifecycle && (
            <button
              onClick={() => handleOpenForm(selectedStepIndex)}
              className="btn btn-sm btn-outline-success font-weight-bold px-3 py-1.5 rounded-3 d-inline-flex align-items-center gap-1 shadow-xs"
              style={{ fontSize: 11.5 }}
            >
              <i className="ri-edit-line"></i>
              <span>Update Tahap Ini</span>
            </button>
          )}
        </div>
      </div>

      {/* Modern Stepper Pill Bar */}
      <div className="card-box p-3 rounded-4 bg-white border shadow-sm">
        <div className="d-flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
          {steps.map((step, idx) => {
            const isSelected = idx === selectedStepIndex;
            const isCompleted = step.status === 'SELESAI';
            const isInProgress = step.status === 'SEDANG BERJALAN';

            let badgeColorClass = 'bg-light text-muted border';
            if (isCompleted) badgeColorClass = 'bg-success-subtle text-success border border-success';
            else if (isInProgress) badgeColorClass = 'bg-primary-subtle text-primary border border-primary';

            return (
              <button
                key={step.stepNumber}
                onClick={() => {
                  setSelectedStepIndex(idx);
                  setIsEditing(false);
                }}
                className={`btn btn-sm text-start p-2.5 rounded-3 transition flex-shrink-0 ${
                  isSelected
                    ? 'bg-success text-white shadow-xs border-0'
                    : 'btn-light border hover-bg-light'
                }`}
                style={{ minWidth: 160, maxWidth: 200 }}
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className={`badge ${isSelected ? 'bg-white text-success' : badgeColorClass} font-weight-bold`} style={{ fontSize: 10 }}>
                    Tahap {step.stepNumber}
                  </span>
                  <strong className={isSelected ? 'text-white' : isCompleted ? 'text-success' : isInProgress ? 'text-primary' : 'text-muted'} style={{ fontSize: 11 }}>
                    {step.progressPercent}%
                  </strong>
                </div>
                <div className={`text-truncate font-weight-bold ${isSelected ? 'text-white' : 'text-dark'}`} style={{ fontSize: 12 }}>
                  {step.title.split(' & ')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inline Edit Form for Kepala Kebun & Manager */}
      {isEditing && canUpdateLifecycle && (
        <div className="card-box p-4 rounded-4 bg-light border border-success shadow-sm space-y-3">
          <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
            <h5 className="font-weight-bold text-dark m-0 !text-sm">
              <i className="ri-edit-circle-line text-success me-1"></i> Form Update Progres Tahap {activeStep.stepNumber}: {activeStep.title}
            </h5>
            <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-light border text-muted">
              Tutup
            </button>
          </div>

          <form onSubmit={handleSaveProgress} className="row g-3">
            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 11.5 }}>Progres Tahap (%):</label>
              <input
                type="number"
                min="0"
                max="100"
                value={editPercent}
                onChange={(e) => setEditPercent(Number(e.target.value))}
                className="form-control p-2 bg-white border font-weight-bold text-success"
                style={{ fontSize: 13 }}
                required
              />
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 11.5 }}>Status Tahap:</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as any)}
                className="form-select p-2 bg-white border font-weight-bold text-dark"
                style={{ fontSize: 13 }}
              >
                <option value="SELESAI">SELESAI (100%)</option>
                <option value="SEDANG BERJALAN">SEDANG BERJALAN</option>
                <option value="TAHAP BERIKUTNYA">TAHAP BERIKUTNYA</option>
              </select>
            </div>

            <div className="col-12 col-md-4 d-flex align-items-end">
              <button
                type="submit"
                className="btn btn-success text-white font-weight-bold p-2 w-100 rounded-3 shadow-xs d-flex align-items-center justify-content-center gap-1.5"
                style={{ fontSize: 12.5 }}
              >
                <i className="ri-save-line"></i> Simpan Progres Tahap
              </button>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 11.5 }}>Keterangan Lapangan:</label>
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="form-control p-2 bg-white border"
                rows={2}
                style={{ fontSize: 12 }}
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 11.5 }}>Standar SOP & Catatan:</label>
              <textarea
                value={editKearifan}
                onChange={(e) => setEditKearifan(e.target.value)}
                className="form-control p-2 bg-white border"
                rows={2}
                style={{ fontSize: 12 }}
                required
              />
            </div>
          </form>
        </div>
      )}

      {/* Stage Detail Card (Modern Split View) */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm">
        <div className="row g-4 align-items-center">
          {/* Strictly Relevant Photo */}
          <div className="col-12 col-lg-5">
            <div className="position-relative rounded-4 overflow-hidden border shadow-xs bg-light">
              <img
                key={activeStep.stepNumber}
                src={activePhoto}
                alt={activeStep.title}
                className="w-100 object-fit-cover"
                style={{ height: 260, transition: 'all 0.3s ease' }}
              />
              <div className="position-absolute bottom-0 start-0 end-0 p-2.5 bg-dark bg-opacity-75 text-white d-flex justify-content-between align-items-center" style={{ fontSize: 11.5 }}>
                <span><i className="ri-time-line me-1"></i> Durasi: <b>{activeStep.durationDays}</b></span>
                <span><i className="ri-focus-3-line me-1"></i> Target: <b>{activeStep.targetMetrics}</b></span>
              </div>
            </div>
          </div>

          {/* Details on Right */}
          <div className="col-12 col-lg-7 space-y-3">
            <div className="d-flex justify-content-between align-items-start gap-2">
              <div>
                <span className="badge bg-success text-white font-weight-bold px-2.5 py-1 rounded-pill mb-1.5 d-inline-block" style={{ fontSize: 10.5 }}>
                  Tahap {activeStep.stepNumber} dari 8
                </span>
                <h3 className="font-weight-extrabold text-dark mb-0" style={{ fontSize: 18 }}>
                  {activeStep.title}
                </h3>
                <span className="text-muted font-weight-medium" style={{ fontSize: 12 }}>
                  {activeStep.subtitle}
                </span>
              </div>

              <span className={`badge px-3 py-1.5 rounded-pill font-weight-bold ${activeStep.status === 'SELESAI' ? 'bg-success text-white' : activeStep.status === 'SEDANG BERJALAN' ? 'bg-primary text-white' : 'bg-secondary text-white'}`} style={{ fontSize: 11 }}>
                {activeStep.status} ({activeStep.progressPercent}%)
              </span>
            </div>

            <p className="text-secondary mb-0 font-weight-medium" style={{ fontSize: 13, lineHeight: 1.6 }}>
              {activeStep.description}
            </p>

            {/* SOP & Standar Box */}
            <div className="p-3 rounded-3 bg-success-subtle border border-success-subtle d-flex align-items-start gap-2.5">
              <i className="ri-shield-check-line text-success mt-0.5" style={{ fontSize: 18 }}></i>
              <div>
                <strong className="d-block text-success font-weight-bold" style={{ fontSize: 11.5 }}>Standar SOP & Mutu Kebun:</strong>
                <span className="text-dark font-weight-medium" style={{ fontSize: 12 }}>{activeStep.kearifanLokalNotes}</span>
              </div>
            </div>

            {/* OPEX & Updater Footer */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 pt-2 border-top" style={{ fontSize: 12 }}>
              <div>
                <span className="text-muted">Alokasi Anggaran OPEX: </span>
                <strong className="text-dark font-weight-bold">Rp {activeStep.opexEstimateRp?.toLocaleString('id-ID')}</strong>
              </div>
              <div className="text-muted">
                <span>Diperbarui oleh: <b>{activeStep.updatedBy || 'Kepala Kebun'}</b> ({activeStep.updatedAt || 'Terverifikasi'})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
