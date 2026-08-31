import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. TASK MODEL
export interface FarmTask {
  id: string;
  title: string;
  target: string;
  assignedTo: string;
  role: 'PETANI' | 'MANDOR' | 'KEPALA_KEBUN';
  time: string;
  category: 'Irigasi' | 'Agronomi' | 'Monitoring' | 'Proteksi' | 'Panen' | 'Olah Lahan';
  completed: boolean;
  photoProof?: string;
  notes?: string;
  createdAt: string;
  completedAt?: string;
}

// 2. PO LIFECYCLE MODEL (4-Tier Verification: Manager -> Finance -> Direktur -> Investor)
export type POStatus =
  | 'PENDING_FINANCE'
  | 'PENDING_DIREKTUR'
  | 'PENDING_INVESTOR'
  | 'APPROVED'
  | 'REJECTED';

export interface PurchaseOrder {
  id: string;
  title: string;
  vendor: string;
  amount: number;
  category: 'Saprotan' | 'Bibit' | 'Pupuk' | 'Infrastruktur' | 'Alsintan';
  date: string;
  status: POStatus;
  requester: string;
  invoiceNumber?: string;
  financeVerifiedAt?: string;
  direkturApprovedAt?: string;
  investorAuthorizedAt?: string;
  notes?: string;
  targetLand?: string;
  // 4-Tier Visual Proof Photos:
  proformaPhoto?: string;       // Foto Invoice/Penawaran Toko Asli
  paymentProofPhoto?: string;   // Foto Bukti Transfer Bank / Voucher Kas
  goodsReceivedPhoto?: string;  // Foto Barang Fisik Tiba di Gudang Kebun
  fieldApplicationPhoto?: string; // Foto Realisasi Pengaplikasian Nyata di Lahan
}

// 2B. LIVE FIELD FEED MODEL (WhatsApp Group Replacement)
export type FieldReportCategory =
  | 'PEMBUKAAN_LAHAN'
  | 'OLAH_TANAH'
  | 'PENANAMAN'
  | 'PEMUPUKAN'
  | 'PROTEKSI_HAMA'
  | 'PENGAIRAN'
  | 'PANEN'
  | 'KENDALA_CUACA'
  | 'LOGISTIK_PO';

export interface FieldReportComment {
  id: string;
  authorName: string;
  authorRole: 'SUPERADMIN' | 'DIREKTUR' | 'FINANCE' | 'INVESTOR' | 'KEPALA_KEBUN' | 'MANDOR' | 'MANAGER' | 'PETANI' | string;
  authorAvatar?: string;
  text: string;
  timestamp: string;
}

export interface FieldReportPost {
  id: string;
  authorName: string;
  authorRole: 'SUPERADMIN' | 'PETANI' | 'MANDOR' | 'KEPALA_KEBUN' | 'MANAGER' | 'DIREKTUR' | 'FINANCE' | string;
  authorAvatar?: string;
  category: FieldReportCategory;
  categoryLabel: string;
  blockTarget: string;
  timestamp: string;
  caption: string;
  photoUrls: string[];
  beforeAfter?: {
    beforePhoto: string;
    beforeLabel: string;
    afterPhoto: string;
    afterLabel: string;
  };
  gpsLocation: string;
  coordinates?: { lat: number; lng: number };
  likesCount: number;
  isLiked?: boolean;
  relatedPoId?: string;
  comments: FieldReportComment[];
}

// 3. TREE SAMPLE PASSPORT MODEL
export interface TreeLog {
  id?: string;
  time: string;
  action: string;
  detail: string;
  pic: string;
  photoUrl?: string;
}

export interface TreeGrowthStage {
  stage: string;
  date: string;
  height: string;
  status: string;
}

export interface TreeSample {
  id: string;
  code: string;
  tabLabel: string;
  name: string;
  variety: string;
  category: string;
  block: string;
  locationDetail: string;
  plantingDate: string;
  ageHst: string;
  phase: string;
  healthScore: string;
  targetBrix: string;
  estWeight: string;
  gpsCoords: string;
  farmer: string;
  mandor: string;
  certNo: string;
  cardBg: string;
  accentColor: string;
  borderColor: string;
  icon: string;
  growthStory: TreeGrowthStage[];
  recentLogs: TreeLog[];
}

// 4. PLANT SCAN AI MODEL
export interface PlantScanRecord {
  id: string;
  timestamp: string;
  plantName: string;
  plantCode: string;
  imageUrl?: string;
  healthScore: string;
  detectedIssue: string;
  recommendation: string;
  brixEst: string;
  scannedBy: string;
}

// 5. INVENTORY MODEL
export interface InventoryItem {
  id: string;
  name: string;
  category: 'Pupuk' | 'Benih' | 'Pestisida' | 'Alat';
  stock: number;
  unit: string;
  minStock: number;
  location: string;
  status: 'Aman' | 'Menipis' | 'Kritis';
}

// 6. WEIGHBRIDGE MODEL
export interface WeighbridgeSlip {
  id: string;
  slipNo: string;
  date: string;
  truckNo: string;
  driver: string;
  commodity: string;
  blockOrigin: string;
  bruto: number;
  tarra: number;
  netto: number;
  grade: 'Grade A' | 'Grade B' | 'Grade C';
  buyer: string;
  pricePerKg: number;
  totalValue: number;
}

// 7. ATTENDANCE MODEL
export interface AttendanceRecord {
  id: string;
  workerName: string;
  role: string;
  date: string;
  timeIn: string;
  timeOut?: string;
  gpsLocation: string;
  status: 'HADIR' | 'IZIN' | 'SAKIT';
}

// STORE INTERFACE
interface SmartFarmState {
  // Collections
  tasks: FarmTask[];
  purchaseOrders: PurchaseOrder[];
  fieldPosts: FieldReportPost[];
  treeSamples: TreeSample[];
  plantScans: PlantScanRecord[];
  inventory: InventoryItem[];
  weighbridgeSlips: WeighbridgeSlip[];
  attendanceRecords: AttendanceRecord[];
  lifecycleStagePhotos: Record<number, string>;

