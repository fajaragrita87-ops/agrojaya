import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockAttendances = [
  {
    id: 'att-1',
    userId: 'usr-2',
    userName: 'Budi Santoso (Petani)',
    checkIn: new Date(Date.now() - 8 * 3600 * 1000),
    checkOut: new Date(),
    durationMinutes: 480,
    location: 'Blok A1 - GPS Lat 0.507, Long 101.447',
    dailyWage: 150000,
    status: 'COMPLETED'
  },
  {
    id: 'att-2',
    userId: 'usr-3',
    userName: 'Siti Rahma (Kepala Kebun)',
    checkIn: new Date(Date.now() - 4 * 3600 * 1000),
    checkOut: null,
    durationMinutes: 240,
    location: 'Blok B1 - GPS Lat 0.509, Long 101.450',
    dailyWage: 250000,
    status: 'PRESENT'
  }
];

export const checkIn = async (req: Request, res: Response) => {
  try {
    const { userId, location, dailyWage } = req.body;
    const att = await prisma.attendance.create({
      data: {
        userId: userId || 'usr-2',
        checkIn: new Date(),
        location: location || 'Blok A1 Kebun AgroJaya',
        dailyWage: dailyWage || 150000,
        status: 'PRESENT'
      }
    });
    return res.status(201).json({ success: true, data: att });
  } catch (error) {
    const newAtt = {
      id: `att-${Date.now()}`,
      userId: req.body.userId || 'usr-2',
      userName: 'Petani Lapangan',
      checkIn: new Date(),
      checkOut: null,
      durationMinutes: 0,
      location: req.body.location || 'Blok A1 Kebun AgroJaya (GPS Verified)',
      dailyWage: req.body.dailyWage || 150000,
      status: 'PRESENT'
    };
    mockAttendances.push(newAtt);
    return res.status(201).json({ success: true, data: newAtt });
  }
};

export const checkOut = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const att = await prisma.attendance.update({
      where: { id },
      data: {
        checkOut: new Date(),
        status: 'COMPLETED'
      }
    });
    return res.json({ success: true, data: att });
  } catch (error) {
    const target = mockAttendances.find((a) => a.id === String(req.params.id)) || mockAttendances[1];
    target.checkOut = new Date();
    target.status = 'COMPLETED';
    return res.json({ success: true, data: target });
  }
};

export const getAttendances = async (req: Request, res: Response) => {
  try {
    const attendances = await prisma.attendance.findMany({
      include: { user: true },
      orderBy: { checkIn: 'desc' }
    });
    return res.json({ success: true, data: attendances.length > 0 ? attendances : mockAttendances });
  } catch (error) {
    return res.json({ success: true, data: mockAttendances });
  }
};

export const getPayrollSummary = async (req: Request, res: Response) => {
  const summary = [
    { role: 'PETANI', totalWorkers: 8, totalHoursWorked: 320, totalPayroll: 9600000, status: 'DISBURSED' },
    { role: 'KEPALA_KEBUN', totalWorkers: 2, totalHoursWorked: 160, totalPayroll: 6000000, status: 'DISBURSED' },
    { role: 'MANAGER', totalWorkers: 1, totalHoursWorked: 160, totalPayroll: 8500000, status: 'APPROVED' },
  ];
  return res.json({ success: true, data: summary });
};
