---
name: agrojaya-turbine
description: Mematuhi aturan strict Turbine UI untuk project AgroJaya ERP, termasuk laporan super lengkap dan tidak memodifikasi CSS layout bawaan.
---

# AgroJaya Turbine UI Skill

Skill ini **wajib** digunakan selama pengerjaan project AgroJaya ERP.

## Aturan Komponen UI (Turbine UI)
1. **Light Mode Only**: Tidak boleh ada dark mode.
2. **Strict Components**: Wajib menggunakan komponen Turbine (`<x-t-card>`, `<x-t-table>`, `<x-t-button>`, dll). Dilarang keras membuat elemen custom dengan utility class Tailwind biasa (misal `<div class="bg-white shadow rounded-lg">`).
3. **Pemisahan Dashboard**: Dashboard Direktur (akses penuh + action buttons) dan Investor (read-only) wajib dipisah.
4. **Pelestarian Layout Absolut**: Jangan memodifikasi struktur class CSS utama bawaan Turbine UI (terutama layout pembungkus sidebar, topbar, dan content area seperti class `ml-64`).

## Standar Laporan (Super Lengkap)
Berperanlah sebagai auditor profesional. Saat membuat/mengedit tabel laporan atau export (PDF/Excel), pastikan selalu mencakup 5 dimensi:
1. **Waktu & Durasi**
2. **Lokasi**
3. **Personel**
4. **Finansial**
5. **Output (Status, BAP, dll)**

## Aturan Git
Dilarang menggunakan command Git yang memodifikasi repositori (`commit`, `push`, `pull`, `checkout`).