  // Lifecycle Stage Actions
  updateLifecycleStagePhoto: (stepNumber: number, photoUrl: string, updatedBy?: string, caption?: string) => void;

  // Task Actions
  addTask: (task: Omit<FarmTask, 'id' | 'createdAt' | 'completed'>) => void;
  toggleTask: (taskId: string, photoProof?: string, notes?: string) => void;
  deleteTask: (taskId: string) => void;

  // Live Field Feed Actions (WhatsApp Group Replacement)
  addFieldReportPost: (post: Omit<FieldReportPost, 'id' | 'timestamp' | 'comments' | 'likesCount' | 'isLiked'>) => void;
  addPostComment: (postId: string, comment: Omit<FieldReportComment, 'id' | 'timestamp'>) => void;
  likePost: (postId: string) => void;

  // PO Actions
  createPO: (po: Omit<PurchaseOrder, 'id' | 'date' | 'status'>) => void;
  verifyPOByFinance: (poId: string, notes?: string) => void;
  approvePOByDirektur: (poId: string, notes?: string) => void;
  authorizePOByInvestor: (poId: string, notes?: string) => void;
  rejectPO: (poId: string, notes?: string) => void;
  updatePOPhotos: (poId: string, photos: Partial<Pick<PurchaseOrder, 'proformaPhoto' | 'paymentProofPhoto' | 'goodsReceivedPhoto' | 'fieldApplicationPhoto'>>) => void;

  // Tree & Plant Scan Actions
  addTreeLog: (treeIdOrCode: string, log: Omit<TreeLog, 'id'>) => void;
  addPlantScan: (scan: Omit<PlantScanRecord, 'id' | 'timestamp'>) => void;

  // Inventory Actions
  adjustStock: (itemId: string, qtyChange: number) => void;

  // Weighbridge Actions
  addWeighbridgeSlip: (slip: Omit<WeighbridgeSlip, 'id'>) => void;

  // Attendance Actions
  toggleAttendance: (workerName: string, role: string, location?: string) => boolean;

  // Reset demo data
  resetDemoData: () => void;
}

// INITIAL DEMO DATA
const initialTasks: FarmTask[] = [
  {
    id: 'TASK-001',
    title: 'Penyiraman Drip Nutrisi AB Mix Pagi',
    target: 'Blok A1 - A2 (400 Lubang Tanam)',
    assignedTo: 'Kang Asep (Regu A)',
    role: 'PETANI',
    time: '07:30 WIB',
    category: 'Irigasi',
    completed: true,
    createdAt: '2026-08-27 06:00',
    completedAt: '2026-08-27 07:45',
    notes: 'EC 2.2, pH 6.2 lancar tanpa kendala.',
  },
  {
    id: 'TASK-002',
    title: 'Pewiwitan / Pruning Tunas Air Liar',
    target: 'Blok A2 Melon (200 Tanaman Buah)',
    assignedTo: 'Kang Asep (Regu A)',
    role: 'PETANI',
    time: '09:00 WIB',
    category: 'Agronomi',
    completed: false,
    createdAt: '2026-08-27 06:30',
  },
  {
    id: 'TASK-003',
    title: 'Inspeksi & Ukur Buah Sampel Ajir #17 & #18',
    target: 'Blok A2 Melon (Pohon KTP Paspor)',
    assignedTo: 'Kang Asep (Regu A)',
    role: 'PETANI',
    time: '13:30 WIB',
    category: 'Monitoring',
    completed: false,
    createdAt: '2026-08-27 07:00',
  },
  {
    id: 'TASK-004',
    title: 'Aplikasi Bio-Trichoderma Pencegah Jamur',
    target: 'Blok B1 Porang (1.200 Polybag)',
    assignedTo: 'Pak Sugeng (Regu B)',
    role: 'PETANI',
    time: '15:00 WIB',
    category: 'Proteksi',
    completed: false,
    createdAt: '2026-08-27 07:15',
  },
  {
    id: 'TASK-005',
    title: 'Pemasangan Paranet Naungan 40%',
    target: 'Blok B2 Porang Madiun Super',
    assignedTo: 'Pak Budi (Regu B)',
    role: 'PETANI',
    time: '10:00 WIB',
    category: 'Olah Lahan',
    completed: false,
    createdAt: '2026-08-27 07:30',
  },
];

