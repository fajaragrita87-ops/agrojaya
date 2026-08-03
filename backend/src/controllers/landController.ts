import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLands = async (req: Request, res: Response) => {
  try {
    const lands = await prisma.land.findMany();
    res.json(lands);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lands' });
  }
};

export const createLand = async (req: Request, res: Response) => {
  try {
    const { name, areaHa, soilType, latitude, longitude, status } = req.body;
    const land = await prisma.land.create({
      data: {
        name,
        areaHa: Number(areaHa),
        soilType,
        latitude: latitude ? Number(latitude) : -6.4697,
        longitude: longitude ? Number(longitude) : 107.0544,
        status: status || 'KOSONG',
      },
    });
    res.status(201).json(land);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create land' });
  }
};

export const updateLandStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;
    const land = await prisma.land.update({
      where: { id },
      data: { status },
    });
    res.json(land);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update land status' });
  }
};
