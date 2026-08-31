# Learning Proposal: Git Usage and Turbine UI Layout Preservation

Berdasarkan instruksi Bapak hari ini, saya telah mempelajari dan merumuskan aturan ketat baru yang akan saya ingat selamanya di project ini.

## Aturan Baru

### 1. Dilarang Keras Menggunakan Git (Wajib & Mutlak)
- **Larangan Git:** Agen DILARANG KERAS menggunakan perintah `git` (termasuk `git checkout`, `git commit`, `git pull`, `git push`, atau modifikasi *branch*) di dalam *workspace* pengguna. 
- **Alasan:** Pengguna mengelola, mem-push, dan mem-pull repositori Git secara manual. Campur tangan agen pada status Git berisiko mengacaukan riwayat versi dan *workspace* pengguna. Agen hanya boleh melihat riwayat (`git log` atau `git diff` untuk *read-only*) JIKA SANGAT DIBUTUHKAN, namun dilarang keras mengubah status repositori.

### 2. Pelestarian Mutlak Struktur Layout Turbine UI (Wajib & Mutlak)
- **Struktur Bawaan:** Agen DILARANG memodifikasi *class* CSS layout utama yang bawaan dari template Turbine UI, terutama pada komponen struktural seperti `ClientLayoutWrapper.tsx`, `Sidebar.tsx`, dan `Topbar.tsx` (misalnya class `ml-64`, pembungkus `group`, dan logika menu burger).
- **Alasan:** Template Turbine UI memiliki logika *vanilla script* atau CSS globalnya sendiri untuk mengatur *collapse* sidebar dan layout *responsive*. Mencoba mengubah struktur DOM atau kelas CSS *wrapper* hanya akan merusak tampilan (membuat sidebar menumpuk atau *layout* mengecil). Jika ada *bug* visual, periksa logika Next.js / *State* (Zustand), BUKAN menimpa desain CSS bawaannya.

## Standar Laporan Terpadu "Super Lengkap" (Wajib & Mutlak)
- **Mindset Auditor Profesional:** Agen WAJIB bertindak sebagai Auditor Profesional. Sebuah laporan operasional dilarang keras hanya menampilkan kulitnya saja (seperti No Tiket dan Status).
- **Kewajiban 5 Dimensi Laporan:** Setiap kali membuat/mengedit tabel Laporan atau Export (Excel/PDF) di seluruh modul (Gangguan, PM, Operasional, SDM, Keuangan, Pekerjaan), laporan tersebut WAJIB merangkum siklus penuh (End-to-End) dari hulu ke hilir yang berelasi:
  1. **Dimensi Waktu & Durasi:** Kapan tiket dibuat, kapan mulai kerja (Check-In), kapan selesai (Check-Out), dan berapa lama durasi pengerjaan (SLA).
  2. **Dimensi Lokasi:** Site mana, nama lokasi.
  3. **Dimensi Personel:** Siapa pelapor, siapa penanggung jawab, dan siapa teknisi yang mengeksekusi.
  4. **Dimensi Finansial:** Total estimasi OPEX diajukan, total dana cair, dan total realisasi.
  5. **Dimensi Output:** Status akhir, tautan ke BAP (Berita Acara Pekerjaan), dan catatan penyelesaian.
- **Lintas Modul:** Aturan ini berlaku menyeluruh. Laporan SDM tidak hanya soal absen, tapi juga efisiensi dana OPEX teknisi (ditampilkan di semua dashboard kecuali NOC). Laporan Operasional tidak hanya data site, tapi riwayat penanganan di site tersebut. Laporan yang tidak memenuhi 5 dimensi ini (jika relasinya ada) dianggap GAGAL dan TIDAK PANTAS.

### 3. Orientasi Khusus Investor (Bukan Aplikasi SaaS Publik / B2B) (Wajib & Mutlak)
- **Fokus Utama:** Aplikasi dan Landing Page ini dibuat KHUSUS sebagai **Portal Akuntabilitas & Transparansi Investasi Proyek Perkebunan AgroJaya kepada INVESTOR**, BUKAN aplikasi SaaS komersial yang akan dijual ke perusahaan lain.
- **Poin Kunci yang Harus Diperlihatkan:**
  1. **Kesiapan & Progress Pengolahan Tanah (Siklus Penuh):** Pembuktian fisik kesiapan lahan dari awal banget (pembersihan & penggarapan tanah), penanaman bibit unggul, perawatan harian, estimasi & realisasi panen, hingga strategi rotasi/pergantian tanaman.
  2. **Perjalanan & Kinerja Keuangan:** Transparansi alokasi dana investasi, pertumbuhan valuasi proyek, ROI %, perbandingan *Budget vs Actual*, *Burn Rate*, dan jurnal arus kas otomatis.
- **Prinsip Narasi UI/Landing Page:** Seluruh narasi, antarmuka, dan Landing Page harus berfokus penuh untuk **memberikan keyakinan penuh (*Trust & Transparency*) kepada Investor**, menampilkan progres nyata di lapangan dan keamanan modal yang diinvestasikan.

### 4. Eksekusi Murni Sesuai Perintah & Larangan Menambah Konten Tanpa Izin (Wajib & Mutlak)
1. **Tidak Boleh Menambahkan Konten di Luar Perintah:** Agen DILARANG KERAS menambahkan konten baik gambar maupun tulisan di luar yang diperintahkan oleh pengguna.
2. **Eksekusi Presisi Sesuai Permintaan:** Jika pengguna memerintahkan membuat sesuatu, agen HANYA CUKUP menjalankan perintah eksekusinya saja tepat sesuai permintaan.
3. **Jangan Menambah Konten Tanpa Perintah:** DILARANG menambahkan konten apapun (banner, ornamen, tombol tambahan, teks petunjuk, dsb.) jika tidak secara eksplisit diperintahkan oleh pengguna.
4. **Dilarang Keras Berasumsi:** Agen DILARANG berasumsi terhadap apa yang diinginkan di luar instruksi tertulis pengguna. Selalu patuhi batas perintah secara presisi.