const initialPOs: PurchaseOrder[] = [
  {
    id: 'PO-024',
    title: 'Bibit Unggul Melon Golden Apollo F1 (1.000 Pack)',
    vendor: 'PT East West Seed Indonesia',
    amount: 15400000,
    category: 'Bibit',
    date: '24 Agu 2026',
    status: 'APPROVED',
    requester: 'Irfan Maulana (Manajer Ops)',
    invoiceNumber: 'INV-EWS-88219',
    financeVerifiedAt: '24 Agu 10:15',
    direkturApprovedAt: '24 Agu 14:00',
    investorAuthorizedAt: '25 Agu 08:30',
    targetLand: 'Blok A2 (Greenhouse Sentra Melon)',
    notes: 'Kebutuhan tanam siklus 2, benih sertifikasi resmi tahan Gemini virus.',
    proformaPhoto: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    paymentProofPhoto: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    goodsReceivedPhoto: 'https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=800&q=80',
    fieldApplicationPhoto: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PO-026',
    title: 'Pupuk Hayati Cair & Bio-Trichoderma Organik (100 Liter)',
    vendor: 'PT Agro Tani Makmur',
    amount: 28500000,
    category: 'Pupuk',
    date: '26 Agu 2026',
    status: 'PENDING_INVESTOR',
    requester: 'Pak Joko Sukardi (Kepala Kebun)',
    invoiceNumber: 'INV-ATM-2026-092',
    financeVerifiedAt: '26 Agu 11:30',
    direkturApprovedAt: '27 Agu 09:15',
    targetLand: 'Blok B1 (Kebun Porang Super Jonggol)',
    notes: 'Dosis pencegahan busuk batang fase awal musim hujan.',
    proformaPhoto: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    paymentProofPhoto: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80',
    goodsReceivedPhoto: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    fieldApplicationPhoto: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PO-027',
    title: 'Perbaikan Sistem Drip Irigasi & Pipa HDPE 2 Inch (300 Meter)',
    vendor: 'CV Tirta Abadi Teknik',
    amount: 12800000,
    category: 'Infrastruktur',
    date: '27 Agu 2026',
    status: 'PENDING_DIREKTUR',
    requester: 'Irfan Maulana (Manajer Ops)',
    invoiceNumber: 'INV-TAT-4410',
    financeVerifiedAt: '27 Agu 10:00',
    targetLand: 'Blok A1 - A2 (Greenhouse Irigasi)',
    notes: 'Penggantian manifold drip nozzle blok barat yang tersumbat kapur.',
    proformaPhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    paymentProofPhoto: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    goodsReceivedPhoto: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    fieldApplicationPhoto: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'PO-028',
    title: 'Pengadaan Mulsa Plastik Hitam Perak (20 Roll x 500m)',
    vendor: 'PT Plastindo Agri Utama',
    amount: 9600000,
    category: 'Saprotan',
    date: '27 Agu 2026',
    status: 'PENDING_FINANCE',
    requester: 'Pak Joko Sukardi (Kepala Kebun)',
    targetLand: 'Blok C1 (Persiapan Lahan Cabai Rawit)',
    notes: 'Penutupan bedengan tanah baru setelah tebar kapur dolomit & pupuk kandang.',
    proformaPhoto: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    goodsReceivedPhoto: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
  },
];

const initialFieldPosts: FieldReportPost[] = [
  {
    id: 'POST-001',
    authorName: 'Pak Joko Sukardi',
    authorRole: 'KEPALA_KEBUN',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    category: 'PEMBUKAAN_LAHAN',
    categoryLabel: 'Pembukaan & Land Clearing Lahan',
    blockTarget: 'Blok A Sentra Jonggol (2.0 Ha)',
    timestamp: 'Hari ini, 08:30 WIB',
    caption: 'Laporan Perkembangan Fisik Pembukaan Lahan: Pembersihan ilalang, perataan kontur terasering, dan pembuatan parit drainase keliling kedalaman 40cm telah tuntas 100%. Lahan kini bersih dan siap masuk tahap pembajakan rotavator!',
    photoUrls: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80',
    ],
    beforeAfter: {
      beforePhoto: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      beforeLabel: 'Kondisi Awal (Semak Belukar)',
      afterPhoto: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      afterLabel: 'Setelah Land Clearing 100%',
    },
    gpsLocation: 'Kebun Jonggol Inti (-6.4697, 107.0583)',
    coordinates: { lat: -6.4697, lng: 107.0583 },
    likesCount: 14,
    isLiked: true,
    comments: [
      {
        id: 'C-01',
        authorName: 'Dr. Hendra Gunawan',
        authorRole: 'DIREKTUR',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        text: 'Kerja bagus Pak Joko & tim! Pastikan parit pembuangan air mengarah langsung ke kolam retensi barat ya agar tidak ada erosi tanah subur saat hujan lebat.',
        timestamp: '09:05 WIB',
      },
      {
        id: 'C-02',
        authorName: 'Pak Joko Sukardi',
        authorRole: 'KEPALA_KEBUN',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        text: 'Siap Pak Direktur! Kemiringan parit sudah 2% menuju kolam retensi, debit air gravitasi sangat aman.',
        timestamp: '09:12 WIB',
      },
      {
        id: 'C-03',
        authorName: 'Bambang Soediro',
        authorRole: 'INVESTOR',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        text: 'Sangat rapi pembukaannya. Senang melihat progres fisik yang nyata di aplikasi. Teruskan semangatnya!',
        timestamp: '09:40 WIB',
      },
    ],
  },
  {
    id: 'POST-002',
    authorName: 'Irfan Maulana',
    authorRole: 'MANDOR',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
    category: 'LOGISTIK_PO',
    categoryLabel: 'Realisasi Belanja PO & Aplikasi Lahan',
    blockTarget: 'Gudang Kebun & Blok B1 Porang',
    timestamp: 'Kemarin, 14:15 WIB',
    caption: 'Update Realisasi PO-026: 100 Liter Bio-Trichoderma Organik dari PT Agro Tani Makmur telah tiba di gudang dan lolos QC. Sebanyak 40 Liter sudah langsung diaplikasikan Kang Asep ke media polybag Blok B1 untuk sterilisasi tanah!',
    photoUrls: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=900&q=80',
    ],
    relatedPoId: 'PO-026',
    gpsLocation: 'Gudang Logistik Kebun Jonggol (-6.4699, 107.0581)',
    coordinates: { lat: -6.4699, lng: 107.0581 },
    likesCount: 8,
    isLiked: false,
    comments: [
      {
        id: 'C-04',
        authorName: 'Siti Rahmawati (Finance)',
        authorRole: 'FINANCE',
        text: 'Kwitansi fisik dan surat jalan nomor SJ-ATM-9921 sudah kami cocokkan dengan voucher bank. Status PO terverifikasi lunas.',
        timestamp: '15:00 WIB',
      },
    ],
  },
  {
    id: 'POST-003',
    authorName: 'Kang Asep Sunandar',
    authorRole: 'PETANI',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    category: 'PENANAMAN',
    categoryLabel: 'Penanaman & Paspor Pohon QR',
    blockTarget: 'Greenhouse Blok A2 (Baris 4)',
    timestamp: 'Kemarin, 10:20 WIB',
    caption: 'Penanaman 200 bibit Melon Golden Apollo F1 di ajir #1 sampai #50 telah selesai. Label QR Code Paspor Pohon sudah digantung pada tiap ajir perwakilan. Kondisi bibit segar 100% tanpa layu.',
    photoUrls: [
      'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=900&q=80',
    ],
    gpsLocation: 'Greenhouse Blok A2 (-6.4695, 107.0586)',
    coordinates: { lat: -6.4695, lng: 107.0586 },
    likesCount: 19,
    isLiked: true,
    comments: [
      {
        id: 'C-05',
        authorName: 'Pak Joko Sukardi',
        authorRole: 'KEPALA_KEBUN',
        text: 'Bagus Kang Asep. Sore nanti aktifkan drip nutrisi EC 1.8 selama 15 menit ya untuk adaptasi akar bibit baru.',
        timestamp: '11:00 WIB',
      },
    ],
  },
  {
    id: 'POST-004',
    authorName: 'Pak Joko Sukardi',
    authorRole: 'KEPALA_KEBUN',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    category: 'PANEN',
    categoryLabel: 'Uji Kemanisan (Brix) & Timbangan Panen',
    blockTarget: 'Blok A2 (Melon Golden Harvest Trial)',
    timestamp: '25 Agu 2026, 16:00 WIB',
    caption: 'Hasil uji petik sampel acak 5 buah Melon Golden Apollo: Rata-rata kadar gula 14.8° Brix (Standar Super Premium >13° Brix) dengan bobot 2.15 Kg/buah. Siap masuk panen raya minggu depan dan kirim ke offtaker supermarket!',
    photoUrls: [
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=900&q=80',
    ],
    gpsLocation: 'Pos Timbangan Kebun Jonggol (-6.4698, 107.0582)',
    coordinates: { lat: -6.4698, lng: 107.0582 },
    likesCount: 27,
    isLiked: true,
    comments: [
      {
        id: 'C-06',
        authorName: 'Bambang Soediro',
        authorRole: 'INVESTOR',
        text: 'Brix 14.8 luar biasa! Sesuai dengan estimasi HPP & proyeksi margin profit di awal proposal. Sukses untuk panen rayanya.',
        timestamp: '25 Agu 17:30 WIB',
      },
    ],
  },
];

