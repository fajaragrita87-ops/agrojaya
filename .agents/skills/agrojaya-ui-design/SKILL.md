---
name: agrojaya-ui-design
description: Panduan rahasia (Secret Folder) mengenai spesifikasi, komponen CSS, palet warna, tipografi, dan gaya visual AgroJaya ERP (Hybrid Corpox + Turbine UI).
---

# AgroJaya ERP UI/UX Design System (Secret Folder)

Skill ini adalah panduan rahasia yang **wajib dirujuk** oleh agen setiap kali akan mendesain, memodifikasi, atau merestrukturisasi halaman antarmuka (UI) di aplikasi AgroJaya ERP. 

## 1. Konsep Desain (Hybrid Framework)
Aplikasi ini TIDAK menggunakan murni satu framework, melainkan perpaduan hibrida dari:
- **Turbine UI**: Sebagai kerangka/pondasi tulang (Layout, Sidebar, Topbar).
- **Corpox (Financial Theme)**: Sebagai kulit/gaya visual komponen (Card, Tombol, Tabel) agar terlihat elegan dan premium.
- **Bootstrap 5**: Digunakan untuk sistem grid (`col-md-4`, `row`, `g-3`, dll) dan form (`form-control`, `form-select`).
- **Tailwind CSS**: Digunakan untuk utilitas mikro (margin, padding, text-align, warna teks custom).

## 2. Palet Warna (Color System)
- **Primary (Emerald)**: `#059669` (Hijau zamrud korporat) -> digunakan untuk tombol CTA dan status sukses.
- **Primary Hover**: `#047857` -> efek hover tombol.
- **Primary Light**: `#ecfdf5` -> latar belakang lencana (badge) dan ikon boks.
- **Secondary (Ocean)**: `#0284c7` -> warna biru korporat alternatif.
- **Warning/Amber**: `#d97706` -> warna peringatan atau status "Pending".
- **Background Utama**: `#f8fafc` (Abu-abu sangat terang untuk kanvas aplikasi).

## 3. Tipografi & Ikon (Typography)
- **Teks Utama (Paragraf, Tabel, Form)**: `Inter`
- **Teks Judul Besar (H1/H2)**: `Outfit`
- **Ikon UI**: Menggunakan **Remix Icons** (`ri-nama-ikon`) dan **Feather Icons**.

## 4. Komponen CSS Wajib (Dari Corpox Theme)

Jika Anda (agen) diminta membuat elemen baru, **WAJIB** menggunakan kelas-kelas berikut agar senada dengan halaman lain:

### A. Kotak Kartu (Card Boxes)
Jangan gunakan utility tailwind mentah untuk kartu utama. Gunakan kelas ini:
```html
<div className="card-box p-4 rounded-4 border shadow-sm">
  <!-- Konten -->
</div>
```
*Catatan: Class `.card-box` memberikan efek shadow lembut dan jika ditambah `.card-box-hover`, kartu akan sedikit terangkat saat disentuh kursor.*

### B. Tombol Gradien Premium (Gradient Buttons)
Jangan gunakan tombol standar. Gunakan:
```html
<button className="btn btn-primary-gradient font-weight-bold rounded-3 shadow-xs">
  Simpan Data
</button>
```

### C. Ikon Aksen (Icon Boxes)
Untuk memberikan ikon di pojok kartu ringkasan atau judul:
```html
<div className="corpox-icon-box emerald">
  <i className="ri-leaf-line"></i>
</div>
```
*(Varian warna: `emerald`, `blue`, `amber`).*

### D. Lencana Status (Status Badges)
Gunakan lencana modern berbentuk kapsul (pill):
```html
<span className="tmp-badge-card success">
  DISETUJUI
</span>
```
*(Varian class: `success`, `primary`, `warning`).*

## 5. Pesan Penting
Setiap kali menambahkan halaman baru, periksa dan tiru struktur Header Banner dari halaman `CropsPage.tsx` atau `PurchaseOrderInventoryShowcase.tsx` untuk menjaga konsistensi posisi judul dan lencana peran.
