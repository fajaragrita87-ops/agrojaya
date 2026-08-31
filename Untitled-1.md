# AgroJaya Smart Farming — UI/UX Tahap 01

## Cakupan tahap

Tahap pertama ini menetapkan arah visual yang konsisten untuk seluruh aplikasi, kemudian menerapkannya pada dua bagian: **halaman login universal** dan **dashboard role Direktur Utama**. Desain sengaja dibuat modern, clean, tenang, dan berkelas tanpa terlalu banyak ornamen, sehingga terasa seperti produk SaaS profesional yang benar-benar dipakai tim kebun—bukan visual hasil generator AI.

Urutan role berikutnya: **Investor → Manajer Keuangan → Manajer Operasional → Kepala Kebun/Agronomis → Petani/Mandor Lapangan**.

---

## 1. Arah visual utama

### Karakter desain

AgroJaya harus terlihat seperti perpaduan antara **enterprise dashboard**, **agriculture intelligence**, dan **premium editorial layout**. Visualnya tidak boleh terlalu ramai. Fokus utama adalah keterbacaan, status operasional, dan rasa percaya.

Gunakan ruang kosong yang cukup, garis pemisah tipis, border halus, sudut komponen yang tidak terlalu bulat, serta ikon outline yang konsisten. Hindari penggunaan gradient besar, efek kaca berlebihan, ilustrasi 3D, shadow berat, badge berlebihan, dan kartu yang terlalu padat.

### Palet warna inti

| Token | Warna | Penggunaan |
|---|---|---|
| `forest-950` | `#0B2F28` | Teks utama pada area terang, sidebar, footer gelap |
| `forest-800` | `#0F5545` | Primary button, active state, link penting |
| `forest-700` | `#147A63` | Hover, ikon aktif, grafik positif |
| `sage-100` | `#E8F1EA` | Background lembut, selected card, chip |
| `lime-300` | `#C8E86B` | Aksen pertanian, label telemetry, highlight kecil |
| `cream-50` | `#FAFBF8` | Background utama halaman |
| `surface-white` | `#FFFFFF` | Card, form, modal |
| `ink-900` | `#17211E` | Heading dan angka utama |
| `ink-600` | `#5F6A65` | Body text dan deskripsi |
| `line-200` | `#DDE5DF` | Border dan divider |
| `amber-500` | `#D68B21` | Warning dan perhatian |
| `red-500` | `#C9564D` | Error, risiko, penolakan |

Gunakan warna hijau tua sebagai fondasi, bukan hijau neon. Aksen lime cukup dipakai pada label kecil, status, atau titik data penting agar tampilan tetap matang dan tidak terlihat seperti aplikasi gamifikasi.

### Tipografi

Gunakan kombinasi **DM Sans** atau **Inter** untuk interface dan **Source Serif 4** atau **Fraunces** hanya untuk headline editorial pada halaman login. Dashboard tidak boleh memakai serif pada angka atau tabel.

| Elemen | Rekomendasi |
|---|---|
| Display login | Source Serif 4, 48–64 px, weight 400 |
| Heading dashboard | DM Sans, 28–32 px, weight 650 |
| Card title | DM Sans, 14–16 px, weight 650 |
| Body | DM Sans, 14 px, line-height 1.5 |
| Metric utama | DM Sans, 28–36 px, weight 700 |
| Label kecil | DM Sans, 11–12 px, uppercase hanya bila diperlukan |
| Button | DM Sans, 14 px, weight 650 |

### Bentuk dan spacing

Gunakan sistem spacing berbasis kelipatan 4 px. Radius utama `12 px`, radius field `10 px`, radius pill hanya untuk status atau filter. Hindari semua kartu berbentuk kapsul.

- Desktop content max-width: `1440 px`.
- Sidebar desktop: `248 px`.
- Jarak antar section: `32 px`.
- Padding card: `20–24 px`.
- Border: `1 px solid #DDE5DF`.
- Shadow: sangat ringan, hanya `0 8px 24px rgba(15, 55, 42, 0.06)`.
- Mobile bottom navigation: tinggi `72 px`, aman untuk area ibu jari.

### Bahasa visual ikon dan logo