const initialTreeSamples: TreeSample[] = [
  {
    id: 'TR-001',
    code: 'SAMPLE-TR-A2-0841',
    tabLabel: '🍈 Melon Golden',
    name: 'Pohon Sampel #1 — Melon Golden Apollo',
    variety: 'Melon Golden Apollo F1',
    category: 'Hortikultura Buah Eksklusif',
    block: 'Blok A2 (Sentra Kebun Inti 2.0 Ha)',
    locationDetail: 'Baris 4 • Ajir #17 (Greenhouse A2)',
    plantingDate: '15 Juli 2026',
    ageHst: '43 Hari (HST)',
    phase: 'Fase 4: Pembesaran Buah & Netting',
    healthScore: '98.4% (Sangat Sehat)',
    targetBrix: '14.5° – 16.0° Brix',
    estWeight: '2.4 Kg / Buah',
    gpsCoords: '-6.46972, 107.05831',
    farmer: 'Kang Asep (Regu A)',
    mandor: 'Pak Joko Sukardi',
    certNo: 'GAP-EXP-2026-0982 (0% Residu Kimia)',
    cardBg: 'from-[#0B3B30] via-[#09483A] to-[#04241C]',
    accentColor: '#C8E86B',
    borderColor: 'border-[#C8E86B]/40',
    icon: 'ri-focus-3-fill',
    growthStory: [
      { stage: '1. Tanam Bibit F1 (Polibag)', date: '15 Jul 2026', height: '12 cm', status: 'Selesai' },
      { stage: '2. Fase Vegetatif & Sulur Ajir', date: '04 Agu 2026', height: '65 cm', status: 'Selesai' },
      { stage: '3. Polinasi Manual Ruas 10', date: '16 Agu 2026', height: '140 cm', status: 'Selesai' },
      { stage: '4. Pembesaran Buah & Netting', date: '27 Agu 2026', height: '185 cm', status: 'Aktif (Saat Ini)' },
      { stage: '5. Panen Manis (Target Brix 15°)', date: '14 Sep 2026', height: '190 cm', status: 'Estimasi 18 Hari' },
    ],
    recentLogs: [
      { time: 'Hari ini 07:15', action: 'Irigasi Drip Nutrisi Pagi', detail: 'Nutrisi AB Mix Khusus Melon (EC 2.2, pH 6.2) 2.0L', pic: 'Kang Asep' },
      { time: '25 Agu 16:00', action: 'Semprot Pupuk Daun Mikro', detail: 'MgSO4 + Boron 2 gr/L (Cegah defisiensi magnesium daun)', pic: 'Kang Asep' },
      { time: '20 Agu 08:00', action: 'Pruning Seleksi Buah', detail: 'Menyisakan 1 buah utama ruas 11, potong tunas air liar', pic: 'Pak Joko' },
      { time: '15 Jul 07:00', action: 'Tanam & Pemasangan Barcode', detail: 'Bedengan mulsa perak, penanaman bibit sertifikat F1', pic: 'Kang Asep' },
    ],
  },
  {
    id: 'TR-002',
    code: 'SAMPLE-TR-B1-0412',
    tabLabel: '🥔 Porang Madiun',
    name: 'Pohon Sampel #2 — Porang Madiun Super',
    variety: 'Porang Madiun Super (Amorphophallus)',
    category: 'Umbi Komersial Ekspor',
    block: 'Blok B1 (Sentra Kebun Inti 2.0 Ha)',
    locationDetail: 'Baris 2 • Ajir #08 (Naungan Paranet 40%)',
    plantingDate: '10 Juni 2026',
    ageHst: '78 Hari (HST)',
    phase: 'Fase 5: Pembesaran Umbi Primer',
    healthScore: '96.2% (Sehat Optimal)',
    targetBrix: 'Kadar Glukomanan > 45%',
    estWeight: '2.8 Kg / Umbi',
    gpsCoords: '-6.46995, 107.05860',
    farmer: 'Pak Sugeng (Regu B)',
    mandor: 'Pak Joko Sukardi',
    certNo: 'GAP-EXP-2026-0983 (Sertifikasi Ekspor)',
    cardBg: 'from-[#231E12] via-[#2F2716] to-[#120F08]',
    accentColor: '#F59E0B',
    borderColor: 'border-[#F59E0B]/40',
    icon: 'ri-seedling-fill',
    growthStory: [
      { stage: '1. Tanam Katak Porang Super', date: '10 Jun 2026', height: '0 cm (Tunas)', status: 'Selesai' },
      { stage: '2. Daun Tunggal & Batang Semu', date: '01 Jul 2026', height: '40 cm', status: 'Selesai' },
      { stage: '3. Pembentukan Umbi Katak', date: '25 Jul 2026', height: '75 cm', status: 'Selesai' },
      { stage: '4. Pembesaran Umbi Primer', date: '27 Agu 2026', height: '95 cm', status: 'Aktif (Saat Ini)' },
      { stage: '5. Panen Umbi Dorman', date: '15 Des 2026', height: '110 cm', status: 'Estimasi 110 Hari' },
    ],
    recentLogs: [
      { time: '26 Agu 08:30', action: 'Penimbunan Tanah Guludan', detail: 'Penambahan tanah subur + kompos jerami 3 Kg', pic: 'Pak Sugeng' },
      { time: '18 Agu 15:00', action: 'Aplikasi Trichoderma sp.', detail: 'Kocor pangkal batang cegah busuk umbi basah', pic: 'Pak Sugeng' },
      { time: '10 Jun 07:00', action: 'Tanam Katak & QR Paspor', detail: 'Jarak tanam 50x50 cm, naungan paranet 40%', pic: 'Pak Sugeng' },
    ],
  },
  {
    id: 'TR-003',
    code: 'SAMPLE-TR-C1-0199',
    tabLabel: '🌶️ Cabai Rawit',
    name: 'Pohon Sampel #3 — Cabai Rawit Merah Ori 212',
    variety: 'Cabai Rawit Merah Ori 212',
    category: 'Sayuran Bernilai Tinggi',
    block: 'Blok C1 (Sentra Kebun Inti 2.0 Ha)',
    locationDetail: 'Baris 1 • Ajir #45 (Bedeng Terbuka Mulsa)',
    plantingDate: '01 Juni 2026',
    ageHst: '87 Hari (HST)',
    phase: 'Fase 6: Panen Petik Berkala',
    healthScore: '95.0% (Produktif)',
    targetBrix: 'Kadar Capsaicin Tinggi (Pedas Ekstrem)',
    estWeight: '1.2 Kg / Pohon (Kumulatif)',
    gpsCoords: '-6.47012, 107.05882',
    farmer: 'Kang Dayat (Regu C)',
    mandor: 'Pak Joko Sukardi',
    certNo: 'GAP-EXP-2026-0984 (Bebas Pestisida Kimia)',
    cardBg: 'from-[#2A100F] via-[#3B1514] to-[#170807]',
    accentColor: '#EF4444',
    borderColor: 'border-[#EF4444]/40',
    icon: 'ri-fire-fill',
    growthStory: [
      { stage: '1. Pindah Tanam Mulsa Perak', date: '01 Jun 2026', height: '15 cm', status: 'Selesai' },
      { stage: '2. Pembungaan & Cabang Y', date: '22 Jun 2026', height: '45 cm', status: 'Selesai' },
      { stage: '3. Pembentukan Buah Hijau', date: '15 Jul 2026', height: '70 cm', status: 'Selesai' },
      { stage: '4. Panen Merah Petik Ke-4', date: '27 Agu 2026', height: '85 cm', status: 'Aktif (Saat Ini)' },
      { stage: '5. Akhir Masa Produktif', date: '30 Okt 2026', height: '90 cm', status: 'Estimasi 65 Hari' },
    ],
    recentLogs: [
      { time: 'Hari ini 06:30', action: 'Petik Panen Merah Ke-4', detail: 'Hasil petik pohon sampel: 240 gram cabai merah grade A', pic: 'Kang Dayat' },
      { time: '24 Agu 16:30', action: 'Semprot Kalsium Nitrat', detail: 'Pencegahan patek (Antraknosa) & rontok bunga', pic: 'Kang Dayat' },
    ],
  },
  {
    id: 'TR-004',
    code: 'SAMPLE-TR-A3-0055',
    tabLabel: '🥑 Alpukat Miki',
    name: 'Pohon Sampel #4 — Alpukat Miki Super',
    variety: 'Alpukat Miki Dataran Rendah',
    category: 'Buah Tahunan Bernilai Tinggi',
    block: 'Blok A3 (Sentra Kebun Inti 2.0 Ha)',
    locationDetail: 'Pojok Barat • Ajir #01 (Border Kebun)',
    plantingDate: '10 Januari 2025',
    ageHst: '19 Bulan',
    phase: 'Fase Vegetatif Lanjut Menuju Bunga',
    healthScore: '99.1% (Sangat Prima)',
    targetBrix: 'Kadar Lemak Nabati > 18%',
    estWeight: '450 - 600 gr / Buah',
    gpsCoords: '-6.46950, 107.05790',
    farmer: 'Pak Sugeng (Regu A)',
    mandor: 'Pak Joko Sukardi',
    certNo: 'GAP-EXP-2026-0985',
    cardBg: 'from-[#0B3020] via-[#10422D] to-[#061A12]',
    accentColor: '#10B981',
    borderColor: 'border-[#10B981]/40',
    icon: 'ri-plant-fill',
    growthStory: [
      { stage: '1. Tanam Bibit Sambung Pucuk', date: '10 Jan 2025', height: '80 cm', status: 'Selesai' },
      { stage: '2. Pruning Bentuk Tajuk 1-3-9', date: '15 Agu 2025', height: '160 cm', status: 'Selesai' },
      { stage: '3. Percabangan Sekunder', date: '27 Agu 2026', height: '240 cm', status: 'Aktif (Saat Ini)' },
      { stage: '4. Induksi Pembungaan MKP', date: '10 Nov 2026', height: '260 cm', status: 'Rencana' },
    ],
    recentLogs: [
      { time: '26 Agu 10:00', action: 'Aplikasi Pupuk Kandang Kambing', detail: 'Pemberian 10 Kg pupuk kandang fermentasi melingkar kanopi', pic: 'Pak Sugeng' },
      { time: '12 Agu 08:00', action: 'Pengikatan Batang Penyangga', detail: 'Penyangga bambu anti terpaan angin kencang perkebunan', pic: 'Pak Sugeng' },
    ],
  },
];

