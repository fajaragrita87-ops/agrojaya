import { Router } from 'express';
import { getLands, createLand, updateLandStatus } from '../controllers/landController';
import { getCrops, createCrop } from '../controllers/cropController';
import { getCycles, createCycle } from '../controllers/cycleController';
import { getActivities, createActivity, approveActivity } from '../controllers/activityController';
import { getInventory, createInventoryItem, getLowStockAlerts } from '../controllers/inventoryController';
import { getPurchases, createPurchase, updatePurchaseStatus } from '../controllers/purchaseController';
import { getHarvests, createHarvest } from '../controllers/harvestController';
import { getDirekturDashboard, getInvestorDashboard } from '../controllers/dashboardController';
import { get5DReport, getFinancialReport, getAuditLogs } from '../controllers/reportController';

import { getUsers, createUser } from '../controllers/userController';
import { checkIn, checkOut, getAttendances, getPayrollSummary } from '../controllers/attendanceController';
import { getFinancials, createFinancial, getFinancialSummary } from '../controllers/financialController';
import { getWeighbridgeTickets, createWeighbridgeTicket } from '../controllers/weighbridgeController';
import { getBmkgWeather } from '../controllers/weatherController';

const router = Router();

// Lands
router.get('/lands', getLands);
router.post('/lands', createLand);
router.patch('/lands/:id/status', updateLandStatus);

// Crops
router.get('/crops', getCrops);
router.post('/crops', createCrop);

// Cycles
router.get('/cycles', getCycles);
router.post('/cycles', createCycle);

// Activities
router.get('/activities', getActivities);
router.post('/activities', createActivity);
router.patch('/activities/:id/approve', approveActivity);

// Inventory
router.get('/inventory', getInventory);
router.post('/inventory', createInventoryItem);
router.get('/inventory/alerts', getLowStockAlerts);

// Purchases
router.get('/purchases', getPurchases);
router.post('/purchases', createPurchase);
router.patch('/purchases/:id/status', updatePurchaseStatus);

// Harvests
router.get('/harvests', getHarvests);
router.post('/harvests', createHarvest);

// HR / Users (Phase 3)
router.get('/users', getUsers);
router.post('/users', createUser);

// Payroll & Attendance PWA (Phase 3)
router.get('/attendance', getAttendances);
router.post('/attendance/check-in', checkIn);
router.patch('/attendance/:id/check-out', checkOut);
router.get('/payroll/summary', getPayrollSummary);

// Financials & Automatic Cashflow (Phase 3)
router.get('/financials', getFinancials);
router.post('/financials', createFinancial);
router.get('/financials/summary', getFinancialSummary);

// Weighbridge PKS Scale (OWL / eKomoditi Benchmark)
router.get('/weighbridge', getWeighbridgeTickets);
router.post('/weighbridge', createWeighbridgeTicket);

// BMKG Weather API Integration
router.get('/weather/bmkg', getBmkgWeather);

// Dashboards & Reports
router.get('/dashboard/direktur', getDirekturDashboard);
router.get('/dashboard/investor', getInvestorDashboard);
router.get('/reports/5d', get5DReport);
router.get('/reports/financial', getFinancialReport);
router.get('/reports/audit-logs', getAuditLogs);

export default router;
