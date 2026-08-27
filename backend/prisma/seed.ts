import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting AgroJaya ERP Database Seeding (Jonggol, Bogor)...');

  // 1. Clean existing records
  await prisma.attendance.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.financial.deleteMany({});
  await prisma.harvest.deleteMany({});
  await prisma.purchase.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.activity.deleteMany({});
  await prisma.plantingCycle.deleteMany({});
  await prisma.weighbridge.deleteMany({});
  await prisma.crop.deleteMany({});
  await prisma.land.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Users (All 6 Roles with Standard AgroJaya Credentials)
  const direktur = await prisma.user.create({
    data: {
      name: 'Ir. H. Ahmad Wijaya',
      email: 'direktur@agrojaya.com',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      role: 'DIREKTUR',
      phone: '0811-7000-111',
    },
  });

  const investor = await prisma.user.create({
    data: {
      name: 'Hendra Kusuma, B.Sc.',
      email: 'investor@agrojaya.com',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      role: 'INVESTOR',
      phone: '0815-7000-555',
    },
  });

  const finance = await prisma.user.create({
    data: {
      name: 'Ratna Dewi, S.E., Ak.',
      email: 'finance@agrojaya.com',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      role: 'FINANCE',
      phone: '0812-9876-5432',
    },
  });

  const manager = await prisma.user.create({
    data: {
      name: 'Budi Santoso, S.P.',
      email: 'manager@agrojaya.com',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      role: 'MANAGER',
      phone: '0812-7000-222',
    },
  });

  const kepalaKebun = await prisma.user.create({
    data: {
      name: 'Rahmat Hidayat',
      email: 'kepalakebun@agrojaya.com',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      role: 'KEPALA_KEBUN',
      phone: '0813-7000-333',
    },
  });

  const petani = await prisma.user.create({
    data: {
      name: 'Joko Susilo',
      email: 'petani@agrojaya.com',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      role: 'PETANI',
      phone: '0814-7000-444',
    },
  });

  console.log('✅ 6 Core Roles Seeded (DIREKTUR, INVESTOR, FINANCE, MANAGER, KEPALA_KEBUN, PETANI)');

  // 3. Lands (Jonggol, Bogor)
  const landA1 = await prisma.land.create({
    data: {
      name: 'Blok A1 - Kebun Anggur Impor & Green House (1000m²)',
      areaHa: 0.1,
      soilType: 'Humus Organik Greenhouse Jonggol',
      latitude: -6.4715,
      longitude: 107.0535,
      status: 'AKTIF',
    },
  });

  const landA2 = await prisma.land.create({
    data: {
      name: 'Blok A2 - Tanam Hibrida Utama (2 Hektar)',
      areaHa: 2.0,
      soilType: 'Latosol Subur Jonggol Bogor',
      latitude: -6.4697,
      longitude: 107.0544,
      status: 'AKTIF',
    },
  });

  const landB1 = await prisma.land.create({
    data: {
      name: 'Blok B1 - Hortikultura Melon Premium (5000m²)',
      areaHa: 0.5,
      soilType: 'Aluvial Organik Jonggol',
      latitude: -6.4680,
      longitude: 107.056,
      status: 'PANEN',
    },
  });

  console.log('✅ Lands seeded (Jonggol, Bogor)');

  // 4. Crops (Komoditas Unggulan)
  const porang = await prisma.crop.create({
    data: {
      name: 'Umbi Porang Kualitas Ekspor',
      cycleDays: 240,
      sop: JSON.stringify({
        perawatan: 'Pembuatan guludan, pemupukan pupuk kandang/kompos, penyiangan gulma rutin, dan menjaga kelembaban tanah.',
      }),
      yieldFormula: JSON.stringify({ baseYieldPerHaKg: 20000 }),
    },
  });

  const anggur = await prisma.crop.create({
    data: {
      name: 'Anggur Impor Shine Muscat & Black Muscat',
      cycleDays: 120,
      sop: JSON.stringify({
        perawatan: 'Penyiraman Drip Irrigation Satelit, Pemupukan NPK Humat, Naungan UV Greenhouse.',
      }),
      yieldFormula: JSON.stringify({ baseYieldPerHaKg: 12000 }),
    },
  });

  const melon = await prisma.crop.create({
    data: {
      name: 'Melon Intanon Golden Sweet',
      cycleDays: 75,
      sop: JSON.stringify({
        perawatan: 'Pencegahan hama lalat buah, fertigasi otomatis, seleksi buah tunggal.',
      }),
      yieldFormula: JSON.stringify({ baseYieldPerHaKg: 15000 }),
    },
  });

  console.log('✅ Crops seeded');

  // 5. Planting Cycles
  const cycleA1 = await prisma.plantingCycle.create({
    data: {
      landId: landA1.id,
      cropId: anggur.id,
      startDate: new Date('2026-02-01'),
      estimatedHarvest: new Date('2026-06-01'),
      status: 'PERAWATAN',
      totalCost: 15000000,
      totalYieldKg: 3500,
      createdById: manager.id,
    },
  });

  const cycleA2 = await prisma.plantingCycle.create({
    data: {
      landId: landA2.id,
      cropId: porang.id,
      startDate: new Date('2026-01-10'),
      estimatedHarvest: new Date('2026-09-10'),
      status: 'PERAWATAN',
      totalCost: 35000000,
      totalYieldKg: 40000,
      createdById: manager.id,
    },
  });

  console.log('✅ Cycles seeded');

  // 6. Inventory Items
  await prisma.inventory.create({
    data: {
      name: 'Pupuk NPK 16-16-16 & Kapur Dolomit',
      category: 'PUPUK',
      stock: 12.5,
      unit: 'ton',
      supplier: 'PT Pupuk Nusantara Jonggol',
      pricePerUnit: 18000000,
      minStock: 3.0,
    },
  });

  await prisma.inventory.create({
    data: {
      name: 'Bibit Anggur Impor Shine Muscat',
      category: 'BIBIT',
      stock: 450,
      unit: 'pohon',
      supplier: 'Balai Benih Hortikultura Bogor',
      pricePerUnit: 85000,
      minStock: 100,
    },
  });

  console.log('✅ Inventory seeded');

  // 7. Purchase Orders (PO 3-Layer)
  await prisma.purchase.create({
    data: {
      poNumber: 'PO-2026-0804-01',
      itemName: '10 Ton Pupuk NPK Granul Presisi & Kapur Dolomit',
      category: 'PUPUK & KAPUR',
      targetLand: 'Blok A2 - Tanam Hibrida Utama (2.0 Ha Jonggol)',
      quantity: 10,
      unitPriceRp: 2800000,
      totalPrice: 28000000,
      usageTargetDate: '10 Aug 2026',
      usageDetails: 'Pemupukan NPK susulan fase pertumbuhan vegetatif tanaman hibrida 2.0 Ha Jonggol. Dosis 250gram/titik sesuai SOP-PUPUK-02.',
      status: 'PENDING_FINANCE',
      createdById: manager.id,
    },
  });

  await prisma.purchase.create({
    data: {
      poNumber: 'PO-2026-0804-02',
      itemName: '500 Meter Selang Drip Irigasi Tetes & Nozzle Satelit',
      category: 'PERALATAN & SPAREPART',
      targetLand: 'Blok A1 - Kebun Anggur Impor (1.000m² Jonggol)',
      quantity: 500,
      unitPriceRp: 29000,
      totalPrice: 14500000,
      usageTargetDate: '12 Aug 2026',
      usageDetails: 'Perluasan modul fertigasi tetes otomatis.',
      status: 'PENDING_DIREKTUR',
      financeVerifiedAt: new Date('2026-08-03T14:20:00Z'),
      createdById: manager.id,
    },
  });

  await prisma.purchase.create({
    data: {
      poNumber: 'PO-2026-0804-03',
      itemName: '500 Batang Bibit Anggur Impor Shine Muscat',
      category: 'BIBIT UNGGUL',
      targetLand: 'Blok A1 - Kebun Anggur Impor (1.000m² Jonggol)',
      quantity: 500,
      unitPriceRp: 70000,
      totalPrice: 35000000,
      usageTargetDate: '15 Aug 2026',
      usageDetails: 'Penyulaman bibit unggul varietas Shine Muscat.',
      status: 'PENDING_INVESTOR',
      financeVerifiedAt: new Date('2026-08-02T14:00:00Z'),
      direkturApprovedAt: new Date('2026-08-03T09:15:00Z'),
      createdById: manager.id,
    },
  });

  console.log('✅ Purchases (PO) seeded');

  // 8. Weighbridge Tickets
  await prisma.weighbridge.create({
    data: {
      ticketNo: 'TKG-JNG-0801',
      truckNo: 'F 8812 BGR',
      brutoKg: 4500,
      tarraKg: 1500,
      nettoKg: 3000,
      grade: 'A',
      status: 'VERIFIED',
      landId: landA1.id,
    },
  });

  console.log('✅ Weighbridge seeded');

  // 9. Financials (Cashflow Ledger)
  await prisma.financial.create({
    data: {
      plantingCycleId: cycleA1.id,
      category: 'LAIN',
      amount: 42000000,
      type: 'REVENUE',
      date: new Date('2026-06-20'),
      note: 'Penjualan Perdana Anggur Impor Shine Muscat Jonggol',
    },
  });

  await prisma.financial.create({
    data: {
      plantingCycleId: cycleA2.id,
      category: 'PUPUK',
      amount: 18000000,
      type: 'EXPENSE',
      date: new Date('2026-08-01'),
      note: 'Pengadaan Pupuk NPK & Dolomit Kebun Jonggol (PO-2026-0801)',
    },
  });

  console.log('✅ Financials seeded');

  // 10. Attendance (PWA)
  await prisma.attendance.create({
    data: {
      userId: petani.id,
      checkIn: new Date('2026-08-03T07:30:00Z'),
      checkOut: new Date('2026-08-03T16:30:00Z'),
      location: 'Greenhouse Jonggol - GPS Lat -6.4715, Long 107.0535',
      dailyWage: 150000,
      status: 'PRESENT',
    },
  });

  console.log('🎉 AgroJaya ERP Jonggol Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