const initialPlantScans: PlantScanRecord[] = [
  {
    id: 'SCAN-001',
    timestamp: '27 Agu 08:15',
    plantName: 'Melon Golden Apollo (Blok A2)',
    plantCode: 'SAMPLE-JGL-A2-0841',
    imageUrl: '/illustrations/harvest_grading.svg',
    healthScore: '98.4%',
    detectedIssue: 'Nihil Hama • Netting Buah Rapat & Sempurna',
    recommendation: 'Lanjutkan fertigasi drip AB Mix 2.2 mS/cm jam 15:30. Siap panen 18 hari lagi.',
    brixEst: '14.2° Brix (Grade A)',
    scannedBy: 'Kang Asep (Petani Lapangan)',
  },
  {
    id: 'SCAN-002',
    timestamp: '26 Agu 16:20',
    plantName: 'Porang Madiun Super (Blok B1)',
    plantCode: 'SAMPLE-JGL-B1-0412',
    imageUrl: '/illustrations/soil_fermentation.svg',
    healthScore: '96.2%',
    detectedIssue: 'Defisiensi Magnesium Ringan (<2% daun tua)',
    recommendation: 'Semprotkan pupuk mikro MgSO4 + Boron 2 gr/Liter air besok pagi.',
    brixEst: 'Glukomanan 48%',
    scannedBy: 'Pak Joko Sukardi (Kepala Kebun)',
  },
  {
    id: 'SCAN-003',
    timestamp: '25 Agu 09:40',
    plantName: 'Cabai Rawit Ori 212 (Blok C1)',
    plantCode: 'SAMPLE-JGL-C1-0199',
    imageUrl: '/illustrations/crop_rotation.svg',
    healthScore: '97.5%',
    detectedIssue: 'Bebas Hama Thrips & Antraknosa Nihil',
    recommendation: 'Jaga kelembapan bedengan 60% dan lakukan petik berkala buah merah.',
    brixEst: 'Kualitas Ekspor Grade A',
    scannedBy: 'Kang Dayat (Mandor Lapangan)',
  },
  {
    id: 'SCAN-004',
    timestamp: '24 Agu 14:10',
    plantName: 'Alpukat Miki Border (Blok A3)',
    plantCode: 'SAMPLE-JGL-A3-0055',
    imageUrl: '/illustrations/fertigation_maintenance.svg',
    healthScore: '99.1%',
    detectedIssue: 'Tajuk Daun Rindang & Percabangan Kokoh',
    recommendation: 'Pemberian pupuk kandang kambing fermentasi 10 Kg melingkar kanopi.',
    brixEst: 'Lemak Nabati > 18%',
    scannedBy: 'Pak Sugeng (Regu A)',
  },
];

