import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockUsers = [
  { id: 'usr-1', name: 'Direktur Utama', email: 'direktur@agrojaya.com', role: 'DIREKTUR', phone: '081234567890', createdAt: new Date() },
  { id: 'usr-2', name: 'Investor Utama', email: 'investor@agrojaya.com', role: 'INVESTOR', phone: '081122334455', createdAt: new Date() },
  { id: 'usr-3', name: 'Ibu Ratna', email: 'ratna@agrojaya.com', role: 'FINANCE', phone: '081298765432', createdAt: new Date() },
  { id: 'usr-4', name: 'Budi Santoso, S.P.', email: 'budi@agrojaya.com', role: 'MANAGER', phone: '081567890123', createdAt: new Date() },
  { id: 'usr-5', name: 'Ahmad Hidayat', email: 'ahmad@agrojaya.com', role: 'KEPALA_KEBUN', phone: '081345678901', createdAt: new Date() },
  { id: 'usr-6', name: 'Sutrisno', email: 'sutrisno@agrojaya.com', role: 'PETANI', phone: '081789012345', createdAt: new Date() },
];

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, phone: true, createdAt: true }
    });
    return res.json({ success: true, data: users.length > 0 ? users : mockUsers });
  } catch (error) {
    return res.json({ success: true, data: mockUsers });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password || 'default123',
        role: role || 'PETANI',
        phone
      }
    });
    return res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: req.body.name,
      email: req.body.email,
      role: req.body.role || 'PETANI',
      phone: req.body.phone,
      createdAt: new Date()
    };
    mockUsers.push(newUser);
    return res.status(201).json({ success: true, data: newUser });
  }
};
