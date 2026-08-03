import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: { inventory: true, createdBy: true },
    });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
};

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { inventoryId, quantity, totalPrice, receiptPhoto, supplier, poNumber, createdById } = req.body;
    const purchase = await prisma.purchase.create({
      data: {
        inventoryId,
        quantity: Number(quantity),
        totalPrice: Number(totalPrice),
        receiptPhoto,
        supplier,
        poNumber,
        createdById,
        status: 'PENDING',
      },
    });
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create purchase' });
  }
};

export const updatePurchaseStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body; // 'APPROVED' or 'REJECTED'

    const purchase = await prisma.purchase.update({
      where: { id },
      data: { status },
      include: { inventory: true },
    });

    // Automatically increase inventory stock if APPROVED
    if (status === 'APPROVED') {
      await prisma.inventory.update({
        where: { id: purchase.inventoryId },
        data: {
          stock: {
            increment: purchase.quantity,
          },
        },
      });
    }

    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update purchase status' });
  }
};