Semua ikon interface memakai gaya **outline 1.75 px**, ujung garis sedikit rounded, ukuran dasar 20–22 px. Gunakan Lucide atau Phosphor Icons agar konsisten. Jangan mencampur ikon filled, 3D, emoji, dan outline dalam satu layar.

Logo icon AgroJaya berbentuk **daun muda yang menyatu dengan tiga garis kontur lahan**. Siluet harus sederhana dan terbaca pada ukuran 20 px, 32 px, dan 64 px. Jangan menambahkan drone, traktor, globe, grafik saham, atau terlalu banyak detail di dalam logo.

---

## 2. Logo icon AgroJaya

### Konsep logo

Buat simbol persegi dengan sudut 12 px berwarna `forest-800`. Di dalamnya terdapat satu daun tegak berwarna putih yang terbentuk dari dua lengkung sederhana. Bagian bawah daun bertransformasi menjadi tiga garis kontur lahan yang naik perlahan ke kanan. Sebuah titik kecil dapat dipakai sebagai aksen benih, tetapi hanya jika tidak membuat ikon terlalu ramai.

Logo harus tetap jelas dalam tiga versi:

| Versi | Penggunaan |
|---|---|
| Ikon hijau dengan simbol putih | Header, favicon, aplikasi mobile |
| Simbol hijau tanpa container | Dokumen, watermark, avatar |
| Monokrom putih | Di atas foto hero atau background forest |

**Wordmark:** `AGROJAYA` dengan huruf kapital kecil, letter spacing ringan, tanpa slogan di area dashboard. Pada halaman login, sublabel dapat berbunyi `SMART FARMING PLATFORM`.

### Aturan penting

Jangan membuat wordmark dengan font dekoratif. Jika Trae membuat SVG, simbol harus berupa path sederhana dan responsif. Logo tidak boleh memakai clip-art, efek 3D, bevel, chrome, atau gradient warna-warni.

---

## 3. Desain halaman login universal

### Tujuan UX

Pengguna masuk melalui satu pintu, memilih workspace sesuai hak akses, kemudian login menggunakan kredensial. Halaman tidak perlu menjelaskan semua modul. Prioritaskan rasa aman, orientasi yang jelas, dan proses masuk yang cepat.

### Komposisi desktop

Gunakan split-screen `46% : 54%`.

**Panel kiri** menggunakan foto hero perkebunan pegunungan pada waktu pagi atau golden hour. Terapkan overlay forest gelap sekitar 48–58% agar teks tetap terbaca. Di bagian atas kiri tampilkan logo icon dan wordmark. Di tengah kiri tampilkan eyebrow kecil `PERTANIAN PRESISI, SETIAP HARI`, headline `Setiap petak punya cerita untuk dibaca.`, lalu deskripsi pendek. Di bawahnya tampilkan dua telemetry cards kecil dengan foto mini, bukan empat atau enam kartu.

**Panel kanan** menggunakan background `#FAFBF8`. Letakkan link `Kembali ke beranda` di kanan atas. Form berada pada lebar maksimal `540 px`, tidak terlalu melebar. Heading: `Masuk ke ruang kerja Anda.` Subheading: `Gunakan kredensial Anda untuk melanjutkan ke Portal ERP AgroJaya.`

Role selector menggunakan empat kartu ringkas dalam grid 2×2: **Direktur Utama**, **Investor**, **Manajer Keuangan**, **Manajer Operasional**. Role yang aktif memakai border `forest-700`, background `sage-100`, dan check icon kecil di pojok kanan. Role tambahan seperti Kepala Kebun dan Petani dapat muncul melalui tombol `Role lainnya` agar halaman tidak terlalu penuh.

Form berisi email, password, checkbox `Ingat perangkat ini`, link `Lupa kata sandi?`, serta primary button `Masuk sebagai [role aktif]`. Tambahkan helper keamanan satu baris di bawah button, tetapi jangan memakai paragraf panjang.

### Isi copy final

| Area | Copy |
|---|---|
| Eyebrow | `PERTANIAN PRESISI, SETIAP HARI` |
| Headline | `Setiap petak punya cerita untuk dibaca.` |
| Deskripsi | `Satukan kondisi kebun, tenaga kerja, dan keputusan budidaya dalam satu pandangan yang jernih.` |
| Login eyebrow | `SATU AKSES UNTUK SELURUH MODUL` |
| Login heading | `Masuk ke ruang kerja Anda.` |
| Login subheading | `Gunakan kredensial Anda untuk melanjutkan ke Portal ERP AgroJaya.` |
| Button | `Masuk sebagai Direktur Utama` |
| Security helper | `Data Anda dilindungi dengan autentikasi terenkripsi.` |
| Footer | `© 2026 AgroJaya Smart Farming` |

