import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCycles = async (req: Request, res: Response) => {
  try {
    const cycles = await prisma.plantingCycle.findMany({
      include: { land: true, crop: true, createdBy: true },
    });
    res.json(cycles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch planting cycles' });
  }
};

export const createCycle = async (req: Request, res: Response) => {
  try {
    const { landId, cropId, startDate, createdById } = req.body;
    
    // Fetch crop to compute estimated harvest date
    const crop = await prisma.crop.findUnique({ where: { id: cropId } });
    if (!crop) return res.status(404).json({ error: 'Crop not found' });

    const start = new Date(startDate);
    const estimatedHarvest = new Date(start);
    estimatedHarvest.setDate(estimatedHarvest.getDate() + crop.cycleDays);

    const cycle = await prisma.plantingCycle.create({
      data: {
        landId,
        cropId,
        startDate: start,
        estimatedHarvest,
        createdById,
        status: 'PERSIAPAN',
      },
    });

    // Update land status to AKTIF
    await prisma.land.update({
      where: { id: landId },
      data: { status: 'AKTIF' },
    });

    res.status(201).json(cycle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create planting cycle' });
  }
};
