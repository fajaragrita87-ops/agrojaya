import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: { inventory: true, createdBy: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
};

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const {
      inventoryId,
      itemName,
      category,
      targetLand,
      quantity,
      unitPriceRp,
      totalPrice,
      usageTargetDate,
      usageDetails,
      poNumber,
      createdById
    } = req.body;

    const purchase = await prisma.purchase.create({
      data: {
        inventoryId: inventoryId || null,
        itemName,
        category,
        targetLand,
        quantity: Number(quantity),
        unitPriceRp: unitPriceRp ? Number(unitPriceRp) : null,
        totalPrice: Number(totalPrice),
        usageTargetDate,
        usageDetails,
        poNumber,
        createdById,
        status: 'PENDING_FINANCE',
      },
    });
    res.status(201).json(purchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create purchase' });
  }
};

export const updatePurchaseStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status, rejectionNote, voucherNo } = req.body;

    const data: any = { status };
    const now = new Date();

    if (status === 'PENDING_DIREKTUR') data.financeVerifiedAt = now;
    if (status === 'PENDING_INVESTOR') data.direkturApprovedAt = now;
    if (status === 'APPROVED_WAITING_DISBURSEMENT') data.investorApprovedAt = now;
    if (status === 'DISBURSED') {
      data.disbursedAt = now;
      if (voucherNo) data.voucherNo = voucherNo;
    }
    if (status === 'REJECTED' && rejectionNote) {
      data.rejectionNote = rejectionNote;
    }

    const purchase = await prisma.purchase.update({
      where: { id },
      data,
      include: { inventory: true },
    });

    // Automatically increase inventory stock if DISBURSED
    if (status === 'DISBURSED' && purchase.inventoryId) {
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
    console.error(error);
    res.status(500).json({ error: 'Failed to update purchase status' });
  }
};