const initialInventory: InventoryItem[] = [
  { id: 'INV-1', name: 'Pupuk NPK Mutiara 16-16-16', category: 'Pupuk', stock: 45, unit: 'Sak (50kg)', minStock: 15, location: 'Gudang Utama A', status: 'Aman' },
  { id: 'INV-2', name: 'Benih Melon Golden Apollo F1', category: 'Benih', stock: 12, unit: 'Pack (1000 biji)', minStock: 5, location: 'Ruang Suhu Dingin', status: 'Aman' },
  { id: 'INV-3', name: 'Bio-Trichoderma Hayati', category: 'Pestisida', stock: 6, unit: 'Jerigen (5L)', minStock: 10, location: 'Rak Kimia Organik', status: 'Menipis' },
  { id: 'INV-4', name: 'Mulsa Plastik Hitam Perak 120cm', category: 'Alat', stock: 18, unit: 'Roll (500m)', minStock: 8, location: 'Gudang Alat B', status: 'Aman' },
  { id: 'INV-5', name: 'Ajir Bambu Cendani 200cm', category: 'Alat', stock: 850, unit: 'Batang', minStock: 300, location: 'Shed Terbuka', status: 'Aman' },
  { id: 'INV-6', name: 'Pupuk Mikro MgSO4 + Boron', category: 'Pupuk', stock: 25, unit: 'Kg', minStock: 10, location: 'Gudang Utama A', status: 'Aman' },
];

const initialWeighbridge: WeighbridgeSlip[] = [
  {
    id: 'WB-001',
    slipNo: 'SLIP-WB-2026-092',
    date: '26 Agu 2026 14:30',
    truckNo: 'B 9182 JYR',
    driver: 'Pak Hendra (Trans Express)',
    commodity: 'Melon Golden Apollo Super',
    blockOrigin: 'Blok A1 Greenhouse (Jonggol)',
    bruto: 11420,
    tarra: 3000,
    netto: 8420,
    grade: 'Grade A',
    buyer: 'PT Segar Nusantara Retail (Supermarket Mitra)',
    pricePerKg: 35000,
    totalValue: 294700000,
  },
  {
    id: 'WB-002',
    slipNo: 'SLIP-WB-2026-091',
    date: '25 Agu 2026 11:15',
    truckNo: 'F 8820 AG',
    driver: 'Pak Ujang (Logistik Mandiri)',
    commodity: 'Cabai Rawit Merah Ori 212',
    blockOrigin: 'Blok C1 Terbuka (Jonggol)',
    bruto: 4250,
    tarra: 2800,
    netto: 1450,
    grade: 'Grade A',
    buyer: 'Pasar Induk Kramat Jati Mitra',
    pricePerKg: 42000,
    totalValue: 60900000,
  },
  {
    id: 'WB-003',
    slipNo: 'SLIP-WB-2026-090',
    date: '22 Agu 2026 16:00',
    truckNo: 'B 9044 PQR',
    driver: 'Pak Salim (Logistik Ekspor)',
    commodity: 'Porang Madiun Umbi Basah',
    blockOrigin: 'Blok B1 Paranet (Jonggol)',
    bruto: 14200,
    tarra: 4100,
    netto: 10100,
    grade: 'Grade A',
    buyer: 'PT Indo Gluco Export (Pabrik Tepung Konjac)',
    pricePerKg: 12500,
    totalValue: 126250000,
  },
];

