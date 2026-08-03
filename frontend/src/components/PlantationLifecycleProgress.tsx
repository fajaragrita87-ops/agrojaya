import React, { useState } from 'react';

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
}

export const LIFECYCLE_STEPS: LifecycleStep[] = [
  {
    stepNumber: 1,
    title: 'Pembukaan & Pembabatan Lahan',
    subtitle: 'Pembersihan Semak Belukar Tropis & Sanitasi Lahan',
    description: 'Pembersihan fisik vegetasi liar, pembabatan semak tropis, serta pemetaan batas topografi geofencing lokasi kebun.',
    kearifanLokalNotes: 'Penggunaan alat mekanis ramah lingkungan tanpa pembakaran lahan (Standar Tanpa Bakar Indonesia).',
    progressPercent: 100,
    status: 'SELESAI',
    statusRaw: 'COMPLETED',
    opexEstimateRp: 25000000,
    photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    durationDays: '14 Hari',
    targetMetrics: 'Bebas Tunggul 100%',
  },
  {
    stepNumber: 2,
    title: 'Penggarapan & Pembajakan Tanah',
    subtitle: 'Pembuatan Bedengan Subur & Saluran Drainase',
    description: 'Penggemburan struktur tanah aluvial/gambut dengan traktor pembajak untuk aerasi udara dan pembuatan saluran drainase.',
    kearifanLokalNotes: 'Pengaturan arah bedengan membujur Utara-Selatan mengoptimalkan pencahayaan sinar matahari tropis.',
    progressPercent: 100,
    status: 'SELESAI',
    statusRaw: 'COMPLETED',
    opexEstimateRp: 18500000,
    photoUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80',
    durationDays: '10 Hari',
    targetMetrics: 'Kedalaman Olah 40 cm',
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
  },
  {
    stepNumber: 4,
    title: 'Penanaman Bibit Unggul Sertifikasi',
    subtitle: 'Transplantasi Bibit Sertifikasi Balai Benih',
    description: 'Penanaman bibit varietas unggul tersertifikasi Balai Benih Indonesia (Sawit Tenera / Porang / Jagung Pioneer / Anggur Sapphire).',
    kearifanLokalNotes: 'Bibit bersertifikasi resmi dengan tingkat kelangsungan hidup di atas 98%.',
    progressPercent: 85,
    status: 'SEDANG BERJALAN',
    statusRaw: 'IN_PROGRESS',
    opexEstimateRp: 35000000,
    photoUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1000&q=80',
    durationDays: '20 Hari',
    targetMetrics: 'Kepadatan 136 Pohon/Ha',
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
  },
  {
    stepNumber: 6,
    title: 'Panen Raya & Grading Kualitas',
    subtitle: 'Pemetikan Hasil Panen & Seleksi Mutu Ekspor',
    description: 'Pemetikan hasil panen puncak komoditas dengan sortir kualitas ketat (Grade A super premium untuk pasar ekspor/pabrik).',
    kearifanLokalNotes: 'Teknik potong janjang matang panen optimal dengan standar losase di bawah 0.5%.',
    progressPercent: 40,
    status: 'TAHAP BERIKUTNYA',
    statusRaw: 'UPCOMING',
    opexEstimateRp: 22000000,
    photoUrl: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1000&q=80',
    durationDays: '30 Hari',
    targetMetrics: 'Target Yield 24 Ton/Ha',
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
  },
];

export const PlantationLifecycleProgress: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const activeStep = LIFECYCLE_STEPS[selectedStepIndex];

  return (
    <div className="card-box bg-white p-4 p-md-5 rounded-4 border shadow-sm space-y-4">
      {/* Header Info */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 pb-3 border-bottom">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill uppercase font-weight-bold mb-2 d-inline-block" style={{ fontSize: 12 }}>
            <i className="feather-flag me-1"></i> LAPORAN KESIAPAN FISIK LAHAN PERKEBUNAN
          </span>
          <h3 className="h4 font-weight-bold text-dark mb-1">
            Siklus Penuh Pengolahan Lahan (Awal → Panen & Rotasi Tanaman)
          </h3>
          <p className="text-secondary mb-0" style={{ fontSize: 14 }}>
            Transparansi Fisik Pengolahan Tanah & Eksekusi Lapangan AgroJaya (Kearifan Lokal Perkebunan Nusantara)
          </p>
        </div>

        <div className="d-flex align-items-center gap-3 bg-light p-3 rounded-3 border">
          <div className="text-end">
            <span className="d-block text-uppercase text-muted font-weight-bold" style={{ fontSize: 11 }}>Tingkat Kesiapan Fisik Lahan</span>
            <strong className="h4 text-success font-weight-extrabold mb-0">65% Siap</strong>
          </div>
          <div style={{ width: 48, height: 48, backgroundColor: '#059669', color: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18 }}>
            65%
          </div>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="row g-2 py-3">
        {LIFECYCLE_STEPS.map((step, idx) => {
          const isSelected = idx === selectedStepIndex;
          const isCompleted = step.statusRaw === 'COMPLETED';
          const isInProgress = step.statusRaw === 'IN_PROGRESS';

          return (
            <div key={step.stepNumber} className="col-6 col-sm-3 col-md-3 col-lg-1-5">
              <button
                onClick={() => setSelectedStepIndex(idx)}
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
                  {step.status}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Step Detail Box */}
      <div className="row g-4 bg-light p-4 rounded-4 border align-items-center">
        {/* Real High Quality Photography Asset */}
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
            <span><i className="feather-clock me-1 text-success"></i> Durasi: <b>{activeStep.durationDays}</b></span>
            <span><i className="feather-target me-1 text-primary"></i> Target: <b>{activeStep.targetMetrics}</b></span>
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
              {activeStep.status}
            </span>
          </div>

          <p className="bg-white p-3 rounded-3 border text-dark" style={{ fontSize: 14, lineHeight: 1.6 }}>
            {activeStep.description}
          </p>

          <div className="bg-warning-subtle border border-warning p-3 rounded-3 text-dark" style={{ fontSize: 13 }}>
            <strong className="d-block text-warning-emphasis mb-1"><i className="feather-check-circle me-1"></i> Standar Perkebunan & Kearifan Lokal Nusantara:</strong>
            <span className="text-secondary">{activeStep.kearifanLokalNotes}</span>
          </div>

          <div className="bg-white p-3 rounded-3 border space-y-2">
            <div className="d-flex justify-content-between align-items-center text-dark" style={{ fontSize: 14 }}>
              <span>Alokasi Anggaran Operasional Tahap Ini:</span>
              <strong className="h5 font-weight-extrabold text-success mb-0">Rp {activeStep.opexEstimateRp.toLocaleString()}</strong>
            </div>

            <div className="w-100 bg-light rounded-pill overflow-hidden border" style={{ height: 12 }}>
              <div
                className="bg-success h-100 transition-all rounded-pill"
                style={{ width: `${activeStep.progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
