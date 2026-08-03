import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getInventory = async (req: Request, res: Response) => {
  try {
    const items = await prisma.inventory.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

export const createInventoryItem = async (req: Request, res: Response) => {
  try {
    const { name, category, stock, unit, supplier, pricePerUnit, minStock } = req.body;
    const item = await prisma.inventory.create({
      data: {
        name,
        category,
        stock: Number(stock),
        unit,
        supplier,
        pricePerUnit: Number(pricePerUnit),
        minStock: Number(minStock),
      },
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create inventory item' });
  }
};

export const getLowStockAlerts = async (req: Request, res: Response) => {
  try {
    const items = await prisma.inventory.findMany({
      where: {
        stock: {
          lte: prisma.inventory.fields.minStock,
        },
      },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch low stock alerts' });
  }
};
