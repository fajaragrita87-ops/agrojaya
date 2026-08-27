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
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const daysHeader = [
    { dayIndex: 0, dayName: 'Senin', dateNum: '03 Agu', taskCount: 4, isToday: true },
    { dayIndex: 1, dayName: 'Selasa', dateNum: '04 Agu', taskCount: 3, isToday: false },
    { dayIndex: 2, dayName: 'Rabu', dateNum: '05 Agu', taskCount: 4, isToday: false },
    { dayIndex: 3, dayName: 'Kamis', dateNum: '06 Agu', taskCount: 3, isToday: false },
    { dayIndex: 4, dayName: 'Jumat', dateNum: '07 Agu', taskCount: 4, isToday: false },
    { dayIndex: 5, dayName: 'Sabtu', dateNum: '08 Agu', taskCount: 3, isToday: false },
    { dayIndex: 6, dayName: 'Minggu', dateNum: '09 Agu', taskCount: 2, isToday: false },
  ];

  const tasksData: TaskItem[] = [
    // HARI 0: SENIN
    {
      id: 'TSK-001',
      dayIndex: 0,
      dateLabel: 'Senin, 03 Agu 2026',
      title: 'Fertigasi Nutrisi NPK & Sterilisasi Gunting Stek Anggur',
      category: 'Greenhouse',
      location: 'Blok A1 - Greenhouse Anggur Impor (1.000m²)',
      pic: 'Joko Susilo (Teknisi Hortikultura)',
      timeSla: '07:30 - 10:30 WIB (SLA: 3 Jam)',
      opexEstimate: 'Rp 450.000',
      status: 'SELESAI',
      sopReminder: 'Pastikan pH air fertigasi pada rentang 6.0 - 6.5. Gunting stek wajib dibilas alkohol 70% sebelum pemangkasan sulur anggur.',
    },
    {
      id: 'TSK-002',
      dayIndex: 0,
      dateLabel: 'Senin, 03 Agu 2026',
      title: 'Pemupukan Susulan NPK Granul & Kapur Dolomit Lahan Utama',
      category: 'Pemupukan',
      location: 'Blok A2 - Lahan Porang Hibrida (2.0 Ha)',
      pic: 'Rahmat Hidayat (Kepala Kebun)',
      timeSla: '08:00 - 14:00 WIB (SLA: 6 Jam)',
      opexEstimate: 'Rp 2.800.000',
      status: 'BERJALAN',
      sopReminder: 'Dosis pemupukan NPK 250 gram/titik berjarak 50 cm dari pangkal batang. Tebar dolomit jika kelembapan tanah di atas 80%.',
    },
    {
      id: 'TSK-003',
      dayIndex: 0,
      dateLabel: 'Senin, 03 Agu 2026',
      title: 'Inspeksi Hama Lalat Buah & Seleksi 1 Buah Per Tangkai Melon',
      category: 'Proteksi Hama',
      location: 'Blok B1 - Hortikultura Melon Premium (5.000m²)',
      pic: 'Budi Santoso, S.P. (Manajer Ops)',
      timeSla: '13:00 - 16:00 WIB (SLA: 3 Jam)',
      opexEstimate: 'Rp 350.000',
      status: 'MENUNGGU',
      sopReminder: 'Pasang perangkap lalat buah (Methyl Eugenol) setiap radius 10 meter. Hanya pertahankan 1 buah melon terbaik per tanaman.',
    },
    {
      id: 'TSK-004',
      dayIndex: 0,
      dateLabel: 'Senin, 03 Agu 2026',
      title: 'Maintenance Traktor Kubota & Pompa Irigasi Satelit',
      category: 'Alat & Mesin',
      location: 'Workshop & Bengkel Kebun Jonggol',
      pic: 'M. Arifin (Mekanik Alat Berat)',
      timeSla: '15:00 - 17:30 WIB (SLA: 2.5 Jam)',
      opexEstimate: 'Rp 650.000',
      status: 'MENUNGGU',
      sopReminder: 'Cek oli mesin traktor tiap 50 jam kerja. Kuras filter solar B35 dan lumasi gantry boom sprayer dengan pelumas kalsium.',
    },

    // HARI 1: SELASA
    {
      id: 'TSK-005',
      dayIndex: 1,
      dateLabel: 'Selasa, 04 Agu 2026',
      title: 'Penyiangan Gulma Harian & Pengaratan Piringan Batang',
      category: 'Sanitasi Kebun',
      location: 'Blok A2 - Lahan Porang Hibrida (2.0 Ha)',
      pic: 'Joko Susilo (Teknisi Lapangan)',
      timeSla: '07:30 - 11:30 WIB (SLA: 4 Jam)',
      opexEstimate: 'Rp 300.000',
      status: 'MENUNGGU',
      sopReminder: 'Piringan bersih dari gulma minimal radius 1.5 meter dari pangkal pohon. Dilarang menggunakan herbisida dosis tinggi dekat perakaran.',
    },
    {
      id: 'TSK-006',
      dayIndex: 1,
      dateLabel: 'Selasa, 04 Agu 2026',
      title: 'Pemasangan Kantong Pembungkus Buah Anggur (Fruit Bagging)',
      category: 'Proteksi Panen',
      location: 'Blok A1 - Greenhouse Anggur Impor (1.000m²)',
      pic: 'Siti Rahma (Petani Hortikultura)',
      timeSla: '09:00 - 14:00 WIB (SLA: 5 Jam)',
      opexEstimate: 'Rp 500.000',
      status: 'MENUNGGU',
      sopReminder: 'Pembungkusan buah anggur dilakukan saat berry mencapai diameter 10 mm menggunakan kantong non-woven sirkulasi udara.',
    },
    {
      id: 'TSK-007',
      dayIndex: 1,
      dateLabel: 'Selasa, 04 Agu 2026',
      title: 'Pengujian Sampel Brix Kadar Gula Melon Intanon',
      category: 'Uji Kualitas',
      location: 'Blok B1 - Hortikultura Melon Premium (5.000m²)',
      pic: 'Budi Santoso, S.P. (Manajer Ops)',
      timeSla: '14:00 - 16:30 WIB (SLA: 2.5 Jam)',
      opexEstimate: 'Rp 200.000',
      status: 'MENUNGGU',
      sopReminder: 'Pengukuran kadar manis Brix pada 3 sampel buah acak per bedengan. Target panen komersial wajib minimal 14.0° Brix.',
    },

    // HARI 2: RABU
    {
      id: 'TSK-008',
      dayIndex: 2,
      dateLabel: 'Rabu, 05 Agu 2026',
      title: 'Pemangkasan Pelepah Tua & Pembumbunan Guludan Tanah',
      category: 'Pemeliharaan',
      location: 'Blok A2 - Lahan Porang Hibrida (2.0 Ha)',
      pic: 'Rahmat Hidayat (Kepala Kebun)',
      timeSla: '07:30 - 12:00 WIB (SLA: 4.5 Jam)',
      opexEstimate: 'Rp 600.000',
      status: 'MENUNGGU',
      sopReminder: 'Potong pelepah tua pada sudut 45 derajat rata dengan ketiak batang. Jangan tinggalkan sisa pelepah menggantung.',
    },
    {
      id: 'TSK-009',
      dayIndex: 2,
      dateLabel: 'Rabu, 05 Agu 2026',
      title: 'Aplikasi Fungisida Organik Hayati Trikoderma',
      category: 'Bio-Proteksi',
      location: 'Blok A1 - Greenhouse Anggur Impor (1.000m²)',
      pic: 'Joko Susilo (Teknisi Lapangan)',
      timeSla: '08:30 - 11:00 WIB (SLA: 2.5 Jam)',
      opexEstimate: 'Rp 400.000',
      status: 'MENUNGGU',
      sopReminder: 'Semprotkan bio-fungisida pada sore hari saat cuaca teduh. Hindari penyemprotan langsung pada daun basah embun.',
    },
    {
      id: 'TSK-010',
      dayIndex: 2,
      dateLabel: 'Rabu, 05 Agu 2026',
      title: 'Flushing & Pembersihan Saluran Drip Irigasi Kebun',
      category: 'Irigasi',
      location: 'Seluruh Blok Kebun Jonggol',
      pic: 'M. Arifin (Teknisi Irigasi)',
      timeSla: '13:00 - 16:00 WIB (SLA: 3 Jam)',
      opexEstimate: 'Rp 250.000',
      status: 'MENUNGGU',
      sopReminder: 'Lakukan pembilasan pipa lateral drip setiap 14 hari sekali pada tekanan 2 Bar untuk menguras endapan mineral pupuk.',
    },
    {
      id: 'TSK-011',
      dayIndex: 2,
      dateLabel: 'Rabu, 05 Agu 2026',
      title: 'Verifikasi Timbangan Digital & Pengiriman Panen',
      category: 'Logistik',
      location: 'Pos Timbangan Kebun Jonggol',
      pic: 'Ir. H. Ahmad Wijaya (Direktur)',
      timeSla: '15:00 - 17:00 WIB (SLA: 2 Jam)',
      opexEstimate: 'Rp 150.000',
      status: 'MENUNGGU',
      sopReminder: 'Toleransi selisih tera Bruto-Tarra maksimal 0.5%. Wajib sertakan foto fisik truk dan Surat Jalan resmi berstempel basah.',
    },

    // HARI 3: KAMIS
    {
      id: 'TSK-012',
      dayIndex: 3,
      dateLabel: 'Kamis, 06 Agu 2026',
      title: 'Panen Perdana Anggur Impor Shine Muscat (Grade A)',
      category: 'Panen',
      location: 'Blok A1 - Greenhouse Anggur Impor (1.000m²)',
      pic: 'Joko Susilo & Tim Hortikultura',
      timeSla: '07:00 - 11:30 WIB (SLA: 4.5 Jam)',
      opexEstimate: 'Rp 1.200.000',
      status: 'MENUNGGU',
      sopReminder: 'Potong tangkai buah menyisakan 2 cm berbentuk T. Hanya potong dompolan buah yang telah matang sempurna (Brix > 17°).',
    },
    {
      id: 'TSK-013',
      dayIndex: 3,
      dateLabel: 'Kamis, 06 Agu 2026',
      title: 'Pemberian Pupuk Kandang Organik Matang Terfermentasi',
      category: 'Pemupukan',
      location: 'Blok A2 - Lahan Porang Hibrida (2.0 Ha)',
      pic: 'Petani Lapangan (5 Orang)',
      timeSla: '08:00 - 14:00 WIB (SLA: 6 Jam)',
      opexEstimate: 'Rp 1.500.000',
      status: 'MENUNGGU',
      sopReminder: 'Pupuk kandang wajib sudah terfermentasi dingin tanpa bau menyengat sebelum diaplikasikan ke bedengan tanaman.',
    },
    {
      id: 'TSK-014',
      dayIndex: 3,
      dateLabel: 'Kamis, 06 Agu 2026',
      title: 'Pengecekan Sensor IoT pH Tanah & Suhu BMKG',
      category: 'IoT & Sensor',
      location: 'Server Stasiun Cuaca Kebun',
      pic: 'Teknisi Sistem Smart Farming',
      timeSla: '13:30 - 15:30 WIB (SLA: 2 Jam)',
      opexEstimate: 'Rp 200.000',
      status: 'MENUNGGU',
      sopReminder: 'Kalibrasi elektroda sensor tanah setiap bulan menggunakan larutan buffer pH 4.01 dan 7.00 standar ISO.',
    },

    // HARI 4: JUMAT
    {
      id: 'TSK-015',
      dayIndex: 4,
      dateLabel: 'Jumat, 07 Agu 2026',
      title: 'Panen Selektif Melon Intanon Golden Sweet Tahap 1',
      category: 'Panen',
      location: 'Blok B1 - Hortikultura Melon Premium (5.000m²)',
      pic: 'Budi Santoso & Tim Kebun',
      timeSla: '06:30 - 11:00 WIB (SLA: 4.5 Jam)',
      opexEstimate: 'Rp 850.000',
      status: 'MENUNGGU',
      sopReminder: 'Gunakan sarung tangan katun saat memetik buah. Letakkan di keranjang busa agar kulit buah tidak memar.',
    },
    {
      id: 'TSK-016',
      dayIndex: 4,
      dateLabel: 'Jumat, 07 Agu 2026',
      title: 'Sortasi & Grading Hasil Panen di Gudang Packing',
      category: 'Grading',
      location: 'Gudang Sortir & Pengemasan Jonggol',
      pic: 'Tim QC Gudang (3 Orang)',
      timeSla: '13:00 - 16:30 WIB (SLA: 3.5 Jam)',
      opexEstimate: 'Rp 400.000',
      status: 'MENUNGGU',
      sopReminder: 'Kriteria Grade A: Berat 1.8 - 2.2 kg, jaring net rapat sempurna, brix minimal 14°, bebas bercak jamur.',
    },

    // HARI 5: SABTU
    {
      id: 'TSK-017',
      dayIndex: 5,
      dateLabel: 'Sabtu, 08 Agu 2026',
      title: 'Olah Tanah Guludan & Sanitasi Pasca Panen Melon',
      category: 'Olah Tanah',
      location: 'Blok B1 - Hortikultura Melon Premium (5.000m²)',
      pic: 'Operator Traktor & Mandor',
      timeSla: '07:30 - 12:30 WIB (SLA: 5 Jam)',
      opexEstimate: 'Rp 950.000',
      status: 'MENUNGGU',
      sopReminder: 'Bajak tanah sedalam 30 cm untuk membalik top-soil. Tabur dolomit 1 Ton/Ha dan jemur 7 hari sebelum tanam rotasi.',
    },
    {
      id: 'TSK-018',
      dayIndex: 5,
      dateLabel: 'Sabtu, 08 Agu 2026',
      title: 'Inspeksi Monitoring Debit Air Reservoir Embung',
      category: 'Water Management',
      location: 'Embung & Reservoir Air Jonggol',
      pic: 'M. Arifin (Teknisi Irigasi)',
      timeSla: '14:00 - 16:00 WIB (SLA: 2 Jam)',
      opexEstimate: 'Rp 150.000',
      status: 'MENUNGGU',
      sopReminder: 'Tinggi muka air embung minimal 2.5 meter. Nilai EC air irigasi tidak boleh melebihi 0.5 mS/cm.',
    },

    // HARI 6: MINGGU
    {
      id: 'TSK-019',
      dayIndex: 6,
      dateLabel: 'Minggu, 09 Agu 2026',
      title: 'Patroli Keamanan & Monitoring Pagar Geofence Satelit',
      category: 'Keamanan Lahan',
      location: 'Seluruh Blok Kebun Jonggol (2.6 Ha)',
      pic: 'Tim Keamanan Piket',
      timeSla: '08:00 - 16:00 WIB (SLA: 8 Jam)',
      opexEstimate: 'Rp 350.000',
      status: 'MENUNGGU',
      sopReminder: 'Ronda pagar batas luar kebun setiap 4 jam. Pastikan sensor pagar CCTV dan perangkat GPS satelit aktif.',
    },
    {
      id: 'TSK-020',
      dayIndex: 6,
      dateLabel: 'Minggu, 09 Agu 2026',
      title: 'Uji Tekanan Solenoid Valve & Pengecekan Kebocoran Drip',
      category: 'Maintenance',
      location: 'Blok A1 & Blok B1 Greenhouse',
      pic: 'Teknisi Piket Irigasi',
      timeSla: '09:30 - 12:00 WIB (SLA: 2.5 Jam)',
      opexEstimate: 'Rp 150.000',
      status: 'MENUNGGU',
      sopReminder: 'Uji coba solenoid valve otomatis pada tekanan 3 Bar. Ganti karet seal yang getas untuk cegah kebocoran.',
    },
  ];

  const [tasks, setTasks] = useState<TaskItem[]>(tasksData);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('Penyiraman & Fertigasi AB Mix Nutrisi');
  const [formCategory, setFormCategory] = useState('Greenhouse');
  const [formLocation, setFormLocation] = useState('Blok A1 - Greenhouse Melon Golden (2.0 Ha)');
  const [formPic, setFormPic] = useState('Kang Asep (Regu A)');
  const [formDayIndex, setFormDayIndex] = useState<number>(0);
  const [formTimeSla, setFormTimeSla] = useState('07:30 - 09:30 WIB (SLA: 2 Jam)');
  const [formOpex, setFormOpex] = useState('Rp 350.000');
  const [formSop, setFormSop] = useState('Wajib cek pH 6.0 - 6.5 dan EC 2.2 mS/cm sebelum membuka katup irigasi drip.');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const dayNames = ['Senin, 03 Agu 2026', 'Selasa, 04 Agu 2026', 'Rabu, 05 Agu 2026', 'Kamis, 06 Agu 2026', 'Jumat, 07 Agu 2026', 'Sabtu, 08 Agu 2026', 'Minggu, 09 Agu 2026'];
    const newTask: TaskItem = {
      id: `TSK-${String(tasks.length + 1).padStart(3, '0')}`,
      dayIndex: formDayIndex,
      dateLabel: dayNames[formDayIndex],
      title: formTitle,
      category: formCategory,
      location: formLocation,
      pic: formPic,
      timeSla: formTimeSla,
      opexEstimate: formOpex,
      status: 'MENUNGGU',
      sopReminder: formSop,
    };

    setTasks([newTask, ...tasks]);
    setIsCreateModalOpen(false);
    setSelectedDay(formDayIndex);
    alert(`✅ Penugasan Baru "${formTitle}" Berhasil Diterbitkan dan Terkirim Otomatis ke Mobile Petani/Mandor!`);
  };

  // Filter tasks based on selected day and status
  const dayTasks = tasks.filter((t) => t.dayIndex === selectedDay);
  const filteredTasks = dayTasks.filter((t) => {
    if (filterStatus === 'ALL') return true;
    return t.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SELESAI':
        return <span className="badge bg-success text-white font-weight-bold px-2.5 py-1 rounded-pill" style={{ fontSize: 10.5 }}><i className="ri-checkbox-circle-fill me-1"></i> SELESAI</span>;
      case 'BERJALAN':
        return <span className="badge bg-warning text-dark font-weight-bold px-2.5 py-1 rounded-pill" style={{ fontSize: 10.5 }}><i className="ri-time-fill me-1"></i> SEDANG BERJALAN</span>;
      default:
        return <span className="badge bg-secondary text-white font-weight-bold px-2.5 py-1 rounded-pill" style={{ fontSize: 10.5 }}><i className="ri-time-line me-1"></i> MENUNGGU</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* 7-Day Clean Horizontal Strip (1 Single Sleek Row) */}
      <div className="card-box p-3 rounded-4 bg-white border shadow-sm">
        <div className="d-flex flex-nowrap gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
          {daysHeader.map((day) => {
            const isSelected = selectedDay === day.dayIndex;
            return (
              <button
                key={day.dayIndex}
                type="button"
                onClick={() => setSelectedDay(day.dayIndex)}
                className="flex-fill p-2.5 rounded-3 text-center d-flex flex-column align-items-center justify-content-center cursor-pointer border-0"
                style={{
                  minWidth: 120,
                  background: isSelected ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : '#f8fafc',
                  color: isSelected ? '#ffffff' : '#1e293b',
                  border: isSelected ? '1px solid #047857' : '1px solid #e2e8f0',
                  boxShadow: isSelected ? '0 4px 12px rgba(5, 150, 105, 0.25)' : 'none',
                  transition: 'all 0.15s ease-in-out',
                }}
              >
                <div className="d-flex align-items-center justify-content-center gap-1 mb-0.5">
                  <span className="text-uppercase font-weight-bold" style={{ fontSize: 11, color: isSelected ? '#ffffff' : '#64748b' }}>
                    {day.dayName}
                  </span>
                  {day.isToday && (
                    <span
                      style={{
                        fontSize: 8.5,
                        fontWeight: 800,
                        padding: '1px 5px',
                        borderRadius: 6,
                        backgroundColor: isSelected ? '#ffffff' : '#059669',
                        color: isSelected ? '#047857' : '#ffffff',
                      }}
                    >
                      HARI INI
                    </span>
                  )}
                </div>

                <div className="font-weight-extrabold my-0.5" style={{ fontSize: 15, color: isSelected ? '#ffffff' : '#0f172a' }}>
                  {day.dateNum}
                </div>

                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 7px',
                    borderRadius: 10,
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.25)' : '#e2e8f0',
                    color: isSelected ? '#ffffff' : '#475569',
                  }}
                >
                  {day.taskCount} Pekerjaan
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task List Header & Status Filter */}
      <div className="card-box p-4 rounded-4 bg-white border shadow-sm space-y-3">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 pb-2 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <h4 className="font-weight-bold text-dark m-0 !text-sm">
              <i className="ri-calendar-check-line text-success me-1.5"></i> Agenda: {daysHeader[selectedDay].dayName}, {daysHeader[selectedDay].dateNum} 2026
            </h4>
            <span className="badge bg-light text-dark border font-weight-bold" style={{ fontSize: 11 }}>
              {dayTasks.length} Tasklist
            </span>
          </div>

          {/* Filter Pills & Create Button */}
          <div className="d-flex flex-wrap align-items-center gap-2">
            <div className="d-flex align-items-center gap-1">
              <span className="text-muted font-weight-bold me-1" style={{ fontSize: 11 }}>Status:</span>
              {[
                { id: 'ALL', label: 'Semua' },
                { id: 'SELESAI', label: 'Selesai' },
                { id: 'BERJALAN', label: 'Sedang Berjalan' },
                { id: 'MENUNGGU', label: 'Menunggu' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setFilterStatus(st.id)}
                  className={`btn btn-sm px-2.5 py-0.5 rounded-pill font-weight-bold ${
                    filterStatus === st.id ? 'btn-success text-white' : 'btn-outline-secondary'
                  }`}
                  style={{ fontSize: 11 }}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="btn btn-sm btn-success font-weight-bold px-3 py-1.5 rounded-pill shadow-xs d-inline-flex align-items-center gap-1.5 cursor-pointer"
              style={{ fontSize: 12 }}
            >
              <i className="ri-add-circle-fill text-white"></i>
              <span>+ Buat Penugasan Baru</span>
            </button>
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-5 border rounded-3 bg-light">
              <i className="ri-task-line text-muted mb-2 d-block" style={{ fontSize: 32 }}></i>
              <span className="text-muted font-weight-medium">Tidak ada jadwal pekerjaan pada status ini.</span>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-3 border bg-white shadow-xs space-y-2.5"
                style={{ borderLeft: '4px solid #059669' }}
              >
                {/* Top Task Row */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 pb-2 border-bottom">
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <span className="badge bg-light text-secondary border font-monospace font-weight-bold" style={{ fontSize: 10.5 }}>{task.id}</span>
                    <span className="badge bg-success-subtle text-success border border-success font-weight-bold" style={{ fontSize: 10.5 }}>
                      {task.category}
                    </span>
                    <h5 className="font-weight-extrabold text-dark m-0" style={{ fontSize: 14 }}>
                      {task.title}
                    </h5>
                  </div>
                  <div>{getStatusBadge(task.status)}</div>
                </div>

                {/* 4 Metadata Badges (Clean 4-column row) */}
                <div className="row g-2 text-secondary" style={{ fontSize: 12 }}>
                  <div className="col-12 col-sm-6 col-md-3">
                    <span className="text-muted d-block" style={{ fontSize: 10.5 }}>📍 Lokasi Lahan:</span>
                    <strong className="text-dark font-weight-bold d-block">{task.location}</strong>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                    <span className="text-muted d-block" style={{ fontSize: 10.5 }}>👤 Penanggung Jawab:</span>
                    <strong className="text-dark font-weight-bold d-block">{task.pic}</strong>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                    <span className="text-muted d-block" style={{ fontSize: 10.5 }}>⏱️ Waktu Kerja:</span>
                    <strong className="text-dark font-weight-bold d-block">{task.timeSla}</strong>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                    <span className="text-muted d-block" style={{ fontSize: 10.5 }}>💰 Estimasi Biaya OPEX:</span>
                    <strong className="text-success font-weight-extrabold d-block">{task.opexEstimate}</strong>
                  </div>
                </div>

                {/* Crisp SOP Callout */}
                <div className="p-2.5 rounded-2 d-flex align-items-start gap-2" style={{ backgroundColor: '#fffbe6', border: '1px solid #ffe58f' }}>
                  <i className="ri-information-fill text-warning mt-0.5" style={{ fontSize: 15 }}></i>
                  <div style={{ fontSize: 12 }}>
                    <strong className="text-warning-emphasis font-weight-bold me-1">SOP Budidaya:</strong>
                    <span className="text-dark">{task.sopReminder}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ==================== MODAL TAMBAH TUGAS (MANAGER / KEPALA KEBUN) ==================== */}
      {isCreateModalOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              <div className="modal-header bg-[#0F5545] text-white p-3.5 border-0">
                <div className="d-flex align-items-center gap-2">
                  <div className="w-8 h-8 rounded-circle bg-white/20 d-flex align-items-center justify-content-center text-white">
                    <i className="ri-task-fill"></i>
                  </div>
                  <div>
                    <h5 className="modal-title font-weight-bold m-0 text-white" style={{ fontSize: 16 }}>
                      Form Penugasan Baru (Manager / Kepala Kebun)
                    </h5>
                    <span className="text-white-50" style={{ fontSize: 11 }}>
                      Terbitkan instruksi kerja harian ke aplikasi Mobile Petani & Mandor
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="btn-close btn-close-white cursor-pointer"
                ></button>
              </div>

              <form onSubmit={handleCreateTask}>
                <div className="modal-body p-4 space-y-3">
                  <div className="row g-3">
                    {/* Judul Tugas */}
                    <div className="col-12">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Judul Pekerjaan / Tugas Kebun:
                      </label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="Contoh: Fertigasi Nutrisi AB Mix Pagi"
                        className="form-control form-control-sm rounded-3"
                      />
                    </div>

                    {/* Kategori & Hari */}
                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Kategori Pekerjaan:
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="form-select form-select-sm rounded-3"
                      >
                        <option value="Greenhouse">Greenhouse & Nutrisi</option>
                        <option value="Pemupukan">Pemupukan Susulan</option>
                        <option value="Proteksi Hama">Proteksi Hama & Penyakit</option>
                        <option value="Sanitasi Kebun">Sanitasi & Pruning</option>
                        <option value="Panen">Panen & Sortasi</option>
                        <option value="Alat & Mesin">Alat & Irigasi Satelit</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Jadwal Hari Eksekusi:
                      </label>
                      <select
                        value={formDayIndex}
                        onChange={(e) => setFormDayIndex(Number(e.target.value))}
                        className="form-select form-select-sm rounded-3"
                      >
                        {daysHeader.map((d) => (
                          <option key={d.dayIndex} value={d.dayIndex}>
                            {d.dayName}, {d.dateNum} 2026 {d.isToday ? '(Hari Ini)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Lokasi Blok & Penanggung Jawab */}
                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Lokasi Blok Kebun:
                      </label>
                      <select
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="form-select form-select-sm rounded-3"
                      >
                        <option value="Blok A1 - Greenhouse Melon Golden (2.0 Ha)">Blok A1 - Greenhouse Melon Golden (2.0 Ha)</option>
                        <option value="Blok A2 - Lahan Porang Hibrida (2.0 Ha)">Blok A2 - Lahan Porang Hibrida (2.0 Ha)</option>
                        <option value="Blok B1 - Hortikultura Melon Premium (5.000m²)">Blok B1 - Hortikultura Melon Premium (5.000m²)</option>
                        <option value="Blok C1 - Cabai Rawit Ori 212 (2.0 Ha)">Blok C1 - Cabai Rawit Ori 212 (2.0 Ha)</option>
                        <option value="Blok D1 - Perennial Alpukat Miki">Blok D1 - Perennial Alpukat Miki</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Petani / Mandor Penanggung Jawab:
                      </label>
                      <select
                        value={formPic}
                        onChange={(e) => setFormPic(e.target.value)}
                        className="form-select form-select-sm rounded-3"
                      >
                        <option value="Kang Asep (Regu A)">Kang Asep (Regu A - Hortikultura)</option>
                        <option value="Pak Joko Sukardi (Kepala Kebun)">Pak Joko Sukardi (Kepala Kebun)</option>
                        <option value="Pak Ujang (Regu B - Porang)">Pak Ujang (Regu B - Porang)</option>
                        <option value="Mang Deden (Regu C - Cabai)">Mang Deden (Regu C - Cabai)</option>
                        <option value="Kang Wawan (Regu A)">Kang Wawan (Regu A)</option>
                        <option value="Pak Sugeng (Regu D)">Pak Sugeng (Regu D)</option>
                      </select>
                    </div>

                    {/* Jam Waktu Kerja & Estimasi OPEX */}
                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Jam Waktu Kerja (SLA):
                      </label>
                      <input
                        type="text"
                        required
                        value={formTimeSla}
                        onChange={(e) => setFormTimeSla(e.target.value)}
                        placeholder="Contoh: 07:30 - 10:30 WIB (SLA: 3 Jam)"
                        className="form-control form-control-sm rounded-3"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Estimasi Anggaran OPEX (Rp):
                      </label>
                      <input
                        type="text"
                        required
                        value={formOpex}
                        onChange={(e) => setFormOpex(e.target.value)}
                        placeholder="Contoh: Rp 350.000"
                        className="form-control form-control-sm rounded-3"
                      />
                    </div>

                    {/* Pengingat SOP */}
                    <div className="col-12">
                      <label className="form-label font-weight-bold text-dark mb-1" style={{ fontSize: 12.5 }}>
                        Instruksi SOP Agronomi yang Wajib Ditaati:
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={formSop}
                        onChange={(e) => setFormSop(e.target.value)}
                        placeholder="Tuliskan parameter nutrisi, dosis, atau standar GAP yang harus dipatuhi..."
                        className="form-control form-control-sm rounded-3"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light p-3 border-top d-flex justify-content-between">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="btn btn-sm btn-outline-secondary font-weight-bold px-3 rounded-pill cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm btn-success font-weight-bold px-4 rounded-pill shadow-sm d-inline-flex align-items-center gap-1.5 cursor-pointer"
                  >
                    <i className="ri-send-plane-fill"></i>
                    <span>Terbitkan Tugas ke Mobile Petani</span>
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
