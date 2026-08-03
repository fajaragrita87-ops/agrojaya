import { useState } from 'react';

interface TaskItem {
  id: string;
  dayIndex: number; // 0: Senin, 1: Selasa, ... 6: Minggu
  dateLabel: string;
  title: string;
  category: string;
  location: string;
  pic: string;
  timeSla: string;
  opexEstimate: string;
  status: 'SELESAI' | 'BERJALAN' | 'MENUNGGU';
  sopReminder: string;
}

export const DailyTasklistCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<number>(0); // Default: Senin (Hari Ini)

  const daysHeader = [
    { dayIndex: 0, dayName: 'Senin', dateNum: '03 Aug', taskCount: 4, isToday: true },
    { dayIndex: 1, dayName: 'Selasa', dateNum: '04 Aug', taskCount: 3, isToday: false },
    { dayIndex: 2, dayName: 'Rabu', dateNum: '05 Aug', taskCount: 4, isToday: false },
    { dayIndex: 3, dayName: 'Kamis', dateNum: '06 Aug', taskCount: 3, isToday: false },
    { dayIndex: 4, dayName: 'Jumat', dateNum: '07 Aug', taskCount: 4, isToday: false },
    { dayIndex: 5, dayName: 'Sabtu', dateNum: '08 Aug', taskCount: 3, isToday: false },
    { dayIndex: 6, dayName: 'Minggu', dateNum: '09 Aug', taskCount: 2, isToday: false },
  ];

  const tasksData: TaskItem[] = [
    // HARI 0: SENIN
    {
      id: 'TSK-001',
      dayIndex: 0,
      dateLabel: 'Senin, 03 Aug 2026',
      title: 'Fertigasi Nutrisi NPK & Sterilisasi Gunting Stek Anggur',
      category: 'PEMELIHARAAN GREENHOUSE',
      location: 'Blok A1 - Kebun Anggur Impor (1.000m² Jonggol)',
      pic: 'Joko Susilo (Teknisi Hortikultura)',
      timeSla: '07:30 - 10:30 WIB (SLA: 3 Jam)',
      opexEstimate: 'Rp 450.000 (Nutrisi AB Mix & Sterilisasi)',
      status: 'SELESAI',
      sopReminder: 'SOP-HORTI-01: Pastikan pH air fertigasi berada pada rentang 6.0 - 6.5. Gunting stek WAJIB dibilas alkohol 70% sebelum pemangkasan sulur tanaman anggur.',
    },
    {
      id: 'TSK-002',
      dayIndex: 0,
      dateLabel: 'Senin, 03 Aug 2026',
      title: 'Pemupukan Susulan NPK Granul & Kapur Dolomit Lahan Utama',
      category: 'PEMUPUKAN BERKALA',
      location: 'Blok A2 - Tanam Hibrida Utama (2.0 Ha Jonggol)',
      pic: 'Rahmat Hidayat (Kepala Kebun)',
      timeSla: '08:00 - 14:00 WIB (SLA: 6 Jam)',
      opexEstimate: 'Rp 2.800.000 (Pengadaan Pupuk NPK 200kg)',
      status: 'BERJALAN',
      sopReminder: 'SOP-PUPUK-02: Dosis pemupukan NPK 250gram/titik dengan jarak 50cm dari pangkal batang. Tebar Kapur Dolomit jika kelembapan tanah di atas 80%.',
    },
    {
      id: 'TSK-003',
      dayIndex: 0,
      dateLabel: 'Senin, 03 Aug 2026',
      title: 'Inspeksi Serangan Hama Lalat Buah & Seleksi Buah Melon',
      category: 'PENGENDALIAN HAMA',
      location: 'Blok B1 - Hortikultura Melon Premium (5.000m² Jonggol)',
      pic: 'Budi Santoso, S.P. (Manajer Operasional)',
      timeSla: '13:00 - 16:00 WIB (SLA: 3 Jam)',
      opexEstimate: 'Rp 350.000 (Trap Pheromone & Yellow Trap)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-PROTEKSI-03: Pasang pemicu perangkap lalat buah (Methyl Eugenol) setiap radius 10 meter. Hanya pertahankan 1 buah melon terbaik per tanaman.',
    },
    {
      id: 'TSK-004',
      dayIndex: 0,
      dateLabel: 'Senin, 03 Aug 2026',
      title: 'Maintenance Traktor Kubota & Pompa Irigasi Satelit',
      category: 'PEMELIHARAAN ALAT & MESIN',
      location: 'Bengkel & Workshop Kebun Jonggol',
      pic: 'M. Arifin (Mekanik Alat Berat)',
      timeSla: '15:00 - 17:30 WIB (SLA: 2.5 Jam)',
      opexEstimate: 'Rp 650.000 (Oli Mesin & Filter Solar B35)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-ALAT-04: Cek oli mesin traktor tiap 50 jam kerja. Kuras filter solar B35 dan lumasi gantry boom sprayer dengan vet kalsium.',
    },

    // HARI 1: SELASA
    {
      id: 'TSK-005',
      dayIndex: 1,
      dateLabel: 'Selasa, 04 Aug 2026',
      title: 'Penyiangan Gulma Harian & Pengaratan Piringan Batang',
      category: 'SANITAASI KEBUN',
      location: 'Blok A2 - Tanam Hibrida Utama (2.0 Ha Jonggol)',
      pic: 'Joko Susilo (Teknisi Lapangan)',
      timeSla: '07:30 - 11:30 WIB (SLA: 4 Jam)',
      opexEstimate: 'Rp 300.000 (Solar Grass Cutter & Bensin)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-GULMA-01: Piringan bersih dari gulma minimal radius 1.5 meter dari pangkal pohon. Dilarang keras menggunakan herbisida kontak dosis tinggi dekat perakaran.',
    },
    {
      id: 'TSK-006',
      dayIndex: 1,
      dateLabel: 'Selasa, 04 Aug 2026',
      title: 'Pemasangan Jaring Perangkap Burung & Pembungkus Anggur',
      category: 'PROTEKSI KUALITAS HARVEST',
      location: 'Blok A1 - Greenhouse Anggur Impor (1.000m² Jonggol)',
      pic: 'Siti Rahma (Petani Hortikultura)',
      timeSla: '09:00 - 14:00 WIB (SLA: 5 Jam)',
      opexEstimate: 'Rp 500.000 (Fruit Cover Bag Transparan)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-HORTI-05: Pembungkusan buah anggur (Fruit Covering) dilakukan saat berry mencapai diameter 10mm. Gunakan kantong berbahan non-woven transparan sirkulasi udara.',
    },
    {
      id: 'TSK-007',
      dayIndex: 1,
      dateLabel: 'Selasa, 04 Aug 2026',
      title: 'Pengujian Sampel Brix Kadar Gula Melon Intanon',
      category: 'LAB KUALITAS & HARVEST READINESS',
      location: 'Blok B1 - Hortikultura Melon Premium (5.000m² Jonggol)',
      pic: 'Budi Santoso, S.P. (Manajer Operasional)',
      timeSla: '14:00 - 16:30 WIB (SLA: 2.5 Jam)',
      opexEstimate: 'Rp 200.000 (Kalibrasi Refraktometer Digital)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-QC-02: Pengukuran kadar manis Brix dilakukan pada 3 sampel buah acak per bedengan. Target panen komersial WAJIB mencapai minimal 14.0° Brix.',
    },

    // HARI 2: RABU
    {
      id: 'TSK-008',
      dayIndex: 2,
      dateLabel: 'Rabu, 05 Aug 2026',
      title: 'Pemangkasan Pelepah Tua & Pembumbunan Tanah Bedengan',
      category: 'PEMELIHARAAN LAHAN',
      location: 'Blok A2 - Tanam Hibrida Utama (2.0 Ha Jonggol)',
      pic: 'Rahmat Hidayat (Kepala Kebun)',
      timeSla: '07:30 - 12:00 WIB (SLA: 4.5 Jam)',
      opexEstimate: 'Rp 600.000 (Egoji & Parang Khas Kebun)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-PRUNING-01: Potong pelepah tua pada sudut 45 derajat rata dengan ketiak batang. Jangan tinggalkan sisa pelepah menggantung untuk cegah jamur Ganoderma.',
    },
    {
      id: 'TSK-009',
      dayIndex: 2,
      dateLabel: 'Rabu, 05 Aug 2026',
      title: 'Aplikasi Fungisida Organik Hayati Trikoderma',
      category: 'PENGENDALIAN PENYAKIT',
      location: 'Blok A1 - Greenhouse Anggur Impor (1.000m² Jonggol)',
      pic: 'Joko Susilo (Teknisi Lapangan)',
      timeSla: '08:30 - 11:00 WIB (SLA: 2.5 Jam)',
      opexEstimate: 'Rp 400.000 (Biopestisida Trichoderma Harzianum)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-PROTEKSI-04: Semprotkan bio-fungisida pada sore hari atau saat cuaca teduh. Hindari penyemprotan langsung pada daun basah akibat embun pagi.',
    },
    {
      id: 'TSK-010',
      dayIndex: 2,
      dateLabel: 'Rabu, 05 Aug 2026',
      title: 'Pembersihan & Flushing Saluran Drip Irigasi Kebun',
      category: 'INFRASTRUKTUR IRIGASI',
      location: 'Seluruh Blok Kebun Jonggol',
      pic: 'M. Arifin (Teknisi Irigasi)',
      timeSla: '13:00 - 16:00 WIB (SLA: 3 Jam)',
      opexEstimate: 'Rp 250.000 (Flushing Acid Cleaner 1%)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-IRIGASI-02: Lakukan pembilasan (flushing) pipa drip lateral setiap 14 hari sekali menggunakan tekanan air 2 Bar untuk menguras endapan mineral pupuk.',
    },
    {
      id: 'TSK-011',
      dayIndex: 2,
      dateLabel: 'Rabu, 05 Aug 2026',
      title: 'Verifikasi Timbangan Digital PKS & Pengiriman Truk',
      category: 'LOGISTIK & WEIGHBRIDGE',
      location: 'Pos Timbangan Kebun Jonggol',
      pic: 'Ir. H. Ahmad Wijaya (Direktur)',
      timeSla: '15:00 - 17:00 WIB (SLA: 2 Jam)',
      opexEstimate: 'Rp 150.000 (Segel Tera & Kalibrasi Digital)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-TIMBANGAN-01: Toleransi selisih tera Bruto-Tarra maksimal 0.5%. Wajib sertakan foto fisik truk dan Surat Jalan resmi berstempel basah.',
    },

    // HARI 3: KAMIS
    {
      id: 'TSK-012',
      dayIndex: 3,
      dateLabel: 'Kamis, 06 Aug 2026',
      title: 'Panen Perdana Anggur Impor Shine Muscat (Kualifikasi Grade A)',
      category: 'PANEN & HARVEST',
      location: 'Blok A1 - Greenhouse Anggur Impor (1.000m² Jonggol)',
      pic: 'Joko Susilo & Tim Hortikultura',
      timeSla: '07:00 - 11:30 WIB (SLA: 4.5 Jam)',
      opexEstimate: 'Rp 1.200.000 (Keranjang Panen & Packing Styrofoam)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-PANEN-01: Potong tangkai buah anggur dengan menyisakan 2cm tangkai berbentuk T. Potong hanya dompolan buah yang sudah matang sempurna (Brix > 17°).',
    },
    {
      id: 'TSK-013',
      dayIndex: 3,
      dateLabel: 'Kamis, 06 Aug 2026',
      title: 'Pemberian Pupuk Kandang Organik Matang (Fermentasi)',
      category: 'PEMUPUKAN ORGANIK',
      location: 'Blok A2 - Tanam Hibrida Utama (2.0 Ha Jonggol)',
      pic: 'Rahmat Hidayat (Kepala Kebun)',
      timeSla: '08:00 - 14:00 WIB (SLA: 6 Jam)',
      opexEstimate: 'Rp 1.500.000 (Pupuk Kasgot Fermentasi 3 Ton)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-ORGANIK-03: Gunakan HANYA pupuk kandang yang sudah terfermentasi dingin (suhu < 30°C). Benamkan dalam parit melingkar sedalam 20cm di sekeliling pohon.',
    },
    {
      id: 'TSK-014',
      dayIndex: 3,
      dateLabel: 'Kamis, 06 Aug 2026',
      title: 'Audit Presensi GPS PWA Petani & Efisiensi OPEX',
      category: 'AUDIT MANAGEMENT & HR',
      location: 'Kantor Manajer Kebun Jonggol',
      pic: 'Budi Santoso, S.P. (Manajer Operasional)',
      timeSla: '15:30 - 17:00 WIB (SLA: 1.5 Jam)',
      opexEstimate: 'Rp 0 (Sistem Otomatis ERP)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-SDM-01: Validasi radius GPS check-in petani maksimal 50 meter dari centroid lahan. Rekapitulasi upah harian otomatis ditransfer tiap Jumat sore.',
    },

    // HARI 4: JUMAT
    {
      id: 'TSK-015',
      dayIndex: 4,
      dateLabel: 'Jumat, 07 Aug 2026',
      title: 'Penyemprotan Nutrisi Kalsium Boron Daun (Foliar Spray)',
      category: 'PEMELIHARAAN HORTIKULTURA',
      location: 'Blok B1 - Hortikultura Melon Premium (5.000m² Jonggol)',
      pic: 'Siti Rahma (Petani Lapangan)',
      timeSla: '07:30 - 10:00 WIB (SLA: 2.5 Jam)',
      opexEstimate: 'Rp 350.000 (Pupuk Cair Kalsium Boron Nitrat)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-NUTRISI-04: Semprotkan larutan Kalsium Boron dosis 2ml/liter air pada permukaan bawah daun untuk mencegah buah pecah (fruit cracking) dan meningkatkan kerenyahan.',
    },
    {
      id: 'TSK-016',
      dayIndex: 4,
      dateLabel: 'Jumat, 07 Aug 2026',
      title: 'Sortir & Grading Anggur Impor Siap Kirim Supermarket',
      category: 'POST-HARVEST & PACKING',
      location: 'Gudang Cold Storage Jonggol',
      pic: 'Tim Quality Control & Packing',
      timeSla: '09:00 - 12:00 WIB (SLA: 3 Jam)',
      opexEstimate: 'Rp 650.000 (Kemasan Clamshell Premium & Label)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-POSTHARVEST-02: Ruang packing WAJIB bersuhu 18°C - 20°C. Buang berry anggur yang cacat/lebam menggunakan pinset steril sebelum dikemas dalam Clamshell 500g.',
    },
    {
      id: 'TSK-017',
      dayIndex: 4,
      dateLabel: 'Jumat, 07 Aug 2026',
      title: 'Pencairan Payroll Upah Harian Petani & Pengajuan PO',
      category: 'FINANSIAL & OPEX DISBURSEMENT',
      location: 'Keuangan & Direksi Kebun',
      pic: 'Ir. H. Ahmad Wijaya (Direktur)',
      timeSla: '14:00 - 16:00 WIB (SLA: 2 Jam)',
      opexEstimate: 'Rp 8.850.000 (Payroll Upah 12 Petani Lapangan)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-FIN-01: Pencairan payroll WAJIB didasarkan pada laporan presensi PWA SLA 100%. Direktur menandatangani bukti transfer kas setelah disetujui Manajer.',
    },
    {
      id: 'TSK-018',
      dayIndex: 4,
      dateLabel: 'Jumat, 07 Aug 2026',
      title: 'Evaluasi Mingguan Kesiapan Lahan & Proyeksi Panen',
      category: 'RAPAT EVALUASI EVALUASI',
      location: 'Meeting Room Kebun & Zoom Direksi',
      pic: 'Seluruh Tim Direksi & Manajer',
      timeSla: '16:00 - 17:30 WIB (SLA: 1.5 Jam)',
      opexEstimate: 'Rp 100.000 (Konsumsi Rapat)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-EVAL-05: Dokumentasikan hasil evaluasi mingguan dalam Laporan 5-Dimensi Auditor. Tinjau pencapaian target panen dan efisiensi biaya OPEX.',
    },

    // HARI 5: SABTU
    {
      id: 'TSK-019',
      dayIndex: 5,
      dateLabel: 'Sabtu, 08 Aug 2026',
      title: 'Sanitasi & Pembersihan Total Greenhouse Anggur',
      category: 'PEMELIHARAAN INFRASTRUKTUR',
      location: 'Blok A1 - Greenhouse Anggur Impor (1.000m² Jonggol)',
      pic: 'Joko Susilo & Tim Kebun',
      timeSla: '08:00 - 12:00 WIB (SLA: 4 Jam)',
      opexEstimate: 'Rp 250.000 (Disinfektan Karbol & Desinfeksi)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-SANITASI-02: Semprot lantai mulsa dan dinding plastik UV greenhouse dengan larutan disinfektan steril untuk mencegah spora jamur embun tepung (Powdery Mildew).',
    },
    {
      id: 'TSK-020',
      dayIndex: 5,
      dateLabel: 'Sabtu, 08 Aug 2026',
      title: 'Pengolahan Lahan Persiapan Rotasi Tanaman Baru',
      category: 'PENGOLAHAN TANAH (ROTASI)',
      location: 'Blok B1 - Hortikultura Melon Premium (5.000m² Jonggol)',
      pic: 'Rahmat Hidayat & Operator Traktor',
      timeSla: '08:30 - 15:00 WIB (SLA: 6.5 Jam)',
      opexEstimate: 'Rp 1.100.000 (BBM Traktor & Pengapuran Tanah)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-OLAH-01: Bajak tanah sedalam 30cm untuk membalik lapisan top-soil. Tabur Kapur Dolomit 1 Ton/Ha dan biarkan terjemur matahari selama 7 hari sebelum tanam ulang.',
    },
    {
      id: 'TSK-021',
      dayIndex: 5,
      dateLabel: 'Sabtu, 08 Aug 2026',
      title: 'Inspeksi Pagi & Monitoring Debit Air Waduk Irigasi',
      category: 'WATER MANAGEMENT',
      location: 'Embung & Reservoir Air Kebun Jonggol',
      pic: 'M. Arifin (Teknisi Irigasi)',
      timeSla: '15:00 - 17:00 WIB (SLA: 2 Jam)',
      opexEstimate: 'Rp 150.000 (Pengujian pH & EC Meter Air)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-AIR-03: Pastikan tinggi muka air embung minimal 2.5 meter. Nilai EC (Electrical Conductivity) air irigasi tidak boleh melebihi 0.5 mS/cm.',
    },

    // HARI 6: MINGGU
    {
      id: 'TSK-022',
      dayIndex: 6,
      dateLabel: 'Minggu, 09 Aug 2026',
      title: 'Monitoring Satelit GIS & Patroli Keamanan Lahan',
      category: 'PATROLI & MONITORING SATELIT',
      location: 'Seluruh Blok Kebun Jonggol (2.6 Ha)',
      pic: 'Tim Keamanan & Petugas Piket',
      timeSla: '08:00 - 16:00 WIB (SLA: 8 Jam)',
      opexEstimate: 'Rp 350.000 (Insentif Piket Minggu & Patroli)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-KEAMANAN-01: Lakukan ronda keliling pagar batas luar lahan 2 Ha setiap 4 jam. Pastikan sensor pagar CCTV dan perangkat GPS satelit beroperasi normal.',
    },
    {
      id: 'TSK-023',
      dayIndex: 6,
      dateLabel: 'Minggu, 09 Aug 2026',
      title: 'Pengecekan Kebocoran Pipa Drip & Valve Automasi',
      category: 'MAINTENANCE RUTIN MINGGUAN',
      location: 'Blok A1 & Blok B1 Greenhouse',
      pic: 'Teknisi Piket Irigasi',
      timeSla: '09:30 - 12:00 WIB (SLA: 2.5 Jam)',
      opexEstimate: 'Rp 150.000 (Sparepart Valve & Sealing Tape)',
      status: 'MENUNGGU',
      sopReminder: 'SOP-MAINTENANCE-06: Uji coba tekanan solenoid valve otomatis pada 3 Bar. Ganti secepatnya karet seal yang getas untuk cegah kebocoran air fertigasi.',
    },
  ];

  // Filter tasks based on selected day
  const filteredTasks = tasksData.filter((t) => t.dayIndex === selectedDay);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SELESAI':
        return <span className="badge bg-success text-white font-weight-bold" style={{ fontSize: 11 }}><i className="ri-checkbox-circle-fill me-1"></i> SELESAI</span>;
      case 'BERJALAN':
        return <span className="badge bg-warning text-dark font-weight-bold" style={{ fontSize: 11 }}><i className="ri-time-fill me-1"></i> SEDANG BERJALAN</span>;
      default:
        return <span className="badge bg-secondary text-white font-weight-bold" style={{ fontSize: 11 }}><i className="ri-time-line me-1"></i> MENUNGGU JADWAL</span>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-4 border shadow-sm space-y-4">
      {/* Section Title Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 pb-3 border-bottom">
        <div>
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 rounded-pill uppercase font-weight-bold mb-1 d-inline-block" style={{ fontSize: 11 }}>
            <i className="ri-calendar-event-line me-1"></i> KALENDER JADWAL & TASKLIST OPERASIONAL HARIAN
          </span>
          <h4 className="font-weight-bold text-dark m-0 !text-base">
            Jadwal Pengerjaan Kebun Harian & Pengingat SOP Terintegrasi
          </h4>
          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
            Pengerjaan Setiap Hari (7 Hari Seminggu) dengan Instruksi SOP Wajib & Akuntabilitas 5-Dimensi
          </p>
        </div>
        <span className="badge bg-light text-dark border px-3 py-2 font-weight-bold rounded-pill" style={{ fontSize: 11 }}>
          <i className="ri-shield-check-line text-success me-1"></i> Mode SOP Aktif (100% Verified)
        </span>
      </div>

      {/* 7-Day Interactive Corpox Calendar Header Bar */}
      <div className="row g-2 pt-1">
        {daysHeader.map((day) => {
          const isSelected = selectedDay === day.dayIndex;
          return (
            <div key={day.dayIndex} className="col-12 col-sm-6 col-md-4 col-lg flex-fill">
              <button
                type="button"
                onClick={() => setSelectedDay(day.dayIndex)}
                className="w-100 p-3 rounded-4 transition text-center d-flex flex-column align-items-center justify-content-center cursor-pointer border-0"
                style={{
                  minHeight: 90,
                  background: isSelected
                    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                    : '#f8fafc',
                  color: isSelected ? '#ffffff' : '#1e293b',
                  border: isSelected ? '1px solid #047857' : '1px solid #e2e8f0',
                  boxShadow: isSelected ? '0 8px 16px -4px rgba(5, 150, 105, 0.4)' : 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <div className="d-flex align-items-center justify-content-center gap-1.5 mb-1">
                  <span
                    className="text-uppercase font-weight-bold"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.6px',
                      color: isSelected ? '#ffffff' : '#64748b'
                    }}
                  >
                    {day.dayName}
                  </span>
                  {day.isToday && (
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: 10,
                        backgroundColor: isSelected ? '#ffffff' : '#059669',
                        color: isSelected ? '#047857' : '#ffffff',
                        lineHeight: 1.3
                      }}
                    >
                      HARI INI
                    </span>
                  )}
                </div>

                <div
                  className="font-weight-extrabold my-0.5"
                  style={{
                    fontSize: 17,
                    color: isSelected ? '#ffffff' : '#0f172a'
                  }}
                >
                  {day.dateNum}
                </div>

                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '3px 9px',
                    borderRadius: 12,
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.22)' : '#e2e8f0',
                    color: isSelected ? '#ffffff' : '#475569',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <i className="ri-task-line" style={{ fontSize: 11 }}></i>
                  {day.taskCount} Pekerjaan SOP
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Tasklist Cards for Selected Day */}
      <div className="space-y-3 pt-2">
        <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 border">
          <span className="font-weight-bold text-dark d-flex align-items-center gap-2" style={{ fontSize: 14 }}>
            <i className="ri-calendar-check-line text-success"></i> Agenda Pengerjaan: {daysHeader[selectedDay].dayName}, {daysHeader[selectedDay].dateNum} 2026
          </span>
          <span className="badge bg-success-subtle text-success border border-success px-2.5 py-1 font-weight-bold" style={{ fontSize: 11 }}>
            Total {filteredTasks.length} Tasklist Harian
          </span>
        </div>

        {filteredTasks.map((task) => (
          <div key={task.id} className="card-box p-4 rounded-4 space-y-3">
            {/* Header Task */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-2 border-bottom pb-3">
              <div className="d-flex align-items-start gap-3">
                <div className="corpox-icon-box emerald mt-1" style={{ width: 40, height: 40, fontSize: 18 }}>
                  <i className="ri-task-fill"></i>
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 11 }}>
                      {task.category}
                    </span>
                    <span className="text-muted font-weight-bold" style={{ fontSize: 11 }}>ID: {task.id}</span>
                  </div>
                  <h5 className="font-weight-extrabold text-dark m-0 !text-sm">
                    {task.title}
                  </h5>
                </div>
              </div>
              <div>{getStatusBadge(task.status)}</div>
            </div>

            {/* 5D Metadata Info Grid */}
            <div className="row g-3 bg-light p-3 rounded-3 text-secondary border" style={{ fontSize: 13 }}>
              <div className="col-12 col-md-6 col-lg-3">
                <span className="d-block text-uppercase text-muted font-weight-bold mb-1" style={{ fontSize: 11 }}>
                  📍 Dimensi Lokasi:
                </span>
                <strong className="text-dark d-block font-weight-bold">{task.location}</strong>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <span className="d-block text-uppercase text-muted font-weight-bold mb-1" style={{ fontSize: 11 }}>
                  👤 Penanggung Jawab (PIC):
                </span>
                <strong className="text-dark d-block font-weight-bold">{task.pic}</strong>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <span className="d-block text-uppercase text-muted font-weight-bold mb-1" style={{ fontSize: 11 }}>
                  ⏱️ Waktu & Durasi SLA:
                </span>
                <strong className="text-dark d-block font-weight-bold">{task.timeSla}</strong>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <span className="d-block text-uppercase text-muted font-weight-bold mb-1" style={{ fontSize: 11 }}>
                  💰 Estimasi OPEX Lahan:
                </span>
                <strong className="text-success font-weight-extrabold d-block">{task.opexEstimate}</strong>
              </div>
            </div>

            {/* 🔔 PENGINGAT SOP STANDAR WAJIB (MANDATORY SOP REMINDER) */}
            <div className="p-3 rounded-3 d-flex align-items-start gap-3" style={{ backgroundColor: '#fffbe6', border: '1px solid #ffe58f' }}>
              <div className="corpox-icon-box amber flex-shrink-0" style={{ width: 36, height: 36, fontSize: 16 }}>
                <i className="ri-shield-check-fill"></i>
              </div>
              <div style={{ fontSize: 13 }}>
                <strong className="text-dark d-block mb-1 font-weight-extrabold" style={{ color: '#b45309' }}>
                  🔔 PENGINGAT SOP KEBUN WAJIB & MUTLAK:
                </strong>
                <p className="text-dark leading-relaxed mb-0 font-weight-medium" style={{ color: '#78350f' }}>
                  {task.sopReminder}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