### Perilaku responsif

Pada layar tablet, ubah panel kiri menjadi banner horizontal setinggi `260–320 px` dan letakkan form di bawahnya. Pada mobile, hilangkan telemetry cards dari hero, pertahankan logo, headline maksimal dua baris, dan tampilkan role selector sebagai horizontal scroll atau stacked list. Primary button harus full-width dan memiliki tinggi minimal `48 px`.

---

## 4. Desain role pertama: Direktur Utama

### Prinsip UX role

Direktur tidak membutuhkan semua detail teknis di layar pertama. Dashboard harus menjawab lima pertanyaan dengan cepat: **berapa kondisi nilai bisnis, apa risiko hari ini, apa yang perlu disetujui, bagaimana kondisi lahan, dan apakah kegiatan lapangan berjalan sesuai rencana**.

### Struktur desktop

Gunakan app shell dengan sidebar kiri dan topbar.

**Sidebar** menampilkan logo, nama workspace `AgroJaya Smart Farming`, role badge `Direktur Utama`, lalu menu utama: `Dasbor Eksekutif`, `Otorisasi PO`, `Peta GIS`, `Siklus Lahan`, `Keuangan`, `Gudang`, `Tenaga Kerja`, `Laporan Terpadu`. Menu yang jarang dipakai ditempatkan di `Menu lainnya`.

**Topbar** berisi breadcrumb `Ruang Direktur / Dasbor Eksekutif`, pemilih periode `27 Agu 2026`, notifikasi, dan avatar. Jangan menaruh lebih dari dua tombol utama di topbar.

**Area konten** diawali judul `Selamat pagi, Bapak/Ibu Direktur.` dengan subteks `Berikut ringkasan kondisi AgroJaya hari ini.` Letakkan tombol `Unduh laporan` sebagai secondary button dan `Lihat semua alert` sebagai link.

### Hierarki konten

Baris pertama berisi empat KPI cards:

| KPI | Nilai contoh | Keterangan |
|---|---:|---|
| Nilai aset produktif | `Rp 3,10 M` | `+4,8% dari bulan lalu` |
| Kas tersedia | `Rp 486,2 Jt` | `Burn rate aman` |
| Progres lahan | `68%` | `Tahap pemeliharaan` |
| Estimasi ROI | `28–32%` | `Proyeksi berjalan` |

Baris kedua memakai layout `8 kolom + 4 kolom`:

- Kartu besar `Kondisi kebun minggu ini` berisi grafik garis sederhana untuk kelembapan, progres lahan, dan status panen. Gunakan satu grafik dengan tab/filter, bukan tiga grafik terpisah.
- Kartu `Perlu perhatian` berisi maksimal tiga alert: PO menunggu persetujuan, anomali kelembapan, dan keterlambatan tasklist. Setiap alert memiliki tingkat urgensi yang jelas.

Baris ketiga:

- `Otorisasi pengadaan` dengan tabel ringkas: nomor PO, pengaju, nilai, kategori, status verifikasi finance, CTA `Tinjau`.
- `Peta blok kebun` berupa panel peta visual dengan 3–5 blok berwarna status, bukan peta yang penuh label.
- `Aktivitas lapangan terbaru` berisi timeline pendek dari foto BAP, check-in, pembaruan gudang, dan hasil timbang.

### Interaksi penting

Klik KPI membuka detail modul. Klik alert membuka halaman yang relevan, bukan modal panjang. Pada tabel PO, primary action hanya `Tinjau`; aksi `Setujui` dan `Tolak` baru muncul di halaman detail setelah pengguna melihat bukti nota, riwayat, dan rekomendasi AI. Setiap keputusan approval wajib memiliki confirmation dialog singkat.

### Mobile version

