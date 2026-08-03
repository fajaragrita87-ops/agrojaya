import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await prisma.activity.findMany({
      include: { plantingCycle: true, createdBy: true, approvedBy: true },
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const { plantingCycleId, type, description, date, cost, photoUrl, createdById } = req.body;
    const activity = await prisma.activity.create({
      data: {
        plantingCycleId,
        type,
        description,
        date: new Date(date),
        cost: cost ? Number(cost) : null,
        photoUrl,
        createdById,
      },
    });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
};

export const approveActivity = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { approvedById } = req.body;
    const activity = await prisma.activity.update({
      where: { id },
      data: {
        approvedById,
        approvedAt: new Date(),
      },
    });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve activity' });
  }
};
