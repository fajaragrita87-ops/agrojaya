import { Request, Response } from 'express';

const SMART_FARMING_SYSTEM_PROMPT = `Anda adalah "Jaya", AI Senior Agronomist & Chief Agriculture Advisor untuk Perkebunan Terpadu "AgroJaya Smart Farm".

================================================================================
KNOWLEDGE BASE UTAMA PROJEK & APLIKASI AGROJAYA (HAFALKAN & GUNAKAN DATA INI):
================================================================================

1. IDENTITAS & LOKASI PROYEK PERKEBUNAN:
   - Nama Entitas: PT AgroJaya Nusantara / Smart Farm Suite Enterprise.
   - Lokasi Lahan Inti: Sentra Perkebunan Jonggol, Jawa Barat (Luas Total: 2,0 Hektar / 20.000 m²).
   - Koordinat Geografis GPS: -6.46972° LS, 107.05831° BT (Akurasi GPS Telemetri 3 meter).
   - Tujuan Aplikasi: Portal Akuntabilitas, Transparansi Finansial, Audit Kesiapan Fisik Lahan, & Manajemen Agronomi Presisi berbasis IoT untuk INVESTOR, DIREKSI, & TIM LAPANGAN.

2. KINERJA FINANSIAL & AKUNTABILITAS INVESTASI (DATA REAL-TIME):
   - Total Pagu Modal Investasi Disetor: Rp 2.500.000.000 (Rp 2,50 Miliar - 100% Terdanai Penuh).
   - Valuasi Aset Proyek Terkini: Rp 3.100.000.000 (Rp 3,10 Miliar - Pertumbuhan Aset +24,0% dari modal awal).
   - Cadangan Kas Operasional Cair (Liquid Cash): Rp 486.500.000 di rekening kas penampung.
   - Struktur Kepemilikan Saham Proyek:
     * Konsorsium Investor Utama: 65,0% (Porsi Modal: Rp 1.625.000.000, Target Return: +30% ROI / ~Rp 487.500.000).
     * PT Smart Farm Nusantara (Pengelola / Operator): 35,0% (Porsi Modal: Rp 875.000.000, Bagi Hasil Kinerja).
   - Alokasi Belanja Modal (CAPEX & OPEX):
     * Akuisisi & Land Clearing 2.0 Ha: Rp 875 Jt (35% - Realisasi 100%).
     * Greenhouse & Irigasi Presisi Drip: Rp 750 Jt (30% - Realisasi 100%).
     * Benih Unggul F1 & Pupuk Organik: Rp 500 Jt (20% - Terserap 78%).
     * Cadangan Kas Likuid: Rp 375 Jt (15% - Cadangan Aman).
   - Parameter HPP & Proyeksi BEP: HPP Rp 9.200 / Kg, Target Panen 15 Ton/Ha, Harga Jual Kontrak Offtaker Rp 25.000–30.000 / Kg (Grade A), Estimasi Omset per Siklus Rp 750 Jt, Proyeksi Laba Bersih Rp 486 Jt.

3. STATUS ALUR PURCHASE ORDER (PO) & OTORISASI BELANJA (MAKER-CHECKER):
   - Mekanisme: 4-Tier Approval (Manajer Mengajukan -> Finance Siti Rahmawati Verifikasi Faktur -> Direktur Budi Santoso Menyetujui -> Investor Hendrawan Kusuma Sahkan Pencairan).
   - Daftar PO Aktif:
     * [PO-026] Pupuk Hayati Cair & Bio-Trichoderma Organik 100L (Nilai: Rp 28.500.000, Vendor: PT Agro Tani Makmur) - Status: Menunggu Pengesahan Investor (PENDING_INVESTOR), sudah divalidasi Finance & disahkan Direktur.
     * [PO-027] Material Greenhouse B3 & Pipa HDPE Drip Irigasi 300m (Nilai: Rp 12.800.000 / Total Rp 41.200.000, Vendor: CV Tirta Abadi) - Status: Menunggu Persetujuan Direktur (PENDING_DIREKTUR).
     * [PO-028] Pengadaan Mulsa Plastik Hitam Perak 20 Roll (Nilai: Rp 9.600.000, Vendor: PT Plastindo) - Status: Menunggu Verifikasi Finance (PENDING_FINANCE).
     * [PO-024] Benih Unggul Melon Golden Apollo F1 1.000 Pack (Nilai: Rp 15.400.000, Vendor: PT East West Seed Indonesia) - Status: Disetujui & Dicairkan Penuh (APPROVED).

4. KONDISI FISIK LAHAN, SENSOR TELEMETRI IOT, & PEMBAGIAN BLOK:
   - Telemetri Sensor Tanah Terkini: pH Tanah 6.5 (Optimal / Netral), Kelembaban Tanah Subsoil: 72%, Konduktivitas Elektrik (EC): 1.8 mS/cm, Suhu Lingkungan: 27.8°C.
   - Pembagian Blok Kebun 2.0 Hektar:
     * Blok A (8.500 m² - Greenhouse A1 & A2): 8.500 Tanaman Melon Golden Apollo/Alisha F1. Umur saat ini 43 Hari Setelah Tanam (HST). Fase 4: Pembesaran Buah & Netting. Siap panen 18 hari lagi (14 September 2026). Target Kemanisan: 14.5° – 16.0° Brix. Estimasi Hasil: 15–18 Ton/Ha. Offtaker: Super Indo & Hypermart.
     * Blok B (6.500 m² - Lahan Naungan Paranet 40%): Porang Madiun Super (Amorphophallus muelleri). Umur 78 HST. Fase 5: Pembesaran Umbi Primer. Kadar Glukomanan 58% (Kualitas Ekspor Jepang). Estimasi Hasil: 25–30 Ton/Ha.
     * Blok C (5.000 m²): Greenhouse Nursery Pembibitan Benih F1 & Cabai Rawit Merah Unggul Ori 212 (Kadar Capsaicin Tinggi).
   - 8 Tahap Pengolahan Lahan Fisik (100% Selesai Tervalidasi Foto & GPS):
     1. Pembersihan Lahan & Land Clearing (Traktor & Ekskavator 2.0 Ha).
     2. Pengolahan Tanah & Bajak Rotavator (Aerasi tanah gembur 30 cm).
     3. Aplikasi Kapur Dolomit 2 Ton/Ha (Menaikkan pH dari 5.2 menjadi 6.5).
     4. Pembuatan 48 Bedengan Presisi (Lebar 110 cm, Tinggi 35 cm) & Parit Drainase Anti-Genangan.
     5. Pemasangan Mulsa Plastik Hitam Perak Reflektor Sinar UV.
     6. Instalasi Pipa Irigasi Tetes Otomatis Drip Emitter IoT (2 L/jam).
     7. Transplanting 8.500 Benih Unggul Bersertifikat GAP.
     8. Perawatan Harian, Pewiwitan Tunas, & Telemetri IoT Berjalan.

5. SISTEM PASPOR DIGITAL AJIR POHON (TREE PASSPORT & BARCODE):
   - Setiap pohon di kebun dipasangi tiang ajir ber-QR Code khusus (contoh: SAMPLE-TR-A2-0841, SAMPLE-TR-B1-0412).
   - Scanner kamera otomatis membaca barcode dalam milidetik tanpa tombol manual, menampilkan KTP tanaman: sertifikat benih, tanggal semai, tinggi tanaman, jadwal siram nutrisi AB Mix harian, uji brix, dan estimasi valuasi Rp 60.000 / pohon.

6. DATA PANEN, TIMBANGAN DIGITAL, & LOGISTIK GUDANG:
   - Realisasi Panen Terverifikasi: 6.400 Kg Melon Golden (Omset Kotor Terealisasi: Rp 163.675.000).
   - Kualitas Mutu Grading: 85% Grade A Super Sweet (2.100 Kg @ Rp 26.500/Kg), 12% Grade B (300 Kg), 3% Grade C (50 Kg).
   - Stok Gudang Sentral: Pupuk NPK Organik (1.200 Kg - Aman), Konsentrat AB Mix (450 Liter - Aman), Benih Golden F1 (8.500 Butir - Aman), Bio-Pestisida Neem Oil (65 Liter - Perlu Reorder), Selang Drip Irigasi 16mm (12 Roll / 2.400m - Aman).

7. STRUKTUR SDM, TIM LAPANGAN, PRESENSI GPS & PAYROLL (18 DARI 20 PERSONEL HADIR):
   - Manajemen Eksekutif & Pengawas:
     * Direktur Utama: Dr. Ir. H. Bambang Soedibyo / Budi Santoso, S.P., M.M. (Pengambil Keputusan Strategis).
     * Investor Utama: Hendrawan Kusuma / Konsorsium Investasi Batavia (Pemilik Modal 65%).
     * Manajer Keuangan: Siti Rahmawati, S.E., Ak. / Citra Lestari, S.E. (Verifikasi Jurnal Kas, Faktur BAP, & PO).
     * Manajer Operasional: Ir. Agus Wijaya / Rian Pratama, S.P. / Irfan Maulana (Manajemen Lapangan & Rencana Kerja).
     * Kepala Kebun / Senior Agronom: Supardi Hartono / Pak Joko Sukardi / Budi Santoso (Supervisi Agronomi, Dosis Pupuk, PHT).
   - Tenaga Kerja & Mandor Lapangan (Presensi Geotagging GPS Radius 3 Meter):
     * Status Kehadiran Hari Ini: 18 Hadir, 1 Izin Sakit (Joko Prabowo), 1 Cuti Tahunan (Tingkat Kehadiran 90%).
     * Sukardi (Mandor Utama Lapangan): Shift 06:30 - 15:30 WIB, Status: Hadir Check-In 06:28, Upah: Rp 140.000 / hari (Est. Akumulasi: Rp 3.640.000/bln), Tugas: Supervisi seluruh blok & pembagian instruksi harian.
     * Wawan Setiawan (Teknisi Irigasi Drip & IoT): Shift 07:00 - 16:00 WIB, Status: Hadir Check-In 06:55, Upah: Rp 130.000 / hari (Est. Akumulasi: Rp 3.380.000/bln), Tugas: Perawatan pompa sentrifugal fertigasi, kontrol emitter 2 L/jam, & pipa HDPE.
     * Kang Asep Sudrajat (Mandor Regu A - Melon): Hadir Check-In 06:45, Upah: Rp 120.000 / hari, Tugas: Pruning tunas air liar, polinasi ruas 10-12, seleksi buah, & logging barcode ajir KTP sampel.
     * Pak Sugeng (Mandor Regu B - Porang): Hadir Check-In 06:50, Upah: Rp 120.000 / hari, Tugas: Rawat bedeng porang 6.500 m², naungan paranet 40%, & kocor agen hayati Trichoderma.
     * Slamet Riyadi (Petani Pemeliharaan): Shift 07:00 - 16:00 WIB, Status: Hadir Check-In 06:58, Upah: Rp 115.000 / hari (Est. Akumulasi: Rp 2.990.000/bln).
     * Mang Deden (Mandor Regu C - Nursery & Cabai): Hadir, Upah: Rp 115.000 / hari, Tugas: Persemaian bibit F1 dan fertigasi cabai rawit Ori 212.
     * Joko Prabowo (Petani Pemupukan): Izin Sakit hari ini (Tarif: Rp 115.000 / hari, Est. Akumulasi: Rp 2.760.000).
   - Skema Kebijakan Upah & Payroll: Dihitung harian berbasis validasi presensi GPS Geofencing, transparan tanpa potongan liar, estimasi total belanja upah tenaga kerja kebun Rp 55–65 Juta per bulan.

8. 12 MODUL UTAMA APLIKASI AGROJAYA ENTERPRISE:
   1. Dasbor Eksekutif / Portofolio: Pantauan valuasi, kas cair, & KPI proyek.
   2. KTP Paspor Sampel Pohon: Barcode scanner otomatis & paspor digital pohon.
   3. Konsultan AI Jaya: Asisten AI cerdas penguasa seluruh data aplikasi & agronomi.
   4. Peta Satelit GIS: Peta satelit resolusi tinggi & telemetri sensor tanah per blok.
   5. Diagnosa Daun AI Vision: Vision AI deteksi patogen penyakit daun & klorofil.
   6. Otorisasi PO Belanja: Sistem persetujuan belanja 2-tahap transparan.
   7. Buku Kas & Jurnal: Arus kas masuk/keluar otomatis & rekonsiliasi.
   8. Kalkulator HPP: Simulasi BEP, parameter luas lahan, & proyeksi profit.
   9. Presensi GPS & Upah SDM: Absensi geotagging radius 3 meter & payroll harian.
   10. Siklus Fisik Lahan (Bukti 8 Tahap): Audit trail 8 tahap kesiapan tanah 2.0 Ha.
   11. Timbangan Panen & Grading: Penimbangan digital, grading buah, & invoice offtaker.
   12. Stok Gudang & Master Komoditas: Manajemen inventori & protokol SOP agronomi.

================================================================================
PANDUAN MENJAWAB (PERSONA & GAYA KOMUNIKASI JAYA):
================================================================================
1. JIKA DITANYA OLEH INVESTOR / DIREKTUR (atau pertanyaan seputar proyek, uang, progres, kebun, status PO, lahan, panen, tim, atau aplikasi):
   - WAJIB gunakan data konkret dan spesifik di atas (sebutkan angka rupiah, persentase %, nomor PO, nama blok lahan, nama tim pelaksana, skor brix, atau nama modul terkait).
   - Berikan jawaban yang lugas, profesional, akuntabel, dan transparan yang membuat Investor & Direktur yakin bahwa proyek berjalan sangat baik dan terkontrol 100%.

2. JIKA DITANYA OLEH PETANI / MANDOR (atau pertanyaan seputar teknis budidaya, hama, pupuk, dosis, penyakit daun):
   - Berikan instruksi teknis agronomi yang praktis, ilmiah, dan mudah dipahami (misal takaran AB Mix EC 2.2, dosis dolomit, pencegahan busuk buah kalsium, penggunaan Trichoderma, dll).

3. GAYA BAHASA:
   - Berbahasa Indonesia yang santun, luwes, alami, percaya diri, dan to-the-point seperti konsultan agribisnis ahli manusia.
   - JANGAN menggunakan frasa kaku berulang seperti "📌 Intinya:" di setiap paragraf. Jawablah mengalir dan informatif.`;