Gunakan bottom navigation 5 item: `Dasbor`, `Approval`, `GIS`, `AI Jaya`, `Menu`. KPI cards dapat di-scroll horizontal. Bagian `Perlu perhatian` harus berada sebelum chart. Floating action button hanya untuk `Tinjau approval prioritas`, bukan untuk banyak aksi sekaligus.

---

## 5. Prompt visual untuk menghasilkan mockup UI

Gunakan prompt berikut untuk membuat referensi visual di Trae atau generator desain. Prompt ini meminta **satu layar lengkap**, bukan poster dan bukan gambar promosi.

```text
Buat visual mockup UI high-fidelity untuk aplikasi web enterprise bernama “AgroJaya Smart Farming”, layar LOGIN UNIVERSAL dengan role aktif “Direktur Utama”.

Tujuan: menampilkan portal ERP pertanian modern yang terasa nyata, profesional, tenang, dan mudah dipakai oleh pimpinan perusahaan.

Komposisi: split-screen desktop 16:9 dengan panel kiri 46% berisi foto realistis perkebunan pegunungan Indonesia pada pagi golden hour, barisan tanaman terlihat rapi, satu greenhouse kecil dan sensor cuaca terlihat samar, overlay forest green gelap agar teks putih tetap terbaca. Panel kanan 54% berwarna off-white #FAFBF8, form login maksimal 540 px, banyak whitespace, alignment rapi.

Brand: gunakan logo icon sederhana berupa satu daun putih yang menyatu dengan tiga garis kontur lahan di dalam kotak rounded warna #0F5545. Wordmark “AGROJAYA” dan sublabel kecil “SMART FARMING PLATFORM”. Jangan gunakan simbol drone, traktor, globe, grafik saham, atau logo generik.

Panel kiri memuat teks yang terbaca jelas dalam bahasa Indonesia: “PERTANIAN PRESISI, SETIAP HARI”, “Setiap petak punya cerita untuk dibaca.”, dan “Satukan kondisi kebun, tenaga kerja, dan keputusan budidaya dalam satu pandangan yang jernih.” Di bagian bawah hanya dua telemetry cards transparan dengan thumbnail kebun dan sensor tanah, label “LIVE TELEMETRY”, “132 ha terhubung”, “KELEMBAPAN”, “Optimal”.

Panel kanan memuat: “Kembali ke beranda”, eyebrow “SATU AKSES UNTUK SELURUH MODUL”, heading “Masuk ke ruang kerja Anda.”, subheading “Gunakan kredensial Anda untuk melanjutkan ke Portal ERP AgroJaya.”, role selector grid 2x2 berisi “Direktur Utama”, “Investor”, “Manajer Keuangan”, “Manajer Operasional”. Role Direktur Utama aktif dengan border hijau dan check icon. Field “Email akun”, field “Kata sandi”, checkbox “Ingat perangkat ini”, link “Lupa kata sandi?”, primary button “Masuk sebagai Direktur Utama”, helper “Data Anda dilindungi dengan autentikasi terenkripsi.”, footer “© 2026 AgroJaya Smart Farming”.

Gaya: premium SaaS, editorial agriculture, modern clean, natural, restrained, light mode, typography DM Sans untuk UI dan serif elegan hanya pada headline kiri, border tipis, radius 10–12 px, shadow sangat lembut, outline icons konsisten 1.75 px.

Hindari: layout terlalu penuh, gradient neon, glassmorphism berlebihan, kartu berlebihan, ilustrasi 3D, ikon emoji, teks acak, lorem ipsum, teks bahasa Inggris yang tidak diminta, dashboard bercampur ke halaman login, dan tampilan seperti template AI generik.
```

Untuk dashboard Direktur Utama:

