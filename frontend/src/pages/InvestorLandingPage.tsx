import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInvestorDashboard, getLands, getFinancials, getBmkgWeather } from '../services/api';
import { TurbineLineChart, TurbineDonutChart, TurbineBarChart } from '../components/TurbineChart';
import { InteractiveGisMap } from '../components/InteractiveGisMap';
import { PlantationLifecycleProgress } from '../components/PlantationLifecycleProgress';
import { FinancialLedgerShowcase } from '../components/FinancialLedgerShowcase';
import { useRole } from '../context/RoleContext';
import '../envas-landing.css';

export const InvestorLandingPage = () => {
  const { userName } = useRole();
  const [lands, setLands] = useState<any[]>([]);
  const [financials, setFinancials] = useState<any[]>([]);
  const [bmkgWeather, setBmkgWeather] = useState<any>(null);
  const [activeLat, setActiveLat] = useState('-6.4697');
  const [activeLng, setActiveLng] = useState('107.0544');
  const [tabIndex, setTabIndex] = useState<number>(1);

  useEffect(() => {
    getInvestorDashboard().catch(console.error);
    getLands()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const sanitized = res.data.map((l: any, i: number) => {
            const rawLat = parseFloat(l.latitude);
            const isInvalid = isNaN(rawLat) || rawLat > 0;
            return {
              ...l,
              latitude: isInvalid ? (-6.4697 - i * 0.0015).toFixed(6) : l.latitude,
              longitude: isInvalid ? (107.0544 + i * 0.0020).toFixed(6) : l.longitude,
            };
          });
          setLands(sanitized);
          setActiveLat('-6.4697');
          setActiveLng('107.0544');
        }
      })
      .catch(console.error);
    getFinancials()
      .then((res) => {
        if (res.data && res.data.data) {
          setFinancials(res.data.data);
        }
      })
      .catch(console.error);
    getBmkgWeather()
      .then((res) => {
        if (res.data && res.data.data) {
          setBmkgWeather(res.data.data);
        }
      })
      .catch(console.error);
  }, []);

  const valuationGrowthData = [
    { label: 'Feb', value1: 1800, value2: 1500 },
    { label: 'Mar', value1: 2100, value2: 1800 },
    { label: 'Apr', value1: 2350, value2: 2000 },
    { label: 'Mei', value1: 2600, value2: 2200 },
    { label: 'Jun', value1: 2900, value2: 2500 },
    { label: 'Jul', value1: 3100, value2: 2500 },
  ];

  const capitalAllocationDonutData = [
    { label: 'Porang (Komoditas Utama Ekspor)', value: 45, color: '#059669' },
    { label: 'Jagung Hibrida Kawasan Pangan (Blok B1)', value: 30, color: '#0284c7' },
    { label: 'Anggur Impor & Melon (Blok C1-D1)', value: 25, color: '#d97706' },
  ];

  const burnRateBarData = [
    { label: 'Upah Harian Petani Bulanan', value: 42000000, color: '#059669' },
    { label: 'Pengadaan Pupuk NPK & Kapur Dolomit', value: 28000000, color: '#0284c7' },
    { label: 'Perawatan Traktor & Irigasi Presisi', value: 15000000, color: '#d97706' },
  ];

  const handleExportPDF = () => {
    alert('Mengunduh Laporan Terpadu 5-Dimensi Auditor & Laporan Keuangan Investor (PDF)...');
  };

  const processSteps = [
    {
      id: 1,
      step: '01',
      title: 'Pembersihan & Penggarapan Tanah (Land Clearing)',
      desc: 'Pembersihan gulma liar, pembajakan traktor gembur, drainase bebas genangan, & sanitasi tanah tanpa pembakaran.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      badge: 'Fase Persiapan Lahan',
    },
    {
      id: 2,
      step: '02',
      title: 'Penanaman Benih Unggul Bersertifikat Balai Benih',
      desc: 'Aplikasi Kapur Dolomit [CaMg(CO3)2] netralisir pH 6.2, pupuk dasar bio-organik, & penanaman bibit sertifikasi mutu A+.',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
      badge: 'Fase Vegetatif Awal',
    },
    {
      id: 3,
      step: '03',
      title: 'Perawatan Presisi BMKG & Fertigasi Bio-Organik',
      desc: 'Pemantauan iklim BMKG live, fertigasi nutrisi terukur N-P-K mikro, & perlindungan hayati jamur Trichoderma harzianum.',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
      badge: 'Fase Pemeliharaan Harian',
    },
    {
      id: 4,
      step: '04',
      title: 'Estimasi Taksasi & Panen Raya Terpadu',
      desc: 'Validasi rendemen panen sebelum panen raya, sortasi grade ekspor, & penimbangan digital tersinkronisasi BAP.',
      image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1200&q=80',
      badge: 'Fase Panen Raya',
    },
    {
      id: 5,
      step: '05',
      title: 'Timbangan Digital PKS & Rotasi Tanaman Berkelanjutan',
      desc: 'Penjualan terikat kontrak off-taker pabrik dan jadwal pergiliran tanaman legum untuk menjaga kesuburan hara tanah.',
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
      badge: 'Fase Distribusi & Rotasi',
    },
  ];

  return (
    <div className="envas-wrapper">
      {/* =========================================================================
          ENVAS TOPBAR: Hotline, BMKG Weather & Quick Audit Action
          ========================================================================= */}
      <div className="envas-topbar py-2 px-4">
        <div className="w-100 max-w-[1720px] mx-auto d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-4 flex-wrap">
            <span className="d-inline-flex align-items-center gap-1.5 font-weight-semibold">
              <i className="ri-phone-fill text-emerald-300"></i> Hotline Investor: (+62) 811-7000-888
            </span>
            <span className="d-none d-md-inline-flex align-items-center gap-1.5 font-weight-semibold">
              <i className="ri-mail-send-fill text-emerald-300"></i> investor@smartfarm.id
            </span>
            <span className="d-none d-lg-inline-flex align-items-center gap-1.5 text-emerald-200">
              <i className="ri-time-line text-emerald-300"></i> Operasional Lahan: Sen - Sab 07.00 - 17.00 WIB
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="badge bg-emerald-900 text-emerald-200 border border-emerald-700 px-2.5 py-1.5 rounded-pill d-inline-flex align-items-center gap-1.5" style={{ fontSize: 11 }}>
              <i className="ri-sun-cloudy-line text-warning"></i>
              <span>BMKG Cuaca Terkini: <strong>{bmkgWeather?.temperature || 28}°C</strong> ({bmkgWeather?.condition || 'Ideal Tanam'})</span>
            </div>
            <button
              onClick={handleExportPDF}
              className="btn btn-sm btn-outline-light py-1 px-3 rounded-pill d-inline-flex align-items-center gap-1 font-weight-bold"
              style={{ fontSize: 11, borderColor: 'rgba(255,255,255,0.4)' }}
            >
              <i className="ri-file-pdf-2-line"></i> Unduh Audit 5D
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ENVAS HEADER: Navigation & Logo Brand
          ========================================================================= */}
      <header className="sticky-top bg-white border-bottom shadow-sm z-30">
        <div className="w-100 max-w-[1720px] mx-auto px-4 px-md-5">
          <div className="d-flex align-items-center justify-content-between" style={{ height: 78 }}>
            {/* Logo */}
            <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none">
              <div
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: '#059669',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 22,
                  boxShadow: '0 4px 12px rgba(5,150,105,0.3)',
                }}
              >
                <i className="ri-leaf-fill"></i>
              </div>
              <div>
                <h3 className="m-0 font-weight-extrabold text-dark" style={{ fontSize: 19, letterSpacing: '-0.5px' }}>
                  Smart Farming Indonesia
                </h3>
                <span className="text-emerald-700 font-weight-bold d-block" style={{ fontSize: 10.5, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                  Portal Akuntabilitas & Transparansi Investasi
                </span>
              </div>
            </Link>

            {/* Menu Links */}
            <nav className="d-none d-lg-flex align-items-center gap-4">
              <a href="#hero" className="text-dark font-weight-bold hover-text-success text-decoration-none py-2 px-1 text-uppercase" style={{ fontSize: 13, letterSpacing: '0.3px' }}>
                Beranda
              </a>
              <a href="#kesiapan-lahan" className="text-secondary font-weight-semibold hover-text-success text-decoration-none py-2 px-1 text-uppercase" style={{ fontSize: 13, letterSpacing: '0.3px' }}>
                Kesiapan Lahan
              </a>
              <a href="#blok-kebun" className="text-secondary font-weight-semibold hover-text-success text-decoration-none py-2 px-1 text-uppercase" style={{ fontSize: 13, letterSpacing: '0.3px' }}>
                Komoditas Kebun
              </a>
              <a href="#peta-gis" className="text-secondary font-weight-semibold hover-text-success text-decoration-none py-2 px-1 text-uppercase" style={{ fontSize: 13, letterSpacing: '0.3px' }}>
                Peta GIS Satelit
              </a>
              <a href="#kinerja-keuangan" className="text-secondary font-weight-semibold hover-text-success text-decoration-none py-2 px-1 text-uppercase" style={{ fontSize: 13, letterSpacing: '0.3px' }}>
                Kinerja Keuangan
              </a>
              <a href="#laporan-auditor" className="text-secondary font-weight-semibold hover-text-success text-decoration-none py-2 px-1 text-uppercase" style={{ fontSize: 13, letterSpacing: '0.3px' }}>
                Laporan 5D Auditor
              </a>
            </nav>

            {/* CTA Login */}
            <div className="d-flex align-items-center gap-3">
              <Link to="/login" className="envas-btn envas-btn-green">
                <i className="ri-lock-2-line"></i> Masuk Akun Portal
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SECTION 1: FULL SCREEN ENVAS HERO BANNER WITH BENTO COUNTERS
          ========================================================================= */}
      <section
        id="hero"
        className="envas-hero-fullscreen"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85')`,
        }}
      >
        <div className="envas-hero-overlay"></div>
        <div className="w-100 max-w-[1720px] mx-auto px-4 px-md-5 py-5 envas-hero-content">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-12 col-xl-11">
              <h1
                className="text-white font-weight-extrabold mb-4 uppercase tracking-tight text-center mx-auto"
                style={{
                  fontSize: 'clamp(28px, 4.5vw, 54px)',
                  lineHeight: 1.18,
                  textShadow: '0 4px 24px rgba(0,0,0,0.9)',
                  maxWidth: '1200px',
                }}
              >
                Portal Transparansi Investasi & Akuntabilitas Lahan <br />
                <span className="envas-hero-highlight">Perkebunan Smart Farm</span>
              </h1>

              <p
                className="mx-auto mb-5 font-weight-semibold text-center"
                style={{
                  color: '#ffffff',
                  textShadow: '0 2px 12px rgba(0,0,0,0.95)',
                  fontSize: 'clamp(15px, 1.4vw, 18px)',
                  maxWidth: '920px',
                  lineHeight: 1.65,
                }}
              >
                Sistem terpadu pembuktian fisik pengolahan tanah hulu-ke-hilir, sensor GIS satelit real-time,
                dan pertanggungjawaban audit keuangan 5-Dimensi langsung kepada Investor.
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                <Link to="/login" className="envas-btn envas-btn-green py-3.5 px-5 text-base">
                  <i className="ri-shield-user-line text-lg"></i> Akses Portal Investor
                </Link>
                <button onClick={handleExportPDF} className="envas-btn envas-btn-border-white py-3.5 px-5 text-base">
                  <i className="ri-file-download-line text-lg"></i> Unduh Laporan 5D Auditor
                </button>
                <a href="#kesiapan-lahan" className="envas-btn envas-btn-dark py-3.5 px-5 text-base">
                  <i className="ri-compass-3-line text-lg"></i> Eksplorasi Lahan Kebun
                </a>
              </div>

              {/* Bento Metric Counters */}
              <div className="row g-3 g-md-4 pt-2 text-start">
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="envas-counter-card">
                    <span className="text-muted text-uppercase font-weight-bold d-block mb-1" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                      Valuasi Proyek Saat Ini
                    </span>
                    <strong className="d-block font-weight-extrabold text-emerald-600" style={{ fontSize: 24 }}>
                      Rp 3,1 Miliar
                    </strong>
                    <span className="text-emerald-700 font-weight-bold d-inline-flex align-items-center gap-1 mt-1" style={{ fontSize: 12 }}>
                      <i className="ri-arrow-right-up-line"></i> +24.0% Pertumbuhan Bersih
                    </span>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="envas-counter-card">
                    <span className="text-muted text-uppercase font-weight-bold d-block mb-1" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                      Total Modal Disetor
                    </span>
                    <strong className="d-block font-weight-extrabold text-slate-900" style={{ fontSize: 24 }}>
                      Rp 2,5 Miliar
                    </strong>
                    <span className="text-muted font-weight-semibold d-inline-flex align-items-center gap-1 mt-1" style={{ fontSize: 12 }}>
                      <i className="ri-checkbox-circle-fill text-emerald-500"></i> 100% Terealisasi Ke Lahan
                    </span>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="envas-counter-card">
                    <span className="text-muted text-uppercase font-weight-bold d-block mb-1" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                      Total Area Aktif Kebun
                    </span>
                    <strong className="d-block font-weight-extrabold text-slate-900" style={{ fontSize: 24 }}>
                      2.0 Hektar
                    </strong>
                    <span className="text-emerald-700 font-weight-bold d-inline-flex align-items-center gap-1 mt-1" style={{ fontSize: 12 }}>
                      <i className="ri-map-pin-2-fill"></i> Sentra Perkebunan Unggulan
                    </span>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="envas-counter-card">
                    <span className="text-muted text-uppercase font-weight-bold d-block mb-1" style={{ fontSize: 11, letterSpacing: '0.5px' }}>
                      Kesiapan Fisik Lahan
                    </span>
                    <strong className="d-block font-weight-extrabold text-sky-600" style={{ fontSize: 24 }}>
                      65% Siap
                    </strong>
                    <span className="text-sky-700 font-weight-bold d-inline-flex align-items-center gap-1 mt-1" style={{ fontSize: 12 }}>
                      <i className="ri-time-fill"></i> Tahap 4 Aktif Panen & Sortir
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THREE-COLUMN VALUE PILLARS (ENVAS #info PATTERN)
          ========================================================================= */}
      <section className="py-5 bg-white border-bottom">
        <div className="w-100 max-w-[1720px] mx-auto px-4 px-md-5 py-4">
          <div className="text-center max-w-[800px] mx-auto mb-5">
            <span className="badge bg-emerald-100 text-emerald-800 font-weight-bold px-3 py-1 rounded-pill uppercase mb-2" style={{ fontSize: 11 }}>
              Pilar Kepercayaan & Kepatuhan
            </span>
            <h2 className="font-weight-extrabold text-dark tracking-tight mb-2" style={{ fontSize: 28 }}>
              Standar Integritas & Transparansi Modal Investor
            </h2>
            <p className="text-muted" style={{ fontSize: 14 }}>
              Setiap rupiah modal yang diinvestasikan dikunci dengan pembuktian agrikultur ilmiah dan audit menyeluruh.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="envas-info-box">
                <div className="envas-info-icon">
                  <i className="ri-test-tube-fill"></i>
                </div>
                <h4 className="font-weight-bold text-dark mb-2" style={{ fontSize: 18 }}>
                  Riset Agronomi & Uji Tanah
                </h4>
                <p className="text-muted mb-0" style={{ fontSize: 13.5, lineHeight: 1.6 }}>
                  Penetralan asam tanah dengan Kapur Dolomit ke pH 6.2, formulasi pupuk NPK terukur Balitbangtan,
                  serta agen hayati <em>Trichoderma</em> untuk proteksi akar maksimal.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="envas-info-box">
                <div className="envas-info-icon" style={{ color: '#0284c7', backgroundColor: '#e0f2fe' }}>
                  <i className="ri-shield-check-fill"></i>
                </div>
                <h4 className="font-weight-bold text-dark mb-2" style={{ fontSize: 18 }}>
                  Verifikasi Fisik BAP 3 Lapis
                </h4>
                <p className="text-muted mb-0" style={{ fontSize: 13.5, lineHeight: 1.6 }}>
                  Seluruh pengeluaran OPEX wajib disertai foto timestamp GPS lapangan, nota resmi pabrikan ber-nomor batch,
                  dan Berita Acara Pekerjaan (BAP) yang ditandatangani Kepala Kebun.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="envas-info-box">
                <div className="envas-info-icon" style={{ color: '#d97706', backgroundColor: '#fef3c7' }}>
                  <i className="ri-funds-box-fill"></i>
                </div>
                <h4 className="font-weight-bold text-dark mb-2" style={{ fontSize: 18 }}>
                  Buku Arus Kas & Proyeksi ROI
                </h4>
                <p className="text-muted mb-0" style={{ fontSize: 13.5, lineHeight: 1.6 }}>
                  Pantau pertumbuhan valuasi modal, HPP per Kg, efisiensi burn rate, dan estimasi bagi hasil dividen
                  panen (proyeksi ROI 28% – 32% per siklus).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: KESIAPAN LAHAN & SIKLUS PERKEBUNAN (ENVAS #plans PATTERN)
          ========================================================================= */}
      <section id="kesiapan-lahan" className="py-5 envas-light-bg border-bottom">
        <div className="w-100 max-w-[1720px] mx-auto px-4 px-md-5 py-4">
          <div className="bg-white rounded-3xl p-4 p-md-5 border shadow-sm">
            <div className="row g-5 align-items-center">
              {/* Left Column: Process Steps */}
              <div className="col-12 col-lg-5 order-2 order-lg-1">
                <div className="mb-4">
                  <span className="badge bg-emerald-100 text-emerald-800 font-weight-bold px-3 py-1 rounded-pill uppercase mb-2" style={{ fontSize: 11 }}>
                    SIKLUS PENUH PERKEBUNAN
                  </span>
                  <h2 className="font-weight-extrabold text-dark tracking-tight mb-2" style={{ fontSize: 26 }}>
                    Tahapan Kesiapan Lahan & Siklus Perkebunan Berkelanjutan
                  </h2>
                  <p className="text-muted" style={{ fontSize: 13.5 }}>
                    Transparansi tahapan persiapan fisik lahan dari pembukaan awal, pemupukan organik, hingga panen dan rotasi tanaman.
                  </p>
                </div>

                <div className="d-flex flex-column gap-3">
                  {processSteps.map((step) => (
                    <div
                      key={step.id}
                      onClick={() => setTabIndex(step.id)}
                      className={`envas-plan-step ${tabIndex === step.id ? 'active' : ''}`}
                    >
                      <div className="envas-step-count">{step.step}</div>
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <h5 className="m-0 font-weight-bold text-dark" style={{ fontSize: 14.5 }}>
                            {step.title}
                          </h5>
                        </div>
                        <p className="m-0 mt-1 text-muted" style={{ fontSize: 12.5, lineHeight: 1.5 }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Photo Preview */}
              <div className="col-12 col-lg-7 order-1 order-lg-2">
                <div className="rounded-2xl overflow-hidden border shadow-sm bg-slate-900 position-relative">
                  <img
                    key={tabIndex}
                    src={processSteps.find((s) => s.id === tabIndex)?.image}
                    alt="Kesiapan Lahan Smart Farm"
                    className="w-100 transition-all duration-500"
                    style={{ height: 440, objectFit: 'cover' }}
                  />
                  <div className="position-absolute bottom-0 start-0 end-0 p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent text-white">
                    <span className="badge bg-emerald-600 text-white font-weight-bold px-2.5 py-1 rounded-pill mb-2" style={{ fontSize: 11 }}>
                      {processSteps.find((s) => s.id === tabIndex)?.badge}
                    </span>
                    <h4 className="font-weight-bold m-0 text-white text-lg">
                      {processSteps.find((s) => s.id === tabIndex)?.title}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Timeline Progress */}
            <div className="mt-5 pt-4 border-top">
              <PlantationLifecycleProgress />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: KOMODITAS & BLOK LAHAN (ENVAS MOSAIC GRID PATTERN)
          ========================================================================= */}
      <section id="blok-kebun" className="py-5 bg-white border-bottom">
        <div className="w-100 max-w-[1720px] mx-auto px-4 px-md-5 py-4">
          <div className="text-center max-w-[800px] mx-auto mb-5">
            <span className="badge bg-emerald-100 text-emerald-800 font-weight-bold px-3 py-1 rounded-pill uppercase mb-2" style={{ fontSize: 11 }}>
              KOMODITAS UNGGULAN & AREA KEBUN
            </span>
            <h2 className="font-weight-extrabold text-dark tracking-tight mb-2" style={{ fontSize: 28 }}>
              Portofolio Blok Lahan Perkebunan Terpadu
            </h2>
            <p className="text-muted" style={{ fontSize: 14 }}>
              Diversifikasi komoditas bernilai ekonomis tinggi untuk memaksimalkan hasil panen dan proteksi risiko modal.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                title: 'Blok A1 — Porang Ekspor Super',
                desc: 'Luas 0.8 Ha • Estimasi Panen: 14.5 Ton • Kontrak Off-taker Siap',
                image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
                status: 'Tahap Vegetatif (Subur)',
                statusColor: 'bg-emerald-600',
              },
              {
                title: 'Blok B1 — Jagung Hibrida Pangan',
                desc: 'Luas 0.6 Ha • Estimasi Panen: 7.2 Ton • Varietas NK-212 Unggul',
                image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
                status: 'Fase Pembuahan',
                statusColor: 'bg-sky-600',
              },
              {
                title: 'Blok C1 — Anggur Impor & Melon Greenhouse',
                desc: 'Luas 0.4 Ha • Greenhouse Fertigasi Otomatis IoT • Nilai Jual Tinggi',
                image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
                status: 'Panen Perdana Mendatang',
                statusColor: 'bg-amber-600',
              },
              {
                title: 'Blok D1 — Persemaian Bibit & Riset Organik',
                desc: 'Luas 0.2 Ha • Rumah Benih Sertifikasi & Fermentasi Kompos Hayati',
                image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
                status: 'Pusat Bibit Aktif',
                statusColor: 'bg-emerald-700',
              },
              {
                title: 'Stasiun Sensor IoT & Pemantau Cuaca BMKG',
                desc: 'Sensor Kelembaban Tanah, pH Real-time, & Anemometer Cuaca',
                image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
                status: 'Online 24 Jam',
                statusColor: 'bg-emerald-600',
              },
              {
                title: 'Pos Timbangan Digital & Distribusi Logistik',
                desc: 'Timbangan Truk Digital Terhubung Otomatis ke Ledger Finansial',
                image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80',
                status: 'Sistem Terintegrasi',
                statusColor: 'bg-slate-800',
              },
            ].map((item, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div className="envas-mosaic-card">
                  <img src={item.image} alt={item.title} />
                  <div className="envas-mosaic-overlay">
                    <span className={`badge ${item.statusColor} text-white font-weight-bold px-2 py-1 rounded-pill mb-2 self-start`} style={{ fontSize: 10 }}>
                      {item.status}
                    </span>
                    <h5 className="font-weight-bold text-white mb-1" style={{ fontSize: 16 }}>
                      {item.title}
                    </h5>
                    <p className="text-slate-200 mb-0" style={{ fontSize: 12 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PETA GIS SATELIT GEOSPATIAL INTERAKTIF
          ========================================================================= */}
      <section id="peta-gis" className="py-5 envas-light-bg border-bottom">
        <div className="w-100 max-w-[1720px] mx-auto px-4 px-md-5 py-4">
          <div className="text-center max-w-[800px] mx-auto mb-4">
            <span className="badge bg-emerald-100 text-emerald-800 font-weight-bold px-3 py-1 rounded-pill uppercase mb-2" style={{ fontSize: 11 }}>
              GEOSPATIAL SATELLITE TELEMETRY
            </span>
            <h2 className="font-weight-extrabold text-dark tracking-tight mb-2" style={{ fontSize: 28 }}>
              Peta GIS Satelit & Pemantau Titik Lahan Perkebunan
            </h2>
            <p className="text-muted" style={{ fontSize: 14 }}>
              Pantau batas polygon blok kebun, ketinggian kontur tanah, sensor kelembapan, dan lokasi stasiun cuaca live.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-4 border shadow-sm">
            <InteractiveGisMap
              lands={lands}
              activeLat={activeLat}
              activeLng={activeLng}
              onCoordinatesChange={() => {}}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: KINERJA KEUANGAN & PERTUMBUHAN VALUASI
          ========================================================================= */}
      <section id="kinerja-keuangan" className="py-5 bg-white border-bottom">
        <div className="w-100 max-w-[1720px] mx-auto px-4 px-md-5 py-4">
          <div className="text-center max-w-[800px] mx-auto mb-5">
            <span className="badge bg-sky-100 text-sky-800 font-weight-bold px-3 py-1 rounded-pill uppercase mb-2" style={{ fontSize: 11 }}>
              TRANSPARANSI KEUANGAN & VALUASI
            </span>
            <h2 className="font-weight-extrabold text-dark tracking-tight mb-2" style={{ fontSize: 28 }}>
              Kinerja Keuangan, Alokasi Modal & Efisiensi Burn Rate
            </h2>
            <p className="text-muted" style={{ fontSize: 14 }}>
              Akuntabilitas alokasi dana per komoditas, pertumbuhan valuasi modal terhadap waktu, dan rincian OPEX.
            </p>
          </div>

          <div className="row g-4">
            {/* Valuation Growth Line Chart */}
            <div className="col-12 col-xl-6">
              <div className="bg-white rounded-3xl p-4 border shadow-sm h-100">
                <div style={{ height: 300 }}>
                  <TurbineLineChart
                    title="📈 Pertumbuhan Valuasi Proyek (Rp Juta)"
                    subtitle="Perbandingan Valuasi Proyek vs Modal Disetor"
                    data={valuationGrowthData}
                  />
                </div>
              </div>
            </div>

            {/* Capital Allocation Donut Chart */}
            <div className="col-12 col-xl-6">
              <div className="bg-white rounded-3xl p-4 border shadow-sm h-100">
                <div style={{ height: 300 }}>
                  <TurbineDonutChart
                    title="🍰 Alokasi Modal Per Komoditas"
                    subtitle="Persentase Alokasi Modal Investasi Kebun"
                    data={capitalAllocationDonutData}
                  />
                </div>
              </div>
            </div>

            {/* OPEX Burn Rate Bar Chart */}
            <div className="col-12">
              <div className="bg-white rounded-3xl p-4 border shadow-sm">
                <div style={{ height: 280 }}>
                  <TurbineBarChart
                    title="📊 Rincian Pengeluaran OPEX Utama"
                    subtitle="Biaya Operasional Kebun Terverifikasi BAP & Bukti Transaksi"
                    data={burnRateBarData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: 5D AUDITOR FULL LEDGER (SUDUT PANDANG AUDITOR PROFESIONAL)
          ========================================================================= */}
      <section id="laporan-auditor" className="py-5 envas-light-bg border-bottom">
        <div className="w-100 max-w-[1720px] mx-auto px-4 px-md-5 py-4">
          <div className="text-center max-w-[800px] mx-auto mb-4">
            <span className="badge bg-emerald-100 text-emerald-800 font-weight-bold px-3 py-1 rounded-pill uppercase mb-2" style={{ fontSize: 11 }}>
              STANDAR 5-DIMENSI AUDITOR PROFESIONAL
            </span>
            <h2 className="font-weight-extrabold text-dark tracking-tight mb-2" style={{ fontSize: 28 }}>
              Buku Jurnal Arus Kas & Verifikasi Berita Acara Pekerjaan (BAP)
            </h2>
            <p className="text-muted" style={{ fontSize: 14 }}>
              Merangkum siklus penuh hulu-ke-hilir: Dimensi Waktu, Lokasi Site, Personel, Finansial OPEX, dan Output BAP.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-4 p-md-5 border shadow-sm">
            <FinancialLedgerShowcase financials={financials} onExportPDF={handleExportPDF} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: PARALLAX HOTLINE & KONSULTASI INVESTOR (ENVAS CTA)
          ========================================================================= */}
      <section className="envas-parallax-cta">
        <div className="w-100 max-w-[1720px] mx-auto px-4 px-md-5">
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4">
            <div className="d-flex align-items-center gap-4">
              <div
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#ffffff',
                  color: '#059669',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                  flexShrink: 0,
                  boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                }}
              >
                <i className="ri-customer-service-2-fill"></i>
              </div>
              <div>
                <h3 className="text-white font-weight-extrabold m-0" style={{ fontSize: 22 }}>
                  Pusat Layanan Akuntabilitas & Verifikasi Lapangan Investor
                </h3>
                <p className="text-emerald-100 m-0 mt-1" style={{ fontSize: 13.5 }}>
                  Hubungi tim hubungan investor & auditor perkebunan kami untuk jadwal kunjungan langsung ke lokasi perkebunan.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              <a
                href="tel:+628117000888"
                className="envas-btn envas-btn-green py-3 px-4 text-white"
                style={{ backgroundColor: '#ffffff', color: '#059669', borderColor: '#ffffff' }}
              >
                <i className="ri-phone-fill"></i> (+62) 811-7000-888
              </a>
              <Link to="/login" className="envas-btn envas-btn-dark py-3 px-4">
                <i className="ri-dashboard-3-line"></i> Masuk Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: ENVAS MULTIPURPOSE RICH FOOTER
          ========================================================================= */}
      <footer className="envas-footer pt-5 pb-4">
        <div className="w-100 max-w-[1720px] mx-auto px-4 px-md-5">
          <div className="row g-4 mb-5">
            {/* Col 1: About */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="d-flex align-items-center gap-2.5 mb-3">
                <div style={{ width: 38, height: 38, backgroundColor: '#059669', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20 }}>
                  <i className="ri-leaf-fill"></i>
                </div>
                <h4 className="text-white font-weight-bold m-0" style={{ fontSize: 19 }}>
                  Smart Farming Indonesia
                </h4>
              </div>
              <p className="mb-4" style={{ color: '#cbd5e1', fontSize: 13.5, lineHeight: 1.7 }}>
                Platform portal akuntabilitas dan transparansi investasi kebun modern. Mengintegrasikan teknologi agronomi ilmiah Balitbangtan, sensor GIS satelit, dan audit keuangan 5-Dimensi terpercaya.
              </p>
              <div>
                <span className="badge px-3 py-2 rounded-full font-weight-bold d-inline-flex align-items-center gap-1.5" style={{ backgroundColor: 'rgba(6, 78, 59, 0.85)', color: '#86efac', border: '1px solid #10b981', fontSize: 11.5 }}>
                  <i className="ri-shield-check-fill text-emerald-400"></i> Terverifikasi Auditor & BAP Fisik
                </span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="col-6 col-lg-2">
              <h5 className="text-white font-weight-bold">Navigasi Cepat</h5>
              <ul className="list-unstyled p-0 m-0">
                <li><a href="#hero"><i className="ri-arrow-right-s-line text-emerald-400"></i> Beranda</a></li>
                <li><a href="#kesiapan-lahan"><i className="ri-arrow-right-s-line text-emerald-400"></i> Kesiapan Lahan</a></li>
                <li><a href="#blok-kebun"><i className="ri-arrow-right-s-line text-emerald-400"></i> Blok Komoditas</a></li>
                <li><a href="#peta-gis"><i className="ri-arrow-right-s-line text-emerald-400"></i> Peta GIS Satelit</a></li>
                <li><a href="#kinerja-keuangan"><i className="ri-arrow-right-s-line text-emerald-400"></i> Kinerja Keuangan</a></li>
              </ul>
            </div>

            {/* Col 3: Standar Kepatuhan */}
            <div className="col-6 col-lg-3">
              <h5 className="text-white font-weight-bold">Standar Agronomi</h5>
              <ul className="list-unstyled p-0 m-0" style={{ fontSize: 13.5, lineHeight: 1.9, color: '#e2e8f0' }}>
                <li><i className="ri-check-double-line text-emerald-400 me-2 font-weight-bold"></i> Netralisasi pH Kapur Dolomit 6.2</li>
                <li><i className="ri-check-double-line text-emerald-400 me-2 font-weight-bold"></i> Bibit Sertifikasi A+ Balai Benih</li>
                <li><i className="ri-check-double-line text-emerald-400 me-2 font-weight-bold"></i> Proteksi Agen Hayati Trichoderma</li>
                <li><i className="ri-check-double-line text-emerald-400 me-2 font-weight-bold"></i> Timbangan Digital Presisi PKS</li>
                <li><i className="ri-check-double-line text-emerald-400 me-2 font-weight-bold"></i> Kontrak Off-taker Terikat</li>
              </ul>
            </div>

            {/* Col 4: Kontak Tim Lahan */}
            <div className="col-12 col-md-6 col-lg-3">
              <h5 className="text-white font-weight-bold">Kontak & Lokasi</h5>
              <ul className="list-unstyled p-0 m-0" style={{ fontSize: 13.5, lineHeight: 1.8, color: '#e2e8f0' }}>
                <li className="d-flex align-items-start gap-2.5 mb-3">
                  <i className="ri-map-pin-2-fill text-emerald-400 mt-1" style={{ fontSize: 16 }}></i>
                  <span>Kawasan Sentra Perkebunan Smart Farming Indonesia</span>
                </li>
                <li className="d-flex align-items-center gap-2.5 mb-3">
                  <i className="ri-phone-fill text-emerald-400" style={{ fontSize: 16 }}></i>
                  <strong className="text-white">(+62) 811-7000-888</strong>
                </li>
                <li className="d-flex align-items-center gap-2.5 mb-3">
                  <i className="ri-mail-fill text-emerald-400" style={{ fontSize: 16 }}></i>
                  <span className="text-white font-weight-medium">investor@smartfarm.id</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-top border-slate-800 text-center envas-footer-bottom" style={{ color: '#cbd5e1', fontSize: 12.5 }}>
            © 2026 PT Smart Farming Indonesia • Portal Akuntabilitas Investasi Investor ({userName}) • Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
};
