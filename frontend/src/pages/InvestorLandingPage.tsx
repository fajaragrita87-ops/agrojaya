import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInvestorDashboard, getLands, getFinancials, getBmkgWeather } from '../services/api';
import { TurbineLineChart, TurbineDonutChart, TurbineBarChart } from '../components/TurbineChart';
import { InteractiveGisMap } from '../components/InteractiveGisMap';
import { PlantationLifecycleProgress } from '../components/PlantationLifecycleProgress';
import { FinancialLedgerShowcase } from '../components/FinancialLedgerShowcase';

export const InvestorLandingPage = () => {
  const [lands, setLands] = useState<any[]>([]);
  const [financials, setFinancials] = useState<any[]>([]);
  const [bmkgWeather, setBmkgWeather] = useState<any>(null);
  const [activeLat, setActiveLat] = useState('0.507067');
  const [activeLng, setActiveLng] = useState('101.447771');
  const [tabIndex, setTabIndex] = useState<number>(1);

  useEffect(() => {
    getInvestorDashboard().catch(console.error);
    getLands()
      .then((res) => {
        if (res.data) {
          setLands(res.data);
          if (res.data.length > 0 && res.data[0].latitude) {
            setActiveLat(String(res.data[0].latitude));
            setActiveLng(String(res.data[0].longitude));
          }
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
    { label: 'Kelapa Sawit Tenera (Blok A1-A2)', value: 45, color: '#059669' },
    { label: 'Jagung Hibrida Kawasan Pangan (Blok B1)', value: 30, color: '#2563eb' },
    { label: 'Anggur Impor & Melon (Blok C1-D1)', value: 25, color: '#f59e0b' },
  ];

  const burnRateBarData = [
    { label: 'Upah Harian Petani Bulanan', value: 42000000, color: '#059669' },
    { label: 'Pengadaan Pupuk NPK & Kapur Dolomit', value: 28000000, color: '#2563eb' },
    { label: 'Perawatan Traktor & Sistem Irigasi', value: 15000000, color: '#f59e0b' },
  ];

  const handleExportPDF = () => {
    alert('Mengunduh Laporan Terpadu 5-Dimensi Auditor & Laporan Keuangan Investor (PDF)...');
  };

  return (
    <main className="page-wrapper demo-solar active-light-mode w-100 min-vh-100 overflow-x-hidden">
      {/* SECTION 1: Header Announcement Bar (Murni Bahasa Indonesia) */}
      <div className="header-top-news bg-image1">
        <div className="wrapper">
          <div className="container-fluid px-4 px-md-5">
            <div className="row">
              <div className="col-lg-12">
                <div className="inner d-flex justify-content-between align-items-center">
                  <div className="content d-flex align-items-center gap-2">
                    <span className="tmp-badge bg-success text-white px-2.5 py-1 rounded" style={{ fontSize: 11, fontWeight: 700 }}>
                      PORTAL INVESTOR PERKEBUNAN
                    </span>
                    <span className="news-text text-dark font-weight-bold" style={{ fontSize: 13 }}>
                      PT Agro Jaya Indonesia • Transparansi Kesiapan Fisik Lahan & Akuntabilitas Modal Investasi
                    </span>
                  </div>
                  <div className="right-button d-flex align-items-center gap-3">
                    <span className="text-primary font-weight-bold" style={{ fontSize: 12 }}>
                      <i className="feather-sun me-1"></i> BMKG: {bmkgWeather?.temperature || 29}°C (Pemupukan Ideal)
                    </span>
                    <button onClick={handleExportPDF} className="btn-read-more border-0 bg-transparent cursor-pointer">
                      <span className="text-success font-weight-bold" style={{ fontSize: 12 }}>
                        Unduh Laporan 5D <i className="feather-arrow-right"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Header Navigation Bar (Murni Bahasa Indonesia) */}
      <header className="tmp-header header-default header-left-align header-sticky-smooth header-sticky border-bottom bg-white sticky-top">
        <div className="container-fluid px-4 px-md-5 position-relative">
          <div className="row align-items-center">
            <div className="col-lg-9 col-md-6 col-4 position-static">
              <div className="header-left d-flex align-items-center gap-4">
                <div className="logo d-flex align-items-center gap-2">
                  <div style={{ width: 42, height: 42, backgroundColor: '#059669', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: 22 }}>
                    <i className="ri-leaf-line"></i>
                  </div>
                  <div>
                    <h3 className="m-0 font-weight-bold text-dark" style={{ fontSize: 18, letterSpacing: '-0.5px' }}>AgroJaya Indonesia</h3>
                    <span style={{ fontSize: 10, color: '#059669', fontWeight: 700, textTransform: 'uppercase' }}>Portal Transparansi Investor</span>
                  </div>
                </div>

                <nav className="mainmenu-nav d-none d-lg-block">
                  <ul className="mainmenu d-flex align-items-center gap-4 m-0 p-0 list-unstyled" style={{ fontSize: 14, whiteSpace: 'nowrap' }}>
                    <li className="active font-weight-bold"><a href="#hero" className="text-dark">Beranda</a></li>
                    <li><a href="#kesiapan-lahan" className="text-secondary">Kesiapan Lahan</a></li>
                    <li><a href="#peta-gis" className="text-secondary">Peta GIS Satelit</a></li>
                    <li><a href="#kinerja-keuangan" className="text-secondary">Kinerja Keuangan & Hasil Investasi</a></li>
                    <li><a href="#laporan-auditor" className="text-secondary">Laporan 5D Auditor</a></li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-8 text-end">
              <Link to="/dashboard/investor" className="tmp-btn btn-small btn-primary-gradient px-4 py-2.5 text-white font-weight-bold rounded-3" style={{ backgroundColor: '#059669', border: 'none', fontSize: 13, whiteSpace: 'nowrap' }}>
                PORTAL INVESTOR
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 3: Hero Banner (Murni Bahasa Indonesia & Foto Nyata Perkebunan) */}
      <div id="hero" className="demo-banner-area-start-solar tmp-section-gap height-650 bg_image py-5" style={{ backgroundColor: '#f0fdf4' }}>
        <div className="container-fluid px-4 px-md-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-12">
              <div className="inner no-radious text-center mx-auto space-y-4 px-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <span className="badge bg-success-subtle text-success border border-success px-3.5 py-1.5 rounded-pill uppercase font-weight-bold mb-3 d-inline-block" style={{ fontSize: 12 }}>
                  <i className="feather-shield me-1"></i> PORTAL TRANSPARANSI INVESTASI AGROJAYA
                </span>

                <h1 className="title w-800 text-dark font-weight-extrabold mb-3 text-center" style={{ fontSize: 'clamp(24px, 3.5vw, 44px)', lineHeight: 1.25, width: '100%', wordBreak: 'normal' }}>
                  MENDORONG MASA DEPAN <br />
                  PERKEBUNAN <span className="theme-gradient text-success" style={{ color: '#059669' }}>AGROJAYA INDONESIA</span>
                </h1>

                <div className="tmp-personal-portfolio-content">
                  <p className="description text-secondary mx-auto mb-4" style={{ maxWidth: 800, fontSize: 16, lineHeight: 1.6 }}>
                    Transparansi & Akuntabilitas Perjalanan Investasi Perkebunan AgroJaya. Memantau secara langsung kesiapan fisik pengolahan tanah (dari pembukaan lahan hingga panen & rotasi tanaman) serta akuntabilitas alokasi modal & hasil investasi proyek secara waktu nyata (*real-time*).
                  </p>

                  <div className="view-more-project d-flex justify-content-center gap-3">
                    <button onClick={handleExportPDF} className="btn-read-more border-0 px-4 py-3 bg-success text-white rounded-3 font-weight-bold d-inline-flex align-items-center gap-2 cursor-pointer shadow">
                      <span>Unduh Laporan Auditor 5D <i className="feather-arrow-right"></i></span>
                    </button>
                    <Link to="/dashboard/investor" className="btn-read-more border border-secondary px-4 py-3 bg-white text-dark rounded-3 font-weight-bold d-inline-flex align-items-center gap-2 shadow-sm">
                      <span>Masuk Dasbor Investor <i className="feather-user me-1"></i></span>
                    </Link>
                  </div>
                </div>

                {/* Key Metric Counter Cards */}
                <div className="row g-4 justify-content-center pt-4">
                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="bg-white p-4 rounded-4 shadow-sm border text-start">
                      <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Valuasi Saat Ini</span>
                      <strong className="text-success h3 font-weight-extrabold mb-0">Rp 3.1 M</strong>
                      <span className="d-block text-success font-weight-bold mt-1" style={{ fontSize: 11 }}>+24.0% Pertumbuhan Bersih</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="bg-white p-4 rounded-4 shadow-sm border text-start">
                      <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Modal Disetor</span>
                      <strong className="text-dark h3 font-weight-extrabold mb-0">Rp 2.5 M</strong>
                      <span className="d-block text-muted font-weight-bold mt-1" style={{ fontSize: 11 }}>100% Terrealisasi</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="bg-white p-4 rounded-4 shadow-sm border text-start">
                      <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Luas Lahan</span>
                      <strong className="text-dark h3 font-weight-extrabold mb-0">39.2 Ha</strong>
                      <span className="d-block text-success font-weight-bold mt-1" style={{ fontSize: 11 }}>5 Blok Kebun Aktif</span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="bg-white p-4 rounded-4 shadow-sm border text-start">
                      <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Kesiapan Fisik Lahan</span>
                      <strong className="text-primary h3 font-weight-extrabold mb-0">65% Siap</strong>
                      <span className="d-block text-primary font-weight-bold mt-1" style={{ fontSize: 11 }}>Tahap 4 & 5 Aktif</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Kesiapan Lahan & Aktivitas Lapangan (Foto Nyata Perkebunan High-Res) */}
      <div id="kesiapan-lahan" className="auto-slider-service tmp-section-gap py-5">
        <div className="container-fluid px-4 px-md-5">
          <div className="row">
            <div className="col-lg-12">
              <div className="service-layout-presentation-box bg-white p-4 p-md-5 rounded-4 border shadow-sm">
                <div className="row g-5 align-items-center">
                  <div className="col-lg-5 order-2 order-lg-1">
                    <div className="section-title text-start mb-4">
                      <span className="subtitle bg-primary-opacity text-success font-weight-bold px-3 py-1 rounded-pill bg-light border" style={{ fontSize: 12 }}>
                        Tahapan Kesiapan Perkebunan Nusantara
                      </span>
                      <h3 className="title font-weight-bold mt-2" style={{ color: '#0f172a', fontSize: 28 }}>
                        Pengolahan Tanah & Siklus Perkebunan Berkelanjutan
                      </h3>
                    </div>

                    <div className="advance-tab-button advance-tab-button-1">
                      <ul className="nav nav-tabs tab-button-list flex-column gap-3 list-unstyled" role="tablist">
                        <li className="nav-item">
                          <button onClick={() => setTabIndex(1)} className={`w-100 text-start p-3 rounded-3 border-0 transition ${tabIndex === 1 ? 'bg-success text-white' : 'bg-light text-dark'}`}>
                            <div className="d-flex gap-3 align-items-center">
                              <span className="h4 m-0 font-weight-bold">01</span>
                              <div>
                                <h5 className={`m-0 font-weight-bold ${tabIndex === 1 ? 'text-white' : 'text-dark'}`}>Pembukaan & Penggarapan Lahan</h5>
                                <p className={`m-0 ${tabIndex === 1 ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: 12 }}>Pembersihan semak belukar & sanitasi lahan tanpa bakar.</p>
                              </div>
                            </div>
                          </button>
                        </li>

                        <li className="nav-item">
                          <button onClick={() => setTabIndex(2)} className={`w-100 text-start p-3 rounded-3 border-0 transition ${tabIndex === 2 ? 'bg-success text-white' : 'bg-light text-dark'}`}>
                            <div className="d-flex gap-3 align-items-center">
                              <span className="h4 m-0 font-weight-bold">02</span>
                              <div>
                                <h5 className={`m-0 font-weight-bold ${tabIndex === 2 ? 'text-white' : 'text-dark'}`}>Fermentasi & Penanaman Bibit</h5>
                                <p className={`m-0 ${tabIndex === 2 ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: 12 }}>Aplikasi kapur dolomit & benih sertifikasi Balai Benih.</p>
                              </div>
                            </div>
                          </button>
                        </li>

                        <li className="nav-item">
                          <button onClick={() => setTabIndex(3)} className={`w-100 text-start p-3 rounded-3 border-0 transition ${tabIndex === 3 ? 'bg-success text-white' : 'bg-light text-dark'}`}>
                            <div className="d-flex gap-3 align-items-center">
                              <span className="h4 m-0 font-weight-bold">03</span>
                              <div>
                                <h5 className={`m-0 font-weight-bold ${tabIndex === 3 ? 'text-white' : 'text-dark'}`}>Panen Raya & Timbang PKS</h5>
                                <p className={`m-0 ${tabIndex === 3 ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: 12 }}>Timbangan truk digital PKS & logistik panen.</p>
                              </div>
                            </div>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-7 order-1 order-lg-2">
                    <div className="thumbnail rounded-4 overflow-hidden border bg-light shadow-sm">
                      <img
                        key={tabIndex}
                        src={
                          tabIndex === 1
                            ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
                            : tabIndex === 2
                            ? 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80'
                            : 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
                        }
                        alt="Perkebunan AgroJaya"
                        className="w-100"
                        style={{ height: 360, objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-top">
                  <PlantationLifecycleProgress />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5: Bantuan Helpline (Murni Bahasa Indonesia) */}
      <section className="tmp-get-in-touch-area area-2 py-4" style={{ backgroundColor: '#059669' }}>
        <div className="container-fluid px-4 px-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white gap-3">
            <div className="d-flex align-items-center gap-3">
              <div style={{ width: 48, height: 48, backgroundColor: '#fff', color: '#059669', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                <i className="feather-phone"></i>
              </div>
              <div>
                <h4 className="m-0 font-weight-bold text-white">Layanan Bantuan & Audit Investor AgroJaya</h4>
                <p className="m-0 text-white-50" style={{ fontSize: 13 }}>Hubungi Tim Akuntabilitas Investasi PT Agro Jaya Indonesia 24 Jam</p>
              </div>
            </div>
            <a href="tel:+628117000888" className="tmp-btn bg-white text-success font-weight-bold px-4 py-2.5 rounded-3 border-0">
              +62 811-7000-888
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6: Layanan Pengelolaan & Audit Perkebunan (Foto Nyata Perkebunan) */}
      <div className="tmp-service-area py-5 bg-light">
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title text-center mb-5">
            <span className="subtitle text-success font-weight-bold text-uppercase" style={{ fontSize: 12 }}>LAYANAN OPERASIONAL</span>
            <h2 className="title font-weight-bold" style={{ color: '#0f172a', fontSize: 28 }}>Layanan Pengelolaan & Audit Perkebunan</h2>
          </div>

          <div className="row g-4">
            {[
              { photo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', title: 'Perencanaan Pembukaan Lahan' },
              { photo: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80', title: 'Penggarapan & Pembajakan Tanah' },
              { photo: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80', title: 'Fermentasi Nutrisi Bio-Organik' },
              { photo: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80', title: 'Penanaman Benih Sertifikasi A+' },
              { photo: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80', title: 'Presisi Fertigasi & BMKG Langsung' },
              { photo: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80', title: 'Taksasi & Seleksi Mutu Panen PKS' },
            ].map((srv, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="bg-white p-3 rounded-4 border shadow-sm h-100">
                  <div className="rounded-3 overflow-hidden mb-3 bg-light">
                    <img src={srv.photo} alt={srv.title} className="w-100" style={{ height: 200, objectFit: 'cover' }} />
                  </div>
                  <h5 className="font-weight-bold text-dark m-0">{srv.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 7: 3 Alternating Showcase Sections (Foto Nyata Perkebunan High-Res) */}
      <div className="sticky-wrapper-about-fluid py-5">
        <div className="container-fluid px-4 px-md-5 space-y-5">
          {/* Section 1 */}
          <div className="row g-4 align-items-center bg-white p-4 p-md-5 rounded-4 border shadow-sm">
            <div className="col-lg-6">
              <div className="rounded-4 overflow-hidden border bg-light shadow-sm">
                <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80" alt="Penggarapan Lahan" className="w-100" style={{ height: 340, objectFit: 'cover' }} />
              </div>
            </div>
            <div className="col-lg-6 space-y-3">
              <span className="badge bg-success-subtle text-success border border-success px-3 py-1 rounded-pill uppercase font-weight-bold" style={{ fontSize: 11 }}>
                FASE 1: PEMBUKAAN & PENGGARAPAN LAHAN
              </span>
              <h3 className="h3 font-weight-bold text-dark mb-2">Pengolahan Lahan Ramah Lingkungan & Terukur</h3>
              <ul className="list-unstyled space-y-2 text-dark font-weight-bold" style={{ fontSize: 14 }}>
                <li><i className="feather-check text-success me-2"></i> Pembersihan semak tropis tanpa pembakaran lahan.</li>
                <li><i className="feather-check text-success me-2"></i> Penggemburan tanah hingga kedalaman olah 40 cm.</li>
              </ul>
              <a className="tmp-btn bg-success text-white px-4 py-2.5 rounded-3 d-inline-flex align-items-center gap-2" href="#kesiapan-lahan">
                <span>Inspeksi Lahan <i className="feather-arrow-right"></i></span>
              </a>
            </div>
          </div>

          {/* Section 2 */}
          <div className="row g-4 align-items-center bg-white p-4 p-md-5 rounded-4 border shadow-sm">
            <div className="col-lg-6 space-y-3 order-2 order-lg-1">
              <span className="badge bg-primary-subtle text-primary border border-primary px-3 py-1 rounded-pill uppercase font-weight-bold" style={{ fontSize: 11 }}>
                FASE 2: FERMENTASI & PENANAMAN BIBIT
              </span>
              <h3 className="h3 font-weight-bold text-dark mb-2">Hasil Panen Unggul Berstandar Ekspor</h3>
              <ul className="list-unstyled space-y-2 text-dark font-weight-bold" style={{ fontSize: 14 }}>
                <li><i className="feather-check text-primary me-2"></i> Pengayaan kompos organik bio-fermentasi lokal.</li>
                <li><i className="feather-check text-primary me-2"></i> Penanaman benih sertifikasi Balai Benih Indonesia.</li>
              </ul>
              <a className="tmp-btn bg-primary text-white px-4 py-2.5 rounded-3 d-inline-flex align-items-center gap-2" href="#kesiapan-lahan">
                <span>Lihat Sertifikasi Benih <i className="feather-arrow-right"></i></span>
              </a>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="rounded-4 overflow-hidden border bg-light shadow-sm">
                <img src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80" alt="Presisi Fertigasi" className="w-100" style={{ height: 340, objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="row g-4 align-items-center bg-white p-4 p-md-5 rounded-4 border shadow-sm">
            <div className="col-lg-6">
              <div className="rounded-4 overflow-hidden border bg-light shadow-sm">
                <img src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1200&q=80" alt="Panen Raya" className="w-100" style={{ height: 340, objectFit: 'cover' }} />
              </div>
            </div>
            <div className="col-lg-6 space-y-3">
              <span className="badge bg-warning-subtle text-warning-emphasis border border-warning px-3 py-1 rounded-pill uppercase font-weight-bold" style={{ fontSize: 11 }}>
                FASE 3: PANEN RAYA & PENIMBANGAN PKS
              </span>
              <h3 className="h3 font-weight-bold text-dark mb-2">Sistem Perkebunan Berkelanjutan Jangka Panjang</h3>
              <ul className="list-unstyled space-y-2 text-dark font-weight-bold" style={{ fontSize: 14 }}>
                <li><i className="feather-check text-warning me-2"></i> Sortir kualitas buah Mutu A/B/C pasar ekspor.</li>
                <li><i className="feather-check text-warning me-2"></i> Integrasi timbangan truk digital anti-kecurangan.</li>
              </ul>
              <a className="tmp-btn bg-warning text-dark px-4 py-2.5 rounded-3 d-inline-flex align-items-center gap-2" href="#kinerja-keuangan">
                <span>Lihat Jurnal Kas PKS <i className="feather-arrow-right"></i></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 8: Peta GIS Satelit Kebun (FULL PAGE WIDTH) */}
      <div id="peta-gis" className="py-5 bg-light border-top border-bottom">
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title text-center mb-4">
            <span className="subtitle text-success font-weight-bold text-uppercase" style={{ fontSize: 12 }}>PEMETAAN GIS SATELIT KEBUN</span>
            <h2 className="title font-weight-bold" style={{ color: '#0f172a', fontSize: 28 }}>
              Peta Satelit GIS Kebun — Bukti Fisik Lahan Investor
            </h2>
          </div>

          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
            <InteractiveGisMap
              lands={lands}
              activeLat={activeLat}
              activeLng={activeLng}
              onCoordinatesChange={(lat, lng) => {
                setActiveLat(lat);
                setActiveLng(lng);
              }}
            />
          </div>
        </div>
      </div>

      {/* SECTION 9: Financial Performance & Cashflow Section (FULL PAGE WIDTH) */}
      <div id="kinerja-keuangan" className="py-5">
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title text-center mb-5">
            <span className="subtitle text-success font-weight-bold text-uppercase" style={{ fontSize: 12 }}>AKUNTABILITAS KEUANGAN INVESTOR</span>
            <h2 className="title font-weight-bold" style={{ color: '#0f172a', fontSize: 28 }}>
              Transparansi Kinerja Keuangan & Pertumbuhan Valuasi
            </h2>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-lg-6">
              <TurbineLineChart
                title="Pertumbuhan Valuasi & Hasil Investasi (Juta Rp)"
                subtitle="Tren kenaikan valuasi portofolio disetor vs pertumbuhan nilai riil 6 bulan"
                data={valuationGrowthData}
                color1="#059669"
                color2="#2563eb"
                legend1="Valuasi Riil"
                legend2="Modal Disetor"
              />
            </div>
            <div className="col-lg-6">
              <TurbineDonutChart
                title="Alokasi Kapital Investasi Per Komoditas (%)"
                subtitle="Distribusi persentase modal yang disebar pada blok tanam"
                data={capitalAllocationDonutData}
              />
            </div>
          </div>

          <div className="mb-4">
            <TurbineBarChart
              title="Rincian Biaya Operasional Bulanan (Pengeluaran - Rp)"
              subtitle="Analisis efisiensi biaya operasional bulanan kebun"
              data={burnRateBarData}
            />
          </div>

          <div id="laporan-auditor">
            <FinancialLedgerShowcase financials={financials} onExportPDF={handleExportPDF} />
          </div>
        </div>
      </div>

      {/* SECTION 10: Formulir Kontak Investor (FULL PAGE WIDTH & TANPA GAMBAR NYEMPIL) */}
      <div className="contact-area-agency py-5 bg-light border-top">
        <div className="container-fluid px-4 px-md-5">
          <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm mx-auto" style={{ maxWidth: '960px' }}>
            <div className="text-center mb-4 space-y-2">
              <h3 className="font-weight-bold text-dark m-0 display-6">Hubungi Tim Hubungan Investor AgroJaya</h3>
              <p className="text-muted" style={{ fontSize: 15 }}>Jadwalkan kaji ulang prospektus dan inspeksi fisik lahan langsung bersama Tim Direksi PT Agro Jaya Indonesia.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Pesan Investor Terkirim ke Tim Direksi AgroJaya!'); }}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input type="text" className="form-control p-3 bg-light border-0 rounded-3" placeholder="Nama Lengkap Investor" required />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control p-3 bg-light border-0 rounded-3" placeholder="Nomor Telepon / WhatsApp" required />
                </div>
                <div className="col-12">
                  <input type="email" className="form-control p-3 bg-light border-0 rounded-3" placeholder="Email Perusahaan / Pribadi" required />
                </div>
                <div className="col-12">
                  <textarea className="form-control p-3 bg-light border-0 rounded-3" rows={4} placeholder="Catatan Diskusi / Nominal Rencana Investasi"></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="tmp-btn bg-success text-white font-weight-bold py-3 w-100 rounded-3 border-0" style={{ fontSize: 16 }}>
                    Kirim Pesan ke Tim Direksi
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* SECTION 11: Full Footer (FULL PAGE WIDTH & Murni Bahasa Indonesia) */}
      <footer className="tmp-footer footer-style-default bg-dark text-white-50 py-5 border-top" style={{ fontSize: 14 }}>
        <div className="container-fluid px-4 px-md-5">
          <div className="row g-4 pb-4 border-bottom border-secondary">
            <div className="col-lg-4 col-md-6">
              <div className="logo d-flex align-items-center gap-2 mb-3">
                <div style={{ width: 36, height: 36, backgroundColor: '#059669', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                  <i className="ri-leaf-line"></i>
                </div>
                <strong className="text-white h5 mb-0">Portal Investor AgroJaya</strong>
              </div>
              <p className="text-white-50" style={{ fontSize: 13, lineHeight: 1.6 }}>
                AgroJaya — Portal Akuntabilitas & Transparansi Investasi Perkebunan PT Agro Jaya Indonesia. Didedikasikan penuh bagi Investor untuk memantau kesiapan fisik lahan & kinerja keuangan.
              </p>
            </div>

            <div className="col-lg-2 col-md-6">
              <h5 className="text-white font-weight-bold mb-3" style={{ fontSize: 16 }}>Navigasi Portal</h5>
              <ul className="list-unstyled space-y-2" style={{ fontSize: 13 }}>
                <li><a href="#hero" className="text-white-50">Beranda</a></li>
                <li><a href="#kesiapan-lahan" className="text-white-50">Kesiapan Lahan</a></li>
                <li><a href="#peta-gis" className="text-white-50">Peta GIS Satelit</a></li>
                <li><a href="#kinerja-keuangan" className="text-white-50">Kinerja Keuangan</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h5 className="text-white font-weight-bold mb-3" style={{ fontSize: 16 }}>Kontak Auditor</h5>
              <ul className="list-unstyled space-y-2 text-white-50" style={{ fontSize: 13 }}>
                <li><i className="feather-map-pin me-2 text-success"></i> Pekanbaru, Riau, Indonesia</li>
                <li><i className="feather-phone me-2 text-success"></i> +62 811-7000-888</li>
                <li><i className="feather-mail me-2 text-success"></i> investor@agrojaya.co.id</li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h5 className="text-white font-weight-bold mb-3" style={{ fontSize: 16 }}>Keamanan Modal</h5>
              <p className="text-white-50" style={{ fontSize: 12 }}>
                Semua dana investasi dikelola di bawah rekening terpisah khusus investor dengan verifikasi audit 5-Dimensi secara berkala.
              </p>
            </div>
          </div>

          <div className="pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <p className="m-0" style={{ fontSize: 13 }}>© 2026 PT Agro Jaya Indonesia. Hak Cipta Dilindungi.</p>
            <div className="d-flex gap-3" style={{ fontSize: 13 }}>
              <a href="#" className="text-white-50">Kebijakan Privasi</a>
              <a href="#" className="text-white-50">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};