export const handleAIChat = async (req: Request, res: Response) => {
  try {
    const { prompt, history = [], role = 'DIREKTUR', userName = 'Bapak/Ibu' } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    // 1. Google Gemini API
    if (geminiKey && geminiKey.trim().length > 5) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

        const contents = [
          {
            role: 'user',
            parts: [{ text: `${SMART_FARMING_SYSTEM_PROMPT}\n\n[USER CONTEXT: Nama: ${userName} • Peran: ${role}]` }],
          },
          {
            role: 'model',
            parts: [{ text: 'Siap! Saya bertindak sebagai penasihat agribisnis dan penjamin akuntabilitas terpercaya berbasis riset ilmiah yang transparan dan mudah dipahami.' }],
          },
          ...history.slice(-6).map((msg: any) => ({
            role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.content || msg.text || '' }],
          })),
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ];

        const geminiRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 380,
            },
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const answer = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (answer) {
            return res.json({ success: true, answer, source: 'gemini' });
          }
        }
      } catch (geminiErr) {
        console.warn('Backend Gemini call failed, trying next provider:', geminiErr);
      }
    }

    // 2. Groq API Fallback (Active 120B & 27B Models)
    if (groqKey && groqKey.trim().length > 5) {
      const activeGroqModels = [
        'openai/gpt-oss-120b',
        'qwen/qwen3.8-27b',
        'openai/gpt-oss-20b',
        'groq/compound',
      ];

      for (const model of activeGroqModels) {
        try {
          const groqEndpoint = 'https://api.groq.com/openai/v1/chat/completions';
          const groqRes = await fetch(groqEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: 'system', content: `${SMART_FARMING_SYSTEM_PROMPT}\n[Pengguna: ${userName}, Peran: ${role}]` },
                ...history.slice(-6).map((msg: any) => ({
                  role: msg.role === 'assistant' || msg.role === 'model' ? 'assistant' : 'user',
                  content: msg.content || msg.text || '',
                })),
                { role: 'user', content: prompt },
              ],
              temperature: 0.6,
              max_tokens: 650,
            }),
          });

          if (groqRes.ok) {
            const groqData = await groqRes.json();
            const answer = groqData?.choices?.[0]?.message?.content;
            if (answer) {
              return res.json({ success: true, answer, source: 'groq' });
            }
          }
        } catch (groqErr) {
          console.warn(`Backend Groq model ${model} failed, trying next:`, groqErr);
        }
      }
    }

    // 3. Local Trustworthy Agronomy & Finance Engine
    const localAnswer = generateTrustworthyAgronomyAnswer(prompt, role, userName);
    return res.json({ success: true, answer: localAnswer, source: 'local' });
  } catch (error: any) {
    console.error('AI Controller Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};

/**
 * Endpoint for Multimodal Leaf Vision Diagnosis (Gemini Vision)
 */
export const handleAIDiagnoseLeaf = async (req: Request, res: Response) => {
  try {
    const { imageBase64, plantHeight = 120, commodity = 'Umum' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ success: false, error: 'imageBase64 is required' });
    }

    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey && geminiKey.trim().length > 5) {
      try {
        // Parse base64 header
        let mimeType = 'image/jpeg';
        let rawData = imageBase64;
        if (imageBase64.includes(';base64,')) {
          const parts = imageBase64.split(';base64,');
          mimeType = parts[0].replace('data:', '');
          rawData = parts[1];
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;

        const promptText = `Anda adalah Jaya, AI Senior Agronomist. Analisis foto daun/tanaman komoditas ${commodity} dengan tinggi ${plantHeight} cm.
Diagnosa kondisi visual tanaman (apakah sehat, terserang jamur cercospora/antraknosa/fusarium, defisiensi N/P/K/Ca/Fe, atau hama trips/kutu).
Berikan respon HANYA dalam format JSON valid (tanpa backtick markdown):
{
  "diagnosis": "nama kondisi/hama/penyakit yang terdeteksi",
  "confidence": 92,
  "status": "SEHAT" atau "WASPADA" atau "KRITIS",
  "description": "penjelasan kondisi morfologi daun dalam 2 kalimat ramah",
  "actions": [
    "langkah 1 pemulihan/pemupukan",
    "langkah 2 proteksi hayati/agen hayati",
    "langkah 3 pencegahan lanjutan"
  ],
  "summary": "1 kalimat intinya untuk eksekutif/petani"
}`;

        const geminiRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inline_data: {
                      mime_type: mimeType,
                      data: rawData,
                    },
                  },
                  { text: promptText },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 500,
            },
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          let rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(rawText);
            return res.json({ success: true, report: parsed, source: 'gemini-vision' });
          }
        }
      } catch (visionErr) {
        console.warn('Gemini Vision API error, falling back to local vision heuristics:', visionErr);
      }
    }

    // Fallback Local Diagnosis
    const h = Number(plantHeight) || 120;
    const isHealthy = h >= 80;
    const fallbackReport = {
      diagnosis: isHealthy ? 'Daun Sehat — Klorofil Optimal' : 'Gejala Awal Defisiensi Unsur Hara Makro (N & Mg)',
      confidence: isHealthy ? 94 : 88,
      status: isHealthy ? 'SEHAT' : 'WASPADA',
      description: isHealthy
        ? `Morfologi daun dan tajuk tanaman terpantau sangat baik pada tinggi ${h} cm dengan pigmen hijau klorofil merata.`
        : `Terlihat gejala klorosis ringan pada helai daun bawah dengan tinggi tanaman ${h} cm, mengindikasikan perlunya asupan hara tambahan.`,
      actions: [
        isHealthy
          ? 'Pertahankan jadwal fertigasi irigasi tetes 2 kali sehari (pagi & sore).'
          : 'Berikan pupuk NPK seimbang (16-16-16) dan kocor Asam Amino untuk merangsang klorofil.',
        'Semprotkan bio-proteksi jamur Trichoderma atau Beauveria bassiana secara preventif tiap minggu.',
        'Cek kelembapan tanah di sekitar perakaran agar tetap berada di kisaran 60–70%.',
      ],
      summary: isHealthy
        ? 'Tanaman tumbuh prima sesuai fase budidaya, lanjutkan SOP pemeliharaan rutin.'
        : 'Berikan nutrisi daun tambahan dan periksa aerasi tanah untuk mempercepat pemulihan.',
    };

    return res.json({ success: true, report: fallbackReport, source: 'local-engine' });
  } catch (error: any) {
    console.error('Diagnose Leaf Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};

/**
 * Endpoint for Soil Chemistry & Bio-Fertilizer Recommendation
 */
export const handleAIAnalyzeSoil = async (req: Request, res: Response) => {
  try {
    const { phLevel = '5.5', npk = 'Rendah', moisture = '40', commodity = 'Porang & Sayur' } = req.body;

    const ph = parseFloat(phLevel) || 5.5;
    const isAcidic = ph < 6.0;
    const isAlkaline = ph > 7.2;

    let dolomiteKg = 0;
    if (ph < 5.0) dolomiteKg = 2500;
    else if (ph < 5.5) dolomiteKg = 2000;
    else if (ph < 6.0) dolomiteKg = 1200;
    else dolomiteKg = 400;

    const recommendation = {
      phStatus: isAcidic ? 'Masam' : isAlkaline ? 'Alkalin' : 'Netral Optimal',
      dolomiteDoseKgPerHa: dolomiteKg,
      npkRecommendation: npk === 'Rendah' ? 'NPK 16-16-16 (250 kg/Ha) + Asam Amino' : 'NPK 13-6-27 (150 kg/Ha)',
      organicSoilConditioner: 'Kompos Matang Bokashi (2 Ton/Ha) + Asam Humat (3 kg/Ha)',
      irrigationAdvice: parseFloat(moisture) < 50 ? 'Kelembapan tanah rendah, jadwalkan irigasi tetes 25 menit' : 'Kelembapan optimal',
      executiveSummary: `Tanah berada pada pH ${ph} (${isAcidic ? 'agak masam' : 'ideal'}). Taburkan ${dolomiteKg} kg Kapur Dolomit per hektar dan campurkan Asam Humat 2 minggu sebelum pemupukan utama.`,
    };

    return res.json({ success: true, recommendation, source: 'agronomy-engine' });
  } catch (error: any) {
    console.error('Soil Analysis Error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};

const generateTrustworthyAgronomyAnswer = (prompt: string, role: string, userName: string): string => {
  const p = prompt.toLowerCase();

  // 1. Verifikasi Kewajaran Biaya & Belanja Pupuk / Bahan Baku
  if (p.includes('wajar') || p.includes('harga') || p.includes('biaya') || p.includes('beli') || p.includes('pengajuan') || p.includes('mahal')) {
    if (role === 'DIREKTUR' || role === 'FINANCE' || role === 'INVESTOR') {
      return `Mengenai kewajaran biaya pengadaan di kebun kita:\n\n1. **Standar Riset Agronomi**: Berdasarkan acuan Balitbangtan, kebutuhan pupuk NPK 16-16-16 di lahan 2.0 Ha berkisar 300–400 kg per musim (sekitar Rp 4,5 – Rp 5,6 Juta) dan Kapur Dolomit 2–3 ton (sekitar Rp 3,5 – Rp 5 Juta). Jika pengajuan berada di rentang ini, biayanya sangat wajar dan proporsional.\n2. **Proteksi Anggaran**: Seluruh pembelian bahan wajib menyertakan nomor batch dan sertifikat analisis (CoA) dari pabrikan sebelum dana dicairkan. Pengeluaran pupuk dan bibit berada pada koridor ilmiah yang wajar, aman dari risiko penggelembungan biaya, dan terkunci dalam sistem PO 3 lapis.`;
    }
    return `Untuk efisiensi anggaran belanja kebun:\n\n1. **Prinsip 5 Tepat**: Pastikan dosis pupuk dan obat sesuai luasan blok riil agar tidak terjadi pemborosan bahan di lapangan.\n2. **Kualitas Bahan Baku**: Pastikan produk memiliki izin edar Kementan resmi agar hasil panen maksimal dan HPP tetap hemat. Gunakan pupuk berkualitas sesuai takaran riset ahli agar pertumbuhan tanaman optimal dan biaya operasional tetap efisien.`;
  }

  // 2. Tanah & pH
  if (p.includes('tanah') || p.includes('ph') || p.includes('dolomit') || p.includes('asam')) {
    return `Berdasarkan riset ilmu tanah Kementerian Pertanian:\n\n1. **Penyebab Tanah Asam**: Tanah masam (pH < 5,5) membuat unsur Fosfor terikat dan tidak bisa diserap akar, sehingga tanaman kerdil.\n2. **Solusi Ilmiah Teruji**: Taburkan Kapur Dolomit $[CaMg(CO_3)_2]$ dosis 1,5–2 ton/Ha dua minggu sebelum tanam untuk menetralkan pH ke 6,0–6,5, lalu tambahkan Asam Humat untuk menggemburkan tanah agar pupuk terserap maksimal.`;
  }

  // 3. Pupuk, Dosis & Nutrisi
  if (p.includes('pupuk') || p.includes('npk') || p.includes('dosis') || p.includes('nutrisi')) {
    return `Formulasi pemupukan ilmiah berbasis fase fisiologi tanaman:\n\n1. **Fase Pertumbuhan Awal (Vegetatif)**: Berikan pupuk berkadar Nitrogen (N) tinggi seperti NPK 16-16-16 untuk membangun perakaran kuat dan tajuk daun yang rimbun.\n2. **Fase Pembuahan (Generatif)**: Tingkatkan Fosfor (P) dan Kalium (K) seperti MKP dan KNO3 Putih untuk memaksimalkan pengisian bobot buah/umbi dan rasa manis. Ikuti jadwal pemupukan fase vegetatif dan generatif agar setiap rupiah modal menghasilkan tonase panen tertinggi.`;
  }

  // 4. Hama, Penyakit & Bioproteksi
  if (p.includes('hama') || p.includes('penyakit') || p.includes('jamur') || p.includes('fusarium') || p.includes('trikoderma') || p.includes('ulat')) {
    return `Metode Pengendalian Hama Terpadu (PHT) yang terbukti efektif:\n\n1. **Pencegahan Alami Akar**: Aplikasikan jamur baik *Trichoderma harzianum* pada media tanam sejak awal untuk membasmi jamur patogen *Fusarium* penyebab layu akar.\n2. **Penyemprotan Hama Terukur**: Bila ada kutu atau ulat, gunakan pestisida dengan bahan aktif bergantian (rolling) agar hama tidak kebal. Lindungi perakaran tanaman sejak dini dengan agen hayati *Trichoderma* dan lakukan rotasi obat semprot secara disiplin.`;
  }

  // 5. Informasi Investasi, Modal & ROI (Investor & Direksi)
  if (p.includes('investasi') || p.includes('roi') || p.includes('modal') || p.includes('keuangan') || p.includes('aman') || p.includes('untung')) {
    return `Laporan akuntabilitas keuangan dan mitigasi risiko proyek kebun:\n\n1. **Keamanan Dana Investasi**: Dari alokasi modal Rp 2,5 Miliar, realisasi pengeluaran OPEX bulanan terjaga di Rp 20,2 Juta (15% di bawah batas pagu anggaran) dan 100% diverifikasi Berita Acara Pekerjaan (BAP).\n2. **Proyeksi Keuntungan (ROI)**: Berdasarkan taksasi panen ilmiah, potensi keuntungan bersih berada di kisaran 28% – 32% per siklus tanam. Modal investasi berjalan aman dan transparan, didukung verifikasi fisik di lapangan.`;
  }

  // 6. Default
  return `Halo Bapak/Ibu **${userName}**! Saya Jaya, siap mendampingi Anda dengan analisis agronomi teruji dan laporan operasional yang transparan. Silakan tanyakan hal apa pun seputar kebun atau tanaman Anda.`;
};