const initialAttendance: AttendanceRecord[] = [
  { id: 'ATT-1', workerName: 'Kang Asep Sunandar', role: 'Petani Lapangan', date: '27 Agu 2026', timeIn: '06:45 WIB', gpsLocation: 'Kebun Jonggol Blok A (-6.4697, 107.0583)', status: 'HADIR' },
  { id: 'ATT-2', workerName: 'Pak Sugeng Waluyo', role: 'Petani Lapangan', date: '27 Agu 2026', timeIn: '06:50 WIB', gpsLocation: 'Kebun Jonggol Blok B (-6.4699, 107.0586)', status: 'HADIR' },
  { id: 'ATT-3', workerName: 'Pak Joko Sukardi', role: 'Kepala Kebun', date: '27 Agu 2026', timeIn: '06:30 WIB', gpsLocation: 'Kantor Lapangan Jonggol', status: 'HADIR' },
  { id: 'ATT-4', workerName: 'Irfan Maulana, S.P.', role: 'Manajer Ops', date: '27 Agu 2026', timeIn: '07:10 WIB', gpsLocation: 'Kantor Operasional Kebun', status: 'HADIR' },
];

export const initialStagePhotos: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80',
  2: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80',
  3: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=1000&q=80',
  4: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1000&q=80',
  5: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80',
  6: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80',
  7: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80',
  8: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
};