```text
Buat visual mockup UI high-fidelity untuk dashboard desktop 1440x1024 aplikasi enterprise “AgroJaya Smart Farming”, role “Direktur Utama”.

Gunakan app shell profesional dengan sidebar kiri 248 px berwarna #0B2F28, topbar putih, dan canvas utama off-white #FAFBF8. Logo icon berupa daun putih yang menyatu dengan tiga garis kontur lahan. Gaya harus modern, clean, tenang, realistis, dan terasa seperti software produksi yang digunakan perusahaan agrikultur.

Sidebar menampilkan: “AGROJAYA”, “SMART FARMING PLATFORM”, badge “Direktur Utama”, menu “Dasbor Eksekutif”, “Otorisasi PO”, “Peta GIS”, “Siklus Lahan”, “Keuangan”, “Gudang”, “Tenaga Kerja”, “Laporan Terpadu”. Menu aktif memiliki background hijau sedikit lebih terang dan indikator garis lime kecil.

Konten utama menampilkan breadcrumb “Ruang Direktur / Dasbor Eksekutif”, judul “Selamat pagi, Bapak/Ibu Direktur.”, subteks “Berikut ringkasan kondisi AgroJaya hari ini.”, tombol “Unduh laporan”, serta date picker “27 Agu 2026”.

Buat empat KPI cards yang rapi: “Nilai aset produktif” dengan “Rp 3,10 M” dan “+4,8% dari bulan lalu”; “Kas tersedia” dengan “Rp 486,2 Jt” dan “Burn rate aman”; “Progres lahan” dengan “68%” dan “Tahap pemeliharaan”; “Estimasi ROI” dengan “28–32%” dan “Proyeksi berjalan”.

Buat section utama dua kolom: kartu besar “Kondisi kebun minggu ini” berisi satu line chart sederhana dengan legenda “Kelembapan”, “Progres lahan”, “Status panen”; kartu kecil “Perlu perhatian” berisi tiga alert ringkas: “2 PO menunggu persetujuan”, “Kelembapan Blok A2 di bawah ambang”, “3 tasklist terlambat”.

Di bawahnya tampilkan tabel ringkas “Otorisasi pengadaan” dengan kolom “No. PO”, “Pengaju”, “Nilai”, “Verifikasi”, “Aksi” dan tombol “Tinjau”, lalu panel “Peta blok kebun” dengan beberapa blok status hijau, amber, dan merah yang sederhana.

Gunakan palet #0B2F28, #0F5545, #147A63, #E8F1EA, #C8E86B, #FAFBF8, #FFFFFF, teks #17211E, border #DDE5DF. Gunakan DM Sans/Inter, ikon outline 1.75 px, radius 12 px, whitespace cukup, shadow halus.

Hindari dashboard yang terlalu padat, grafik dekoratif tanpa makna, kartu dengan gradient, neon green, globe 3D, peta penuh label, emoji, avatar berlebihan, lorem ipsum, dan visual AI yang terlalu futuristik.
```

---

## 6. Prompt implementasi untuk Trae

Salin prompt berikut ke Trae untuk mulai mengimplementasikan tahap pertama. Jika proyek sudah memiliki struktur kode, minta Trae membaca struktur yang ada dan tidak membuat ulang tanpa alasan.

