# AgroJaya ERP — Progress Checklist

## Phase 1: Core Foundation & Turbine UI Architecture
- [x] Integrate Remix Icons CDN (`remixicon@4.2.0`) in `index.html`.
- [x] Preserve Turbine UI layout structure (`h-[4.55rem]` topbar header, `w-64` sidebar, `pt-20` main wrapper).
- [x] Light Mode Only enforcement.
- [x] Database schema & Prisma setup (`User`, `Land`, `Crop`, `PlantingCycle`, `Activity`, `InventoryItem`, `Purchase`, `Harvest`, `Attendance`, `Financial`, `Weighbridge`).

## Phase 2: Operations & GIS Mapping
- [x] Interactive Leaflet GIS Map with Esri Satellite HD & OpenStreetMap mode switcher.
- [x] Real-time map drag, pan, scroll, and click event listeners for auto-detecting Latitude & Longitude coordinates.
- [x] Geocoding & GPS Search box for locations and raw Lat/Lng coordinates.
- [x] Interactive markers for plantation blocks (`Blok A1`, `Blok A2`, `Blok B1`).
- [x] Form input fields for Latitude & Longitude in `LandsPage.tsx`.

## Phase 3: HR, Payroll & Financial Ledger
- [x] Mobile PWA Attendance Check-in/out with GPS location capture.
- [x] Automatic Daily Wage & Payroll calculation.
- [x] Automatic Financial Journaling & Cashflow Ledger.

## Phase 4: RBAC & Pemisahan Peran 5 Mode
- [x] `RoleContext` global state management with localStorage persistence.
- [x] `DEV MODE ROLE:` dropdown selector in `Topbar.tsx` allowing instant switching between 5 roles: `DIREKTUR`, `INVESTOR`, `MANAGER`, `KEPALA_KEBUN`, `PETANI`.
- [x] Dynamic menu filtering in `Sidebar.tsx` matching `/Untitled-1` matrix.
- [x] Strict Read-Only protection for `INVESTOR` role (all edit/delete/approve action buttons hidden).

## Phase 5: Turbine UI Chart.js Analytics & Enterprise Features
- [x] `TurbineChart.tsx` (Line Chart, Bar Chart, Donut Chart) matching `chartjs.html`.
- [x] Investor Dashboard analytics (Valuation Growth, Commodity Allocation, Burn Rate).
- [x] Direktur & Manager Dashboard analytics (Revenue vs Expense, OPEX Breakdown, Harvest Yield per Block).
- [x] Timbang PKS & Taksasi Tonase Panen (Weighbridge - Inspired by OWL-Plantation & eKomoditi).
- [x] Costing HPP Engine (Cost per Hectare & Cost per Kilogram - Inspired by Odoo & SAP).
- [x] Live Weather & Fertigation Alert Widget in `Topbar.tsx` (Inspired by Cropin & BMKG).

## Phase 6: Build & Production Readiness
- [x] Clean compilation for Frontend (`npm run build` -> 0 errors).
- [x] Clean compilation for Backend (`npm run build` -> 0 errors).
- [x] Backend Express Server active on `http://localhost:5000`.
- [x] Frontend Vite Dev Server active on `http://localhost:5173`.
