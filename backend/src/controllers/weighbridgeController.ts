import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getWeighbridgeTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await prisma.weighbridge.findMany({
      include: { land: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weighbridge tickets' });
  }
};

export const createWeighbridgeTicket = async (req: Request, res: Response) => {
  try {
    const { ticketNo, truckNo, brutoKg, tarraKg, landId, grade } = req.body;
    const nettoKg = Number(brutoKg) - Number(tarraKg);
    const ticket = await prisma.weighbridge.create({
      data: {
        ticketNo,
        truckNo,
        brutoKg,
        tarraKg,
        nettoKg,
        grade: grade || 'A',
        landId,
        status: 'VERIFIED',
      },
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create weighbridge ticket' });
  }
};