```text
Anda adalah senior frontend engineer dan UI engineer. Bangun tahap pertama aplikasi web AgroJaya Smart Farming berdasarkan spesifikasi berikut.

SCOPE TAHAP INI
1. Login universal responsive.
2. Role selector dengan role aktif Direktur Utama.
3. Dashboard Direktur Utama responsive.
4. Buat logo icon AgroJaya sebagai SVG sederhana, bukan gambar raster.

ARAH DESAIN
Gunakan visual enterprise agriculture yang modern, clean, calm, dan premium. Hindari tampilan template AI: jangan gunakan gradient besar, glassmorphism berlebihan, kartu terlalu bulat, emoji, 3D illustration, atau terlalu banyak dekorasi. Gunakan whitespace dan hierarchy yang kuat.

DESIGN TOKENS
Primary dark: #0B2F28
Primary: #0F5545
Primary hover: #147A63
Accent: #C8E86B
Soft green: #E8F1EA
Canvas: #FAFBF8
Surface: #FFFFFF
Text: #17211E
Muted text: #5F6A65
Border: #DDE5DF
Warning: #D68B21
Danger: #C9564D
Radius card: 12px
Radius field: 10px
Border: 1px solid #DDE5DF
Shadow: 0 8px 24px rgba(15,55,42,0.06)

LOGO
Buat komponen LogoAgroJaya menggunakan inline SVG. Simbolnya satu daun tegak yang menyatu dengan tiga garis kontur lahan. Gunakan warna putih pada dark background dan #0F5545 pada light background. Harus tetap terbaca pada ukuran 20, 32, dan 64 px. Wordmark “AGROJAYA” memakai sans-serif dengan letter spacing ringan; sublabel “SMART FARMING PLATFORM”.

LOGIN PAGE
Desktop split screen 46/54. Panel kiri memakai background image landscape perkebunan; jika asset belum tersedia, siapkan placeholder path /assets/agrojaya-farm-hero.jpg dan gunakan overlay #0B2F28 dengan opacity sekitar 0.55. Panel kanan background #FAFBF8.

Render copy berikut persis:
- PERTANIAN PRESISI, SETIAP HARI
- Setiap petak punya cerita untuk dibaca.
- Satukan kondisi kebun, tenaga kerja, dan keputusan budidaya dalam satu pandangan yang jernih.
- SATU AKSES UNTUK SELURUH MODUL
- Masuk ke ruang kerja Anda.
- Gunakan kredensial Anda untuk melanjutkan ke Portal ERP AgroJaya.
- Direktur Utama
- Investor
- Manajer Keuangan
- Manajer Operasional
- Email akun
- Kata sandi
- Ingat perangkat ini
- Lupa kata sandi?
- Masuk sebagai Direktur Utama
- Data Anda dilindungi dengan autentikasi terenkripsi.
- © 2026 AgroJaya Smart Farming

Role selector adalah grid 2x2 desktop dan stacked/horizontal scroll pada mobile. Direktur Utama aktif dengan border #147A63, background #E8F1EA, serta check icon. Button primary full-width pada form. Pastikan tab order, focus state, aria-label, dan kontras teks diperhatikan.

DASHBOARD DIREKTUR UTAMA
Gunakan sidebar desktop 248 px dan bottom navigation 5 item pada mobile. Menu: Dasbor Eksekutif, Otorisasi PO, Peta GIS, Siklus Lahan, Keuangan, Gudang, Tenaga Kerja, Laporan Terpadu. Konten utama berisi greeting, date picker, empat KPI cards, chart kondisi kebun, panel alert, tabel otorisasi pengadaan, peta blok kebun placeholder, dan aktivitas terbaru.

Gunakan data mock yang realistis:
- Nilai aset produktif: Rp 3,10 M
- Kas tersedia: Rp 486,2 Jt
- Progres lahan: 68%
- Estimasi ROI: 28–32%
- 2 PO menunggu persetujuan
- Kelembapan Blok A2 di bawah ambang
- 3 tasklist terlambat

INTERAKSI
KPI dapat diklik menuju detail modul. Alert dapat diklik. Tombol Tinjau pada tabel membuka halaman/detail approval atau modal ringkas berisi nomor PO, pengaju, nilai, bukti nota, status verifikasi finance, tombol Setujui dan Tolak. Jangan langsung menyetujui tanpa confirmation dialog.

KUALITAS IMPLEMENTASI
Pisahkan komponen reusable: LogoAgroJaya, RoleCard, TextField, Button, MetricCard, AlertItem, Sidebar, Topbar, BottomNav, ApprovalTable, FarmMapPanel. Gunakan data array untuk menu, KPI, alert, dan PO agar mudah diganti. Jangan menaruh semua UI dalam satu file. Pastikan tidak ada horizontal overflow pada mobile. Jalankan lint/build dan perbaiki error sebelum selesai.
```

---

## 7. Checklist pemeriksaan tahap pertama

| Area | Kriteria lulus |
|---|---|
| Brand | Logo icon terbaca dalam ukuran kecil dan tidak terlihat seperti clip-art |
| Visual | Warna hijau tua, off-white, dan lime seimbang; tidak neon |
| Login | Fokus langsung ke pemilihan role dan form; tidak penuh dekorasi |
| Dashboard | Direktur dapat melihat KPI, alert, approval, dan kondisi kebun dalam satu layar |
| Responsif | Login dan dashboard tetap usable pada lebar 375 px |
| Aksesibilitas | Focus state, label form, tombol, dan kontras tersedia |
| UX approval | Setujui/Tolak tidak menjadi aksi instan tanpa konfirmasi |
| Konsistensi | Ikon outline, spacing, radius, border, dan typography konsisten |

Tahap berikutnya dimulai dari desain **role Investor**, dengan penekanan pada transparansi modal, proteksi modal, bukti fisik 8 tahap lahan, dan proyeksi portofolio tanpa membuat tampilan terasa seperti aplikasi trading.

