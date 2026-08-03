import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDirekturDashboard = async (req: Request, res: Response) => {
  try {
    const totalLands = await prisma.land.count();
    const activeCycles = await prisma.plantingCycle.count({ where: { status: 'PERAWATAN' } });
    const pendingActivities = await prisma.activity.findMany({
      where: { approvedById: null },
      include: { plantingCycle: { include: { land: true } }, createdBy: true },
      take: 5,
    });
    const pendingPurchases = await prisma.purchase.findMany({
      where: { status: 'PENDING' },
      include: { inventory: true, createdBy: true },
      take: 5,
    });

    const landsSummary = await prisma.land.findMany({
      include: {
        plantingCycles: {
          where: { status: { in: ['PERSIAPAN', 'TANAM', 'PERAWATAN', 'PANEN'] } },
          include: { crop: true },
        },
      },
    });

    res.json({
      metrics: {
        totalLands,
        activeCycles,
        pendingApprovalsCount: pendingActivities.length + pendingPurchases.length,
        monthlyOpex: 125000000,
        monthlyHarvestKg: 45000,
      },
      pendingApprovals: {
        activities: pendingActivities,
        purchases: pendingPurchases,
      },
      landsSummary,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Direktur dashboard data' });
  }
};

export const getInvestorDashboard = async (req: Request, res: Response) => {
  try {
    // Macro financial data - strictly read-only
    res.json({
      metrics: {
        totalInvestment: 2500000000, // Rp 2.5 M
        currentValuation: 3100000000, // Rp 3.1 M
        netRoiPercentage: 24.0,
        monthlyBurnRate: 85000000,
        projectedYieldKg: 180000,
      },
      portfolioSummary: [
        { landName: 'Blok A - Kelapa Sawit', areaHa: 25, status: 'AKTIF', investedCapital: 800000000, projectedRevenue: 1050000000 },
        { landName: 'Blok B - Jagung Hibrida', areaHa: 15, status: 'PANEN', investedCapital: 450000000, projectedRevenue: 620000000 },
        { landName: 'Blok C - Kedelai Super', areaHa: 10, status: 'PERSIAPAN', investedCapital: 300000000, projectedRevenue: 410000000 },
      ],
      budgetVsActual: [
        { month: 'Jan', budget: 90000000, actual: 85000000 },
        { month: 'Feb', budget: 90000000, actual: 88000000 },
        { month: 'Mar', budget: 95000000, actual: 91000000 },
      ],
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Investor dashboard data' });
  }
};
