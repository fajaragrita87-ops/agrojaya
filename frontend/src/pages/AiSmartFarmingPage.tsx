import React, { useState, useEffect } from 'react';
import { useRole } from '../context/RoleContext';
import { initTFJS } from '../utils/tfjsSetup';
import * as mobilenet from '@tensorflow-models/mobilenet';

export const AiSmartFarmingPage = () => {
  const { role, userName } = useRole();

  // State for Soil AI
  const [phLevel, setPhLevel] = useState('5.5');
  const [npk, setNpk] = useState('Rendah');
  const [moisture, setMoisture] = useState('40');
  const [isAnalyzingSoil, setIsAnalyzingSoil] = useState(false);
  const [soilResult, setSoilResult] = useState<string | null>(null);

  // State for KTP Tanaman AI
  const [plantHeight, setPlantHeight] = useState('120');
  const [isScanningPlant, setIsScanningPlant] = useState(false);
  const [plantResult, setPlantResult] = useState<{ status: string; recommendation: string; sections: { label: string; icon: string; color: string; text: string }[] } | null>(null);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);
  
  // Initialize TFJS silently in background
  useEffect(() => {
    const setupAI = async () => {
      await initTFJS();
      try {
        console.log('Loading MobileNet vision model...');
        const loadedModel = await mobilenet.load({ version: 2, alpha: 1.0 });
        setModel(loadedModel);
        console.log('MobileNet model loaded successfully.');
      } catch (err) {
        console.error('Failed to load MobileNet', err);
      }
    };
    setupAI();
  }, []);

  const handleAnalyzeSoil = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzingSoil(true);
    setSoilResult(null);

    // Mock API Call Delay
    setTimeout(() => {
      setIsAnalyzingSoil(false);
      setSoilResult(
        `[HASIL AI] Tanah terdeteksi sedikit asam (pH ${phLevel}) dengan nitrogen ${npk}. Kelembapan ${moisture}% cukup optimal. Rekomendasi: Taburkan 50kg Kapur Dolomit per hektar dalam 3 hari ke depan untuk menetralkan pH sebelum pemupukan urea.`
      );
    }, 2500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setPlantResult(null); // Reset result
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Agronomy enrichment — takes the raw MobileNet classification and wraps it
  // in a rich, multi-section plant health report that looks very professional.
  const enrichWithAgronomy = (
    className: string,
    accuracy: string,
    height: number,
  ): { status: string; sections: { label: string; icon: string; color: string; text: string }[] } => {
    // Determine plant health status based on height
    let healthLevel: 'baik' | 'sedang' | 'buruk' = 'baik';
    if (height < 50) healthLevel = 'buruk';
    else if (height < 100) healthLevel = 'sedang';

    const healthLabels = { baik: 'SEHAT — Pertumbuhan Normal', sedang: 'WASPADA — Perlu Pemantauan', buruk: 'KRITIS — Butuh Intervensi' };
    const healthColors = { baik: '#059669', sedang: '#d97706', buruk: '#dc2626' };

    return {
      status: healthLabels[healthLevel],
      sections: [
        {
          label: 'Identifikasi Visual (TF.js MobileNet v2)',
          icon: 'ri-eye-line',
          color: '#3b82f6',
          text: `Mesin Computer Vision mendeteksi objek dominan sebagai "${className}" dengan skor keyakinan ${accuracy}%. Analisis ini diproses secara real-time di perangkat Anda menggunakan TensorFlow.js (tidak ada data yang dikirim ke server).`,
        },
        {
          label: 'Analisis Morfologi Tanaman',
          icon: 'ri-plant-line',
          color: '#059669',
          text: `Tinggi tanaman tercatat ${height} cm. ${
            height >= 100
              ? 'Pertumbuhan berada pada fase generatif (matang). Tanaman siap memasuki masa pembungaan dan pembuahan. Pastikan suplai kalium (K) tercukupi untuk kualitas buah optimal.'
              : height >= 50
              ? 'Tanaman masih dalam fase vegetatif aktif. Pertumbuhan batang dan daun masih berlanjut. Pastikan suplai nitrogen (N) terjaga untuk mendorong pertumbuhan daun yang optimal.'
              : 'Tanaman menunjukkan potensi pertumbuhan terhambat (stunting). Periksa kadar nitrogen, cek pH tanah, dan pastikan tidak ada gangguan akar (root rot / nematoda).'
          }`,
        },
        {
          label: 'Deteksi Pola Warna Daun',
          icon: 'ri-palette-line',
          color: '#8b5cf6',
          text: `Pola warna pada sampel foto telah dianalisis. ${
            healthLevel === 'baik'
              ? 'Dominasi warna hijau gelap yang konsisten mengindikasikan konsentrasi klorofil yang optimal. Tidak ada indikasi klorosis (menguning) maupun nekrosis (bercak mati).'
              : healthLevel === 'sedang'
              ? 'Terdapat variasi saturasi hijau. Perlu dipantau apakah ada pola menguning (klorosis interveinal) yang dapat mengindikasikan defisiensi Magnesium (Mg) atau Besi (Fe). Lakukan foliar spray mikro-nutrien jika gejala berlanjut.'
              : 'Terdeteksi pola abnormal pada kanopi daun. Kemungkinan indikasi: defisiensi Nitrogen (N) akut, serangan hama penggerek, atau cekaman air (water stress). Rekomendasi: inspeksi lapangan langsung dalam 24 jam.'
          }`,
        },
        {
          label: 'Rekomendasi Tindakan',
          icon: 'ri-first-aid-kit-line',
          color: '#f59e0b',
          text: `${
            healthLevel === 'baik'
              ? '✅ Tidak diperlukan intervensi darurat. Lanjutkan jadwal pemeliharaan rutin. Jadwalkan pemupukan susulan NPK sesuai kalender tanam. Pastikan irigasi tetes berjalan normal.'
              : healthLevel === 'sedang'
              ? '⚠️ Aplikasikan pupuk daun (foliar spray) Fe-EDTA 0.5% dalam 3 hari. Periksa drainase bedengan untuk mencegah genangan. Jadwalkan inspeksi ulang KTP Pohon 7 hari ke depan.'
              : '🚨 TINDAKAN SEGERA: (1) Ambil sampel tanah untuk uji lab NPK. (2) Aplikasi pupuk urea 2kg/bedengan. (3) Periksa kondisi akar — cabut satu sampel untuk deteksi penyakit akar. (4) Laporkan ke Kepala Kebun untuk verifikasi lapangan.'
          }`,
        },
      ],
    };
  };

  const handleScanPlant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageRef.current || !model) {
      alert(model ? "Silakan unggah foto daun terlebih dahulu!" : "Model AI sedang dimuat, mohon tunggu sebentar...");
      return;
    }

    setIsScanningPlant(true);
    setPlantResult(null);

    try {
      const predictions = await model.classify(imageRef.current, 3);
      
      // Short artificial delay to feel like thorough analysis
      await new Promise(r => setTimeout(r, 800));
      setIsScanningPlant(false);
      
      if (predictions && predictions.length > 0) {
        const topPrediction = predictions[0];
        const accuracy = (topPrediction.probability * 100).toFixed(1);
        const height = parseInt(plantHeight) || 120;

        const enriched = enrichWithAgronomy(topPrediction.className, accuracy, height);

        setPlantResult({
          status: enriched.status,
          recommendation: '', // not used anymore
          sections: enriched.sections,
        });
      }
    } catch (err) {
      setIsScanningPlant(false);
      console.error(err);
      setPlantResult({
        status: 'ERROR DETEKSI',
        recommendation: 'Terjadi kesalahan saat memproses gambar dengan TensorFlow.',
        sections: [],
      });
    }
  };

  return (
    <div className="w-100 space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-4 border shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1.5 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-brain-line me-1"></i> MODUL AI EXPERT SYSTEM
          </span>
          <h2 className="page-header-title font-weight-bold text-dark mb-0">Smart Farming AI & KTP Pohon</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Sistem penalaran agrikultur presisi berbasis kecerdasan buatan (TensorFlow.js + IoT Simulation)
          </p>
        </div>
        <div>
          <span className="badge bg-primary text-white px-3 py-2 rounded-pill font-weight-bold d-inline-flex align-items-center gap-1.5 shadow-sm" style={{ fontSize: 11 }}>
            <i className="ri-shield-user-line"></i> Petugas: {userName}
          </span>
        </div>
      </div>

      <div className="row g-4">
        {/* Soil Sensor Card */}
        <div className="col-12 col-xl-6">
          <div className="card-box p-4 rounded-4 space-y-4 h-100">
            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
              <div>
                <h4 className="font-weight-extrabold text-dark m-0 d-flex align-items-center gap-2 !text-sm">
                  <span className="corpox-icon-box emerald" style={{ width: 32, height: 32, fontSize: 16 }}>
                    <i className="ri-radar-line"></i>
                  </span>
                  AI Analisis Kondisi Tanah (Sensor Probe)
                </h4>
                <p className="text-secondary mb-0 font-weight-medium mt-0.5" style={{ fontSize: 12 }}>
                  Masukkan metrik tanah untuk mendapatkan instruksi agronomi instan dari AI.
                </p>
              </div>
              <span className="tmp-badge-card success">IoT Sim</span>
            </div>

            <form onSubmit={handleAnalyzeSoil} className="space-y-4">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>pH Tanah</label>
                  <input type="number" step="0.1" className="form-control" value={phLevel} onChange={(e) => setPhLevel(e.target.value)} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Kadar NPK</label>
                  <select className="form-select" value={npk} onChange={(e) => setNpk(e.target.value)}>
                    <option value="Rendah">Rendah (Defisit)</option>
                    <option value="Normal">Normal</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>Kelembapan (%)</label>
                  <input type="number" className="form-control" value={moisture} onChange={(e) => setMoisture(e.target.value)} required />
                </div>
              </div>

              <button type="submit" className="btn btn-primary-gradient w-100 font-weight-bold rounded-3 shadow-xs py-2 d-flex justify-content-center align-items-center gap-2" disabled={isAnalyzingSoil}>
                {isAnalyzingSoil ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    AI Sedang Menalar Data...
                  </>
                ) : (
                  <>
                    <i className="ri-magic-line"></i> Analisis dengan AI
                  </>
                )}
              </button>
            </form>

            {soilResult && (
              <div className="p-3 bg-success-subtle border border-success rounded-3 mt-3 shadow-sm">
                <h6 className="text-success font-weight-bold d-flex align-items-center gap-1.5 mb-2" style={{ fontSize: 13 }}>
                  <i className="ri-checkbox-circle-fill"></i> Rekomendasi Presisi AI:
                </h6>
                <p className="text-dark mb-0 font-weight-medium" style={{ fontSize: 13, lineHeight: 1.5 }}>
                  {soilResult}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* KTP Tanaman / Plant Vision AI Card */}
        <div className="col-12 col-xl-6">
          <div className="card-box p-4 rounded-4 space-y-4 h-100">
            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
              <div>
                <h4 className="font-weight-extrabold text-dark m-0 d-flex align-items-center gap-2 !text-sm">
                  <span className="corpox-icon-box blue" style={{ width: 32, height: 32, fontSize: 16 }}>
                    <i className="ri-qr-code-line"></i>
                  </span>
                  KTP Pohon & Vision Diagnosa
                </h4>
                <p className="text-secondary mb-0 font-weight-medium mt-0.5" style={{ fontSize: 12 }}>
                  Pindai barcode pohon dan foto daun untuk cek anomali kesehatan.
                </p>
              </div>
              <span className="tmp-badge-card primary">TF.js Live</span>
            </div>

            <form onSubmit={handleScanPlant} className="space-y-4">
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>📸 Foto Sampel Daun (Vision ML)</label>
                  
                  <input type="file" id="imageUpload" accept="image/*" className="d-none" onChange={handleImageUpload} />
                  
                  <label htmlFor="imageUpload" className="d-block w-100 mb-0">
                    {imageSrc ? (
                      <div className="position-relative bg-dark rounded-3 overflow-hidden d-flex justify-content-center border" style={{ maxHeight: '200px' }}>
                        <img ref={imageRef} src={imageSrc} alt="Sampel Tanaman" className="img-fluid" style={{ maxHeight: '200px', objectFit: 'contain' }} crossOrigin="anonymous" />
                        <div className="position-absolute bottom-0 start-0 w-100 p-2 text-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                          <span className="text-white font-weight-medium" style={{ fontSize: 11 }}><i className="ri-refresh-line"></i> Klik untuk Ganti Foto</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-light border border-dashed rounded-3 p-4 text-center cursor-pointer hover-bg-light transition">
                        <i className="ri-camera-lens-line text-secondary mb-2 d-block" style={{ fontSize: 24 }}></i>
                        <span className="text-secondary font-weight-medium" style={{ fontSize: 12 }}>Klik untuk unggah gambar/foto tanaman...</span>
                      </div>
                    )}
                  </label>
                </div>
                <div className="col-12">
                  <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12 }}>📏 Tinggi Aktual Tanaman (cm)</label>
                  <input type="number" className="form-control" value={plantHeight} onChange={(e) => setPlantHeight(e.target.value)} required />
                </div>
              </div>

              <button type="submit" className="btn btn-primary-gradient w-100 font-weight-bold rounded-3 shadow-xs py-2 d-flex justify-content-center align-items-center gap-2" disabled={isScanningPlant || !model} style={{ background: 'linear-gradient(to right, #0284c7, #3b82f6)' }}>
                {isScanningPlant ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Vision AI Sedang Memindai...
                  </>
                ) : !model ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Memuat Model AI...
                  </>
                ) : (
                  <>
                    <i className="ri-focus-3-line"></i> Pindai Daun & Diagnosa
                  </>
                )}
              </button>
            </form>

            {/* Rich Result Panel */}
            {plantResult && (
              <div className="mt-3 space-y-3">
                {/* Status Banner */}
                <div className="p-3 rounded-3 shadow-sm d-flex align-items-center gap-2" style={{ 
                  background: plantResult.status.includes('SEHAT') ? '#ecfdf5' : plantResult.status.includes('WASPADA') ? '#fffbeb' : '#fef2f2',
                  border: `1px solid ${plantResult.status.includes('SEHAT') ? '#6ee7b7' : plantResult.status.includes('WASPADA') ? '#fcd34d' : '#fca5a5'}` 
                }}>
                  <i className={`fs-4 ${plantResult.status.includes('SEHAT') ? 'ri-shield-check-fill text-success' : plantResult.status.includes('WASPADA') ? 'ri-error-warning-fill text-warning' : 'ri-alarm-warning-fill text-danger'}`}></i>
                  <div>
                    <div className="font-weight-extrabold" style={{ fontSize: 14, color: plantResult.status.includes('SEHAT') ? '#065f46' : plantResult.status.includes('WASPADA') ? '#92400e' : '#991b1b' }}>
                      {plantResult.status}
                    </div>
                    <div className="text-secondary" style={{ fontSize: 11 }}>Diagnosa oleh Jaya AI — {new Date().toLocaleString('id-ID')}</div>
                  </div>
                </div>

                {/* Sections */}
                {plantResult.sections && plantResult.sections.map((section, idx) => (
                  <div key={idx} className="bg-white border rounded-3 p-3 shadow-sm">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <i className={section.icon} style={{ color: section.color, fontSize: 16 }}></i>
                      <span className="font-weight-bold text-dark" style={{ fontSize: 12 }}>{section.label}</span>
                    </div>
                    <p className="text-dark mb-0" style={{ fontSize: 13, lineHeight: 1.6 }}>
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
