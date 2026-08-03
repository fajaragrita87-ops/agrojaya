import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInvestorDashboard, getLands, getFinancials, getBmkgWeather } from '../services/api';
import { TurbineLineChart, TurbineDonutChart, TurbineBarChart } from '../components/TurbineChart';
import { InteractiveGisMap } from '../components/InteractiveGisMap';
import { PlantationLifecycleProgress } from '../components/PlantationLifecycleProgress';
import { FinancialLedgerShowcase } from '../components/FinancialLedgerShowcase';
import { useRole } from '../context/RoleContext';

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
    { label: 'Kelapa Sawit Tenera (Blok A1-A2)', value: 45, color: '#059669' },
    { label: 'Jagung Hibrida Kawasan Pangan (Blok B1)', value: 30, color: '#2563eb' },
    { label: 'Anggur Impor & Melon (Blok C1-D1)', value: 25, color: '#f59e0b' },
  ];

  const burnRateBarData = [
    { label: 'Upah Harian Petani Bulanan', value: 42000000, color: '#059669' },
    { label: 'Pengadaan Pupuk NPK & Kapur Dolomit', value: 28000000, color: '#2563eb' },
    { label: 'Perawatan Traktor & Irigasi', value: 15000000, color: '#f59e0b' },
  ];

  const handleExportPDF = () => {
    alert('Mengunduh Laporan Terpadu 5-Dimensi Auditor & Laporan Keuangan Investor (PDF)...');
  };

  return (
    <main className="page-wrapper demo-solar active-light-mode w-100 min-vh-100 overflow-x-hidden bg-light">
      {/* SECTION 1: Top News & Announcement Bar (Corpox Standard) */}
      <div className="header-top-news py-2.5 px-4 bg-dark text-white border-bottom border-secondary">
        <div className="container-fluid px-4 px-md-5">
          <div className="row align-items-center">
            <div className="col-12 col-md-8 d-flex align-items-center gap-3">
              {/* Removed verbose header text as requested */}
            </div>
            <div className="col-12 col-md-4 text-md-end d-flex align-items-center justify-content-md-end gap-3 mt-2 mt-md-0">
              <span className="text-warning font-weight-bold" style={{ fontSize: 12 }}>
                <i className="feather-sun me-1"></i> BMKG Jonggol: {bmkgWeather?.temperature || 28}°C (Ideal Tanam)
              </span>
              <button onClick={handleExportPDF} className="btn btn-sm btn-outline-light font-weight-bold py-1 px-3 rounded-pill style-btn" style={{ fontSize: 11 }}>
                Laporan Auditor <i className="feather-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Sticky Header Navigation (Corpox Template Style) */}
      <header className="tmp-header header-default header-sticky-smooth header-sticky bg-white border-bottom sticky-top shadow-xs">
        <div className="container-fluid px-4 px-md-5">
          <div className="row align-items-center" style={{ height: 72 }}>
            <div className="col-lg-3 col-md-4 col-6">
              <Link to="/" className="logo d-flex align-items-center gap-2.5 text-decoration-none">
                <div style={{ width: 42, height: 42, backgroundColor: '#059669', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: 22 }}>
                  <i className="ri-leaf-line"></i>
                </div>
                <div>
                  <h3 className="m-0 font-weight-extrabold text-dark" style={{ fontSize: 18, letterSpacing: '-0.5px' }}>
                    AgroJaya Indonesia
                  </h3>
                  <span className="text-success font-weight-bold d-block" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Portal Akuntabilitas Investor
                  </span>
                </div>
              </Link>
            </div>

            <div className="col-lg-6 d-none d-lg-block text-center">
              <nav className="mainmenu-nav">
                <ul className="mainmenu d-inline-flex align-items-center gap-4 m-0 p-0 list-unstyled font-weight-bold" style={{ fontSize: 13 }}>
                  <li><a href="#hero" className="text-dark hover-text-success text-decoration-none py-2 px-1">Beranda</a></li>
                  <li><a href="#kesiapan-lahan" className="text-secondary hover-text-success text-decoration-none py-2 px-1">Kesiapan Lahan</a></li>
                  <li><a href="#peta-gis" className="text-secondary hover-text-success text-decoration-none py-2 px-1">Peta GIS Satelit</a></li>
                  <li><a href="#kinerja-keuangan" className="text-secondary hover-text-success text-decoration-none py-2 px-1">Kinerja Keuangan</a></li>
                  <li><a href="#laporan-auditor" className="text-secondary hover-text-success text-decoration-none py-2 px-1">Laporan 5D Auditor</a></li>
                </ul>
              </nav>
            </div>

            <div className="col-lg-3 col-md-8 col-6 text-end">
              <Link to="/dashboard/investor" className="btn btn-primary-gradient px-4 py-2.5 text-white font-weight-extrabold rounded-3 shadow-xs d-inline-flex align-items-center gap-2" style={{ fontSize: 13 }}>
                <i className="ri-user-line !text-sm"></i> Portal Investor ({userName})
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 3: Hero Banner (Corpox Solar Template Style) */}
      <div id="hero" className="demo-banner-area-start-solar py-5 border-bottom" style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)' }}>
        <div className="container-fluid px-4 px-md-5 py-4">
          <div className="row g-5 align-items-center">
            <div className="col-lg-12">
              <div className="text-center mx-auto" style={{ maxWidth: '900px' }}>
                <h1 className="font-weight-extrabold text-dark mb-4 text-center" style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.2, letterSpacing: '-1px' }}>
                  Portal Transparansi Investasi & Akuntabilitas Lahan <br />
                  <span className="text-success" style={{ color: '#059669' }}>Perkebunan Agro Jaya</span>
                </h1>

                <div className="d-flex justify-content-center gap-3 pt-2 mb-2">
                  <button onClick={handleExportPDF} className="btn btn-primary-gradient px-4 py-3 text-white rounded-3 font-weight-extrabold shadow-sm d-inline-flex align-items-center gap-2" style={{ fontSize: 14 }}>
                    <i className="ri-file-download-line !text-base"></i> Unduh Laporan Auditor 5D
                  </button>
                  <Link to="/dashboard/investor" className="btn btn-outline-success px-4 py-3 text-success font-weight-extrabold rounded-3 bg-white shadow-xs d-inline-flex align-items-center gap-2" style={{ fontSize: 14 }}>
                    <i className="ri-dashboard-line !text-base"></i> Masuk Dasbor Investor
                  </Link>
                </div>

                {/* Corpox Bento Stat Cards Grid */}
                <div className="row g-3 pt-4 text-start">
                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="card-box card-box-hover p-4 border bg-white h-100">
                      <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Valuasi Proyek Saat Ini</span>
                      <strong className="text-success h3 font-weight-extrabold mb-0 d-block !text-lg">Rp 3,1 Miliar</strong>
                      <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 11 }}>
                        <i className="ri-arrow-up-line me-1"></i> +24.0% Pertumbuhan Bersih
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="card-box card-box-hover p-4 border bg-white h-100">
                      <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Modal Disetor</span>
                      <strong className="text-dark h3 font-weight-extrabold mb-0 d-block !text-lg">Rp 2,5 Miliar</strong>
                      <span className="d-block text-muted font-weight-bold mt-1.5" style={{ fontSize: 11 }}>
                        <i className="ri-checkbox-circle-line text-success me-1"></i> 100% Terrealisasi Ke Lahan
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="card-box card-box-hover p-4 border bg-white h-100">
                      <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Total Area Aktif</span>
                      <strong className="text-dark h3 font-weight-extrabold mb-0 d-block !text-lg">2.0 Hektar</strong>
                      <span className="d-block text-success font-weight-bold mt-1.5" style={{ fontSize: 11 }}>
                        <i className="ri-map-pin-2-line me-1"></i> Jonggol, Bogor Jawa Barat
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="card-box card-box-hover p-4 border bg-white h-100">
                      <span className="text-uppercase text-muted font-weight-bold d-block mb-1" style={{ fontSize: 11 }}>Kesiapan Fisik Lahan</span>
                      <strong className="text-primary h3 font-weight-extrabold mb-0 d-block !text-lg">65% Siap</strong>
                      <span className="d-block text-primary font-weight-bold mt-1.5" style={{ fontSize: 11 }}>
                        <i className="ri-time-line me-1"></i> Tahap 4 & 5 Aktif Panen
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Kesiapan Lahan & Aktivitas Lapangan (Corpox Tab Layout) */}
      <div id="kesiapan-lahan" className="py-5 bg-white border-bottom">
        <div className="container-fluid px-4 px-md-5 py-3">
          <div className="card-box p-4 p-md-5 rounded-4 border">
            <div className="row g-5 align-items-center">
              <div className="col-lg-5 order-2 order-lg-1">
                <div className="section-title text-start mb-4">
                  <span className="tmp-badge-card success mb-2 d-inline-block">
                    SIKLUS PENUH PERKEBUNAN AGROJAYA
                  </span>
                  <h3 className="font-weight-extrabold text-dark mt-2" style={{ fontSize: 26, letterSpacing: '-0.5px' }}>
                    Tahapan Kesiapan Lahan & Siklus Perkebunan Berkelanjutan
                  </h3>
                  <p className="text-secondary font-weight-medium" style={{ fontSize: 13 }}>
                    Dokumentasi nyata tahap pembukaan lahan, pemupukan bio-organik, hingga pemanenan hasil
                  </p>
                </div>

                <div className="advance-tab-button advance-tab-button-1">
                  <div className="d-flex flex-column gap-3">
                    <button
                      onClick={() => setTabIndex(1)}
                      className={`w-100 text-start p-3.5 rounded-3 border transition cursor-pointer ${
                        tabIndex === 1 ? 'bg-success text-white shadow-xs border-success' : 'bg-light text-dark hover-bg-light'
                      }`}
                    >
                      <div className="d-flex gap-3 align-items-center">
                        <span className="h4 m-0 font-weight-extrabold">01</span>
                        <div>
                          <h6 className={`m-0 font-weight-bold ${tabIndex === 1 ? 'text-white' : 'text-dark'}`} style={{ fontSize: 14 }}>
                            Pembukaan & Penggarapan Lahan
                          </h6>
                          <p className={`m-0 mt-0.5 ${tabIndex === 1 ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: 12 }}>
                            Pembersihan semak belukar, pembajakan tanah, & sanitasi tanpa pembakaran
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setTabIndex(2)}
                      className={`w-100 text-start p-3.5 rounded-3 border transition cursor-pointer ${
                        tabIndex === 2 ? 'bg-success text-white shadow-xs border-success' : 'bg-light text-dark hover-bg-light'
                      }`}
                    >
                      <div className="d-flex gap-3 align-items-center">
                        <span className="h4 m-0 font-weight-extrabold">02</span>
                        <div>
                          <h6 className={`m-0 font-weight-bold ${tabIndex === 2 ? 'text-white' : 'text-dark'}`} style={{ fontSize: 14 }}>
                            Fermentasi & Penanaman Bibit A+
                          </h6>
                          <p className={`m-0 mt-0.5 ${tabIndex === 2 ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: 12 }}>
                            Aplikasi kapur dolomit, kompos bio-organik, & penanaman benih sertifikasi Balai Benih
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setTabIndex(3)}
                      className={`w-100 text-start p-3.5 rounded-3 border transition cursor-pointer ${
                        tabIndex === 3 ? 'bg-success text-white shadow-xs border-success' : 'bg-light text-dark hover-bg-light'
                      }`}
                    >
                      <div className="d-flex gap-3 align-items-center">
                        <span className="h4 m-0 font-weight-extrabold">03</span>
                        <div>
                          <h6 className={`m-0 font-weight-bold ${tabIndex === 3 ? 'text-white' : 'text-dark'}`} style={{ fontSize: 14 }}>
                            Panen Raya & Penimbangan PKS
                          </h6>
                          <p className={`m-0 mt-0.5 ${tabIndex === 3 ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: 12 }}>
                            Penimbangan otomatis truk digital PKS & logistik distribusi hasil kebun
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-7 order-1 order-lg-2">
                <div className="rounded-4 overflow-hidden border bg-light shadow-sm">
                  <img
                    key={tabIndex}
                    src={
                      tabIndex === 1
                        ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
                        : tabIndex === 2
                        ? 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80'
                        : 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1200&q=80'
                    }
                    alt="Perkebunan AgroJaya"
                    className="w-100"
                    style={{ height: 380, objectFit: 'cover' }}
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

      {/* SECTION 5: Hotline Bantuan & Layanan Investor (Corpox Touch Area) */}
      <section className="py-4 text-white" style={{ backgroundColor: '#059669' }}>
        <div className="container-fluid px-4 px-md-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <div style={{ width: 48, height: 48, backgroundColor: '#fff', color: '#059669', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                <i className="feather-phone"></i>
              </div>
              <div>
                <h5 className="m-0 font-weight-extrabold text-white">Layanan Akuntabilitas & Audit Investor AgroJaya</h5>
                <p className="m-0 text-white-50 font-weight-medium" style={{ fontSize: 12 }}>
                  Hubungi Tim Pertanggungjawaban Investasi PT Agro Jaya Indonesia 24 Jam
                </p>
              </div>
            </div>
            <a href="tel:+628117000888" className="btn btn-light text-success font-weight-extrabold px-4 py-2.5 rounded-3 border-0 shadow-xs" style={{ fontSize: 14 }}>
              +62 811-7000-888
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6: Layanan Pengelolaan Kebun (Corpox Hover Cards Grid) */}
      <div className="py-5 bg-light border-bottom">
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title text-center mb-5">
            <span className="tmp-badge-card success mb-2 d-inline-block">LAYANAN OPERASIONAL KEBUN</span>
            <h2 className="font-weight-extrabold text-dark !text-lg">
              Layanan Pengelolaan & Audit Fisik Perkebunan
            </h2>
          </div>

          <div className="row g-4">
            {[
              { photo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', title: 'Perencanaan Pembukaan Lahan Presisi' },
              { photo: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80', title: 'Penggarapan & Pembajakan Tanah Olah' },
              { photo: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80', title: 'Pengayaan Nutrisi Bio-Organik Kebun' },
              { photo: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80', title: 'Penanaman Benih Sertifikasi A+ Balai Benih' },
              { photo: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80', title: 'Presisi Fertigasi & Sensor BMKG Langsung' },
              { photo: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80', title: 'Taksasi & Seleksi Mutu Hasil Panen PKS' },
            ].map((srv, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="card-box card-box-hover p-3 rounded-4 border bg-white h-100">
                  <div className="rounded-3 overflow-hidden mb-3 bg-light">
                    <img src={srv.photo} alt={srv.title} className="w-100" style={{ height: 210, objectFit: 'cover' }} />
                  </div>
                  <h6 className="font-weight-bold text-dark m-0 p-1" style={{ fontSize: 14 }}>{srv.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 7: Peta GIS Satelit Lahan Interaktif */}
      <div id="peta-gis" className="py-5 bg-white border-bottom">
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title text-center mb-4">
            <span className="tmp-badge-card emerald mb-2 d-inline-block">SATELIT GEOSPATIAL GIS</span>
            <h2 className="font-weight-extrabold text-dark !text-lg">
              Peta GIS Satelit Lahan Perkebunan Jonggol
            </h2>
            <p className="text-secondary font-weight-medium" style={{ fontSize: 13 }}>
              Pantau batas koordinat polygon lahan, sensor kelembapan tanah, & kondisi cuaca BMKG secara langsung
            </p>
          </div>

          <div className="card-box p-4 rounded-4 border">
            <InteractiveGisMap
              lands={lands}
              activeLat={activeLat}
              activeLng={activeLng}
              onCoordinatesChange={() => {}}
            />
          </div>
        </div>
      </div>

      {/* SECTION 8: Kinerja Keuangan & Pertumbuhan Valuasi */}
      <div id="kinerja-keuangan" className="py-5 bg-light border-bottom">
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title text-center mb-5">
            <span className="tmp-badge-card blue mb-2 d-inline-block">TRANSPARANSI KEUANGAN</span>
            <h2 className="font-weight-extrabold text-dark !text-lg">
              Kinerja Keuangan & Pertumbuhan Valuasi Proyek
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-12 col-xl-6">
              <div className="card-box p-4 rounded-4 border bg-white h-100">
                <div style={{ height: 280 }}>
                  <TurbineLineChart
                    title="📈 Pertumbuhan Valuasi Proyek (Rp Juta)"
                    subtitle="Perbandingan Valuasi Proyek vs Modal Disetor"
                    data={valuationGrowthData}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-6">
              <div className="card-box p-4 rounded-4 border bg-white h-100">
                <div style={{ height: 280 }}>
                  <TurbineDonutChart
                    title="🍰 Alokasi Modal Per Komoditas"
                    subtitle="Persentase Alokasi Modal Investasi Kebun"
                    data={capitalAllocationDonutData}
                  />
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card-box p-4 rounded-4 border bg-white">
                <div style={{ height: 260 }}>
                  <TurbineBarChart
                    title="📊 Rincian Pengeluaran OPEX Utama"
                    subtitle="Biaya Operasional Kebun Terverifikasi BAP"
                    data={burnRateBarData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 9: Laporan 5D Auditor & Transparansi Arus Kas */}
      <div id="laporan-auditor" className="py-5 bg-white">
        <div className="container-fluid px-4 px-md-5">
          <div className="section-title text-center mb-4">
            <span className="tmp-badge-card success mb-2 d-inline-block">LAPORAN 5-DIMENSI AUDITOR</span>
            <h2 className="font-weight-extrabold text-dark !text-lg">
              Buku Jurnal Arus Kas & Verifikasi Berita Acara Pekerjaan (BAP)
            </h2>
          </div>

          <FinancialLedgerShowcase financials={financials} onExportPDF={handleExportPDF} />
        </div>
      </div>

      {/* SECTION 10: Footer Brand Landing Page */}
      <footer className="py-4 bg-dark text-white border-top border-secondary">
        <div className="container-fluid px-4 px-md-5 text-center text-muted font-weight-medium" style={{ fontSize: 12 }}>
          © 2026 PT Agro Jaya Indonesia • Portal Transparansi & Akuntabilitas Investasi Investor ({userName})
        </div>
      </footer>
    </main>
  );
};
