import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

import apiRouter from './routes/api';

import path from 'path';

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
}));
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Basic health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Serve Frontend Static Files (For Monolithic Docker Deployment)
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

// SPA Fallback: Any other route should load index.html
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
