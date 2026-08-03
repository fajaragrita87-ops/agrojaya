import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCrops = async (req: Request, res: Response) => {
  try {
    const crops = await prisma.crop.findMany();
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
};

export const createCrop = async (req: Request, res: Response) => {
  try {
    const { name, cycleDays, sop, yieldFormula } = req.body;
    const crop = await prisma.crop.create({
      data: {
        name,
        cycleDays: Number(cycleDays),
        sop: sop || {},
        yieldFormula: yieldFormula || {},
      },
    });
    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create crop' });
  }
};
