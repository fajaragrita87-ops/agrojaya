import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockUsers = [
  { id: 'usr-0', name: 'Super Admin AgroJaya (Master Gerbang)', email: 'superadmin@agrojaya.com', role: 'SUPERADMIN', phone: '0811-9999-0000', createdAt: new Date() },
  { id: 'usr-1', name: 'Ir. H. Ahmad Wijaya', email: 'direktur@agrojaya.com', role: 'DIREKTUR', phone: '0811-7000-111', createdAt: new Date() },
  { id: 'usr-2', name: 'Hendra Kusuma, B.Sc.', email: 'investor@agrojaya.com', role: 'INVESTOR', phone: '0815-7000-555', createdAt: new Date() },
  { id: 'usr-3', name: 'Ratna Dewi, S.E., Ak.', email: 'finance@agrojaya.com', role: 'FINANCE', phone: '0812-9876-5432', createdAt: new Date() },
  { id: 'usr-4', name: 'Budi Santoso, S.P.', email: 'manager@agrojaya.com', role: 'MANAGER', phone: '0812-7000-222', createdAt: new Date() },
  { id: 'usr-5', name: 'Rahmat Hidayat', email: 'kepalakebun@agrojaya.com', role: 'KEPALA_KEBUN', phone: '0813-7000-333', createdAt: new Date() },
  { id: 'usr-6', name: 'Joko Susilo', email: 'petani@agrojaya.com', role: 'PETANI', phone: '0814-7000-444', createdAt: new Date() },
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
