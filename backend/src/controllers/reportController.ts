import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const get5DReport = async (req: Request, res: Response) => {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        plantingCycle: {
          include: { land: true, crop: true },
        },
        createdBy: true,
        approvedBy: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Format 5 Dimensions
    const report5D = activities.map((act: any) => {
      const createdDate = act.createdAt;
      const approvedDate = act.approvedAt;
      const slaMinutes = approvedDate
        ? Math.round((approvedDate.getTime() - createdDate.getTime()) / (1000 * 60))
        : null;

      return {
        id: act.id,
        // 1. Dimensi Waktu & Durasi (SLA)
        timeDimension: {
          createdAt: createdDate,
          executionDate: act.date,
          approvedAt: approvedDate,
          slaDurationMinutes: slaMinutes,
        },
        // 2. Dimensi Lokasi
        locationDimension: {
          landName: act.plantingCycle?.land?.name || 'Unassigned',
          soilType: act.plantingCycle?.land?.soilType || 'N/A',
        },
        // 3. Dimensi Personel
        personnelDimension: {
          reporterName: act.createdBy?.name || 'System',
          approverName: act.approvedBy?.name || 'Belum Disetujui',
          role: act.createdBy?.role || 'PETANI',
        },
        // 4. Dimensi Finansial
        financialDimension: {
          opexEstimateProposed: act.cost || 0,
          disbursedAmount: act.approvedById ? (act.cost || 0) : 0,
          realizationCost: act.cost || 0,
        },
        // 5. Dimensi Output & Status
        outputDimension: {
          activityType: act.type,
          description: act.description,
          status: act.approvedById ? 'APPROVED' : 'PENDING',
          photoUrl: act.photoUrl,
          bapDocumentUrl: act.approvedById ? `/bap/BAP-${act.id.slice(0, 8)}.pdf` : null,
        },
      };
    });

    res.json(report5D);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate 5D report' });
  }
};

export const getFinancialReport = async (req: Request, res: Response) => {
  try {
    const financials = await prisma.financial.findMany({
      include: { plantingCycle: { include: { land: true, crop: true } } },
    });

    let totalExpense = 0;
    let totalRevenue = 0;

    financials.forEach((item: any) => {
      if (item.type === 'EXPENSE') totalExpense += Number(item.amount);
      if (item.type === 'REVENUE') totalRevenue += Number(item.amount);
    });

    res.json({
      summary: {
        totalRevenue,
        totalExpense,
        netProfit: totalRevenue - totalExpense,
      },
      transactions: financials,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate financial report' });
  }
};

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.auditLog.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
};
