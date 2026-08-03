import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getHarvests = async (req: Request, res: Response) => {
  try {
    const harvests = await prisma.harvest.findMany({
      include: { plantingCycle: true, createdBy: true },
    });
    res.json(harvests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch harvests' });
  }
};

export const createHarvest = async (req: Request, res: Response) => {
  try {
    const { plantingCycleId, date, weightKg, qualityGrade, priceSold, buyer, createdById } = req.body;
    const harvest = await prisma.harvest.create({
      data: {
        plantingCycleId,
        date: new Date(date),
        weightKg: Number(weightKg),
        qualityGrade,
        priceSold: priceSold ? Number(priceSold) : null,
        buyer,
        createdById,
      },
    });

    // Record automatic financial revenue if priceSold is present
    if (priceSold) {
      await prisma.financial.create({
        data: {
          plantingCycleId,
          category: 'LAIN',
          amount: Number(priceSold) * Number(weightKg),
          type: 'REVENUE',
          date: new Date(date),
          note: `Hasil penjualan panen grade ${qualityGrade}`,
        },
      });
    }

    res.status(201).json(harvest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to record harvest' });
  }
};
