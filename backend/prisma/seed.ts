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

  // 2. Users
  const direktur = await prisma.user.create({
    data: {
      name: 'Ir. H. Ahmad Wijaya',
      email: 'direktur@agrojaya.co.id',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      role: 'DIREKTUR',
      phone: '0811-7000-111',
    },
  });

  const manager = await prisma.user.create({
    data: {
      name: 'Budi Santoso, S.P.',
      email: 'manager@agrojaya.co.id',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      role: 'MANAGER',
      phone: '0812-7000-222',
    },
  });

  const kepalaKebun = await prisma.user.create({
    data: {
      name: 'Rahmat Hidayat',
      email: 'kepala.kebun@agrojaya.co.id',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      role: 'KEPALA_KEBUN',
      phone: '0813-7000-333',
    },
  });

  const petani = await prisma.user.create({
    data: {
      name: 'Joko Susilo',
      email: 'petani@agrojaya.co.id',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      role: 'PETANI',
      phone: '0814-7000-444',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Hendra Kusuma',
      email: 'investor@agrojaya.co.id',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      role: 'INVESTOR',
      phone: '0815-7000-555',
    },
  });

  console.log('✅ Users seeded');

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
      longitude: 107.0560,
      status: 'PANEN',
    },
  });

  console.log('✅ Lands seeded (Jonggol, Bogor)');

  // 4. Crops (Komoditas)
  const anggur = await prisma.crop.create({
    data: {
      name: 'Anggur Impor Shine Muscat & Black Muscat',
      cycleDays: 120,
      sop: JSON.stringify({ perawatan: 'Penyiraman Drip Irrigation Satelit, Pemupukan NPK Humat, Naungan UV Greenhouse.' }),
      yieldFormula: JSON.stringify({ baseYieldPerHaKg: 12000 }),
    },
  });

  const sawit = await prisma.crop.create({
    data: {
      name: 'Kelapa Sawit Tenera & Jagung Hibrida',
      cycleDays: 365,
      sop: JSON.stringify({ perawatan: 'Pemupukan NPK 14 hari sekali, penyiangan gulma, pemangkasan pelepah.' }),
      yieldFormula: JSON.stringify({ baseYieldPerHaKg: 24000 }),
    },
  });

  const melon = await prisma.crop.create({
    data: {
      name: 'Melon Intanon Golden Sweet',
      cycleDays: 75,
      sop: JSON.stringify({ perawatan: 'Pencegahan hama lalat buah, fertigasi otomatis, seleksi buah tunggal.' }),
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
      cropId: sawit.id,
      startDate: new Date('2026-01-10'),
      estimatedHarvest: new Date('2026-11-20'),
      status: 'PERAWATAN',
      totalCost: 35000000,
      totalYieldKg: 45000,
      createdById: manager.id,
    },
  });

  console.log('✅ Cycles seeded');

  // 6. Inventory Items
  const invPupuk = await prisma.inventory.create({
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

  const invBibit = await prisma.inventory.create({
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

  // 7. Purchase Orders (PO)
  await prisma.purchase.create({
    data: {
      inventoryId: invPupuk.id,
      quantity: 5,
      totalPrice: 28000000,
      supplier: 'PT Pupuk Nusantara Jonggol',
      poNumber: 'PO-2026-0801',
      createdById: kepalaKebun.id,
      status: 'APPROVED',
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
