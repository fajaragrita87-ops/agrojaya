import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLands = () => api.get('/lands');
export const createLand = (data: any) => api.post('/lands', data);

export const getCrops = () => api.get('/crops');
export const createCrop = (data: any) => api.post('/crops', data);

export const getCycles = () => api.get('/cycles');
export const createCycle = (data: any) => api.post('/cycles', data);

export const getActivities = () => api.get('/activities');
export const createActivity = (data: any) => api.post('/activities', data);

export const getInventory = () => api.get('/inventory');
export const createInventoryItem = (data: any) => api.post('/inventory', data);

export const getPurchases = () => api.get('/purchases');
export const createPurchase = (data: any) => api.post('/purchases', data);
export const updatePurchaseStatus = (id: string, data: any) => api.patch(`/purchases/${id}/status`, data);

export const getHarvests = () => api.get('/harvests');
export const createHarvest = (data: any) => api.post('/harvests', data);

// Phase 3: HR, Payroll, Financials
export const getUsers = () => api.get('/users');
export const createUser = (data: any) => api.post('/users', data);

export const getAttendances = () => api.get('/attendance');
export const checkInAttendance = (data: any) => api.post('/attendance/check-in', data);
export const checkOutAttendance = (id: string) => api.patch(`/attendance/${id}/check-out`);
export const getPayrollSummary = () => api.get('/payroll/summary');

export const getFinancials = () => api.get('/financials');
export const createFinancial = (data: any) => api.post('/financials', data);
export const getFinancialSummary = () => api.get('/financials/summary');

export const getDirekturDashboard = () => api.get('/dashboard/direktur');
export const getInvestorDashboard = () => api.get('/dashboard/investor');

export const get5DReport = () => api.get('/reports/5d');
export const getFinancialReport = () => api.get('/reports/financial');
export const getAuditLogs = () => api.get('/reports/audit-logs');

export const getBmkgWeather = (lat?: string, lng?: string) =>
  api.get('/weather/bmkg', { params: { lat, lng } });

export const sendAIChat = (data: { prompt: string; history?: any[]; role?: string; userName?: string }) =>
  api.post('/ai/chat', data);

export const diagnoseLeafAI = (data: { imageBase64: string; plantHeight?: number; commodity?: string }) =>
  api.post('/ai/diagnose-leaf', data);

export const analyzeSoilAI = (data: { phLevel?: string; npk?: string; moisture?: string; commodity?: string }) =>
  api.post('/ai/analyze-soil', data);