export const useSmartFarmStore = create<SmartFarmState>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      purchaseOrders: initialPOs,
      fieldPosts: initialFieldPosts,
      treeSamples: initialTreeSamples,
      plantScans: initialPlantScans,
      inventory: initialInventory,
      weighbridgeSlips: initialWeighbridge,
      attendanceRecords: initialAttendance,
      lifecycleStagePhotos: initialStagePhotos,

      // LIFECYCLE STAGE PHOTO ACTION
      updateLifecycleStagePhoto: (stepNumber, photoUrl, updatedBy, caption) =>
        set((state) => {
          const updatedPhotos = { ...state.lifecycleStagePhotos, [stepNumber]: photoUrl };
          
          // Auto create a live post in field feed as well
          const stageNames: Record<number, string> = {
            1: 'Pembersihan Lahan & Land Clearing',
            2: 'Pengolahan Tanah & Bajak Rotavator',
            3: 'Aplikasi Kapur Dolomit & Pembenah pH',
            4: 'Pembuatan Bedengan & Parit Drainase',
            5: 'Pemasangan Mulsa Plastik Hitam Perak',
            6: 'Instalasi Pipa Irigasi Tetes Presisi',
            7: 'Penanaman Bibit Unggul Golden Melon F1',
            8: 'Perawatan Harian & Telemetri IoT',
          };

          const newPost: FieldReportPost = {
            id: `POST-STAGE-${Date.now()}`,
            authorName: updatedBy || 'Petani / Mandor Lapangan',
            authorRole: 'PETANI',
            category: 'PEMBUKAAN_LAHAN',
            categoryLabel: `Tahap ${stepNumber}: ${stageNames[stepNumber] || 'Pengolahan Lahan'}`,
            blockTarget: 'Blok A (Sentra Kebun Inti)',
            timestamp: 'Baru saja',
            caption: caption || `Update foto bukti fisik terbaru untuk Tahap ${stepNumber} (${stageNames[stepNumber] || 'Pengolahan Lahan'}).`,
            photoUrls: [photoUrl],
            gpsLocation: 'Kebun Sentra Jonggol (-6.5892, 107.0541)',
            coordinates: { lat: -6.5892, lng: 107.0541 },
            likesCount: 0,
            isLiked: false,
            comments: [],
          };

          // Dispatch event for instant UI listeners
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('agrojaya-stage-photo-updated', { detail: { stepNumber, photoUrl } }));
            }, 50);
          }

          return {
            lifecycleStagePhotos: updatedPhotos,
            fieldPosts: [newPost, ...state.fieldPosts],
          };
        }),

      // TASK ACTIONS
      addTask: (taskData) =>
        set((state) => {
          const newTask: FarmTask = {
            ...taskData,
            id: `TASK-${String(Date.now()).slice(-4)}`,
            completed: false,
            createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
          };
          return { tasks: [newTask, ...state.tasks] };
        }),

      toggleTask: (taskId, photoProof, notes) =>
        set((state) => ({
          tasks: state.tasks.map((t) => {
            if (t.id === taskId) {
              const willComplete = !t.completed;
              return {
                ...t,
                completed: willComplete,
                photoProof: photoProof || t.photoProof,
                notes: notes || t.notes,
                completedAt: willComplete
                  ? new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
                  : undefined,
              };
            }
            return t;
          }),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),

      // LIVE FIELD FEED ACTIONS (WhatsApp Group Replacement)
      addFieldReportPost: (postData) =>
        set((state) => {
          const newPost: FieldReportPost = {
            ...postData,
            id: `POST-${String(Date.now()).slice(-4)}`,
            timestamp: 'Baru saja',
            likesCount: 0,
            isLiked: false,
            comments: [],
          };
          return { fieldPosts: [newPost, ...state.fieldPosts] };
        }),

      addPostComment: (postId, commentData) =>
        set((state) => ({
          fieldPosts: state.fieldPosts.map((post) => {
            if (post.id === postId) {
              const now = new Date();
              const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
              const newComment: FieldReportComment = {
                ...commentData,
                id: `C-${Date.now()}`,
                timestamp: `Hari ini ${timeStr}`,
              };
              return {
                ...post,
                comments: [...post.comments, newComment],
              };
            }
            return post;
          }),
        })),

      likePost: (postId) =>
        set((state) => ({
          fieldPosts: state.fieldPosts.map((post) => {
            if (post.id === postId) {
              const isCurrentlyLiked = !!post.isLiked;
              return {
                ...post,
                isLiked: !isCurrentlyLiked,
                likesCount: isCurrentlyLiked ? Math.max(0, post.likesCount - 1) : post.likesCount + 1,
              };
            }
            return post;
          }),
        })),

      // PO ACTIONS (4-Tier Verification & 4-Tier Photo Proof)
      createPO: (poData) =>
        set((state) => {
          const newPO: PurchaseOrder = {
            ...poData,
            id: `PO-${String(Date.now()).slice(-3)}`,
            date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: 'PENDING_FINANCE',
          };
          return { purchaseOrders: [newPO, ...state.purchaseOrders] };
        }),

      verifyPOByFinance: (poId, notes) =>
        set((state) => ({
          purchaseOrders: state.purchaseOrders.map((po) =>
            po.id === poId
              ? {
                  ...po,
                  status: 'PENDING_DIREKTUR',
                  financeVerifiedAt: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                  notes: notes || po.notes,
                }
              : po
          ),
        })),

      approvePOByDirektur: (poId, notes) =>
        set((state) => ({
          purchaseOrders: state.purchaseOrders.map((po) =>
            po.id === poId
              ? {
                  ...po,
                  status: 'PENDING_INVESTOR',
                  direkturApprovedAt: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                  notes: notes || po.notes,
                }
              : po
          ),
        })),

      authorizePOByInvestor: (poId, notes) =>
        set((state) => ({
          purchaseOrders: state.purchaseOrders.map((po) =>
            po.id === poId
              ? {
                  ...po,
                  status: 'APPROVED',
                  investorAuthorizedAt: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                  notes: notes || po.notes,
                }
              : po
          ),
        })),

      rejectPO: (poId, notes) =>
        set((state) => ({
          purchaseOrders: state.purchaseOrders.map((po) =>
            po.id === poId
              ? {
                  ...po,
                  status: 'REJECTED',
                  notes: notes || po.notes || 'Pengajuan ditolak oleh pimpinan',
                }
              : po
          ),
        })),

      updatePOPhotos: (poId, photos) =>
        set((state) => ({
          purchaseOrders: state.purchaseOrders.map((po) =>
            po.id === poId
              ? {
                  ...po,
                  ...photos,
                }
              : po
          ),
        })),

      // TREE & PLANT SCAN ACTIONS
      addTreeLog: (treeIdOrCode, logData) =>
        set((state) => ({
          treeSamples: state.treeSamples.map((tree) => {
            if (tree.id === treeIdOrCode || tree.code === treeIdOrCode) {
              const newLog: TreeLog = {
                ...logData,
                id: `LOG-${Date.now()}`,
              };
              return {
                ...tree,
                recentLogs: [newLog, ...tree.recentLogs],
              };
            }
            return tree;
          }),
        })),

      addPlantScan: (scanData) =>
        set((state) => {
          const newRecord: PlantScanRecord = {
            ...scanData,
            id: `SCAN-${String(Date.now()).slice(-4)}`,
            timestamp: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          };
          return { plantScans: [newRecord, ...state.plantScans] };
        }),

      // INVENTORY ACTIONS
      adjustStock: (itemId, qtyChange) =>
        set((state) => ({
          inventory: state.inventory.map((item) => {
            if (item.id === itemId) {
              const newStock = Math.max(0, item.stock + qtyChange);
              const status: 'Aman' | 'Menipis' | 'Kritis' =
                newStock <= item.minStock / 2 ? 'Kritis' : newStock <= item.minStock ? 'Menipis' : 'Aman';
              return { ...item, stock: newStock, status };
            }
            return item;
          }),
        })),

      // WEIGHBRIDGE ACTIONS
      addWeighbridgeSlip: (slipData) =>
        set((state) => {
          const newSlip: WeighbridgeSlip = {
            ...slipData,
            id: `WB-${String(Date.now()).slice(-4)}`,
          };
          return { weighbridgeSlips: [newSlip, ...state.weighbridgeSlips] };
        }),

      // ATTENDANCE ACTIONS
      toggleAttendance: (workerName, role, location) => {
        let isNowCheckedIn = false;
        set((state) => {
          const existing = state.attendanceRecords.find((r) => r.workerName === workerName);
          if (existing) {
            // Already checked in, remove or mark out
            isNowCheckedIn = false;
            return {
              attendanceRecords: state.attendanceRecords.filter((r) => r.workerName !== workerName),
            };
          } else {
            isNowCheckedIn = true;
            const newRecord: AttendanceRecord = {
              id: `ATT-${Date.now()}`,
              workerName,
              role,
              date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
              timeIn: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
              gpsLocation: location || 'Kebun Jonggol Inti (-6.4697, 107.0583)',
              status: 'HADIR',
            };
            return {
              attendanceRecords: [newRecord, ...state.attendanceRecords],
            };
          }
        });
        return isNowCheckedIn;
      },

      resetDemoData: () =>
        set({
          tasks: initialTasks,
          purchaseOrders: initialPOs,
          fieldPosts: initialFieldPosts,
          treeSamples: initialTreeSamples,
          plantScans: initialPlantScans,
          inventory: initialInventory,
          weighbridgeSlips: initialWeighbridge,
          attendanceRecords: initialAttendance,
        }),
    }),
    {
      name: 'smart_farm_erp_store_v1',
    }
  )
);
