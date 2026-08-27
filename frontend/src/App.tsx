import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandsPage } from './pages/LandsPage';
import { CropsPage } from './pages/CropsPage';
import { DirekturDashboard } from './pages/DirekturDashboard';
import { ManagerDashboard } from './pages/ManagerDashboard';
import { KepalaKebunDashboard } from './pages/KepalaKebunDashboard';
import { InvestorDashboard } from './pages/InvestorDashboard';
import { InvestorLandingPage } from './pages/InvestorLandingPage';
import { InvestorPOTransparencyPage } from './pages/InvestorPOTransparencyPage';
import { ReportsPage } from './pages/ReportsPage';
import { UsersPage } from './pages/UsersPage';
import { PayrollPage } from './pages/PayrollPage';
import { FinancialsPage } from './pages/FinancialsPage';
import { TasksPage } from './pages/TasksPage';
import { WeighbridgePage } from './pages/WeighbridgePage';
import { HppCalculatorPage } from './pages/HppCalculatorPage';
import { InventoryPage } from './pages/InventoryPage';
import { PlantationLifecyclePage } from './pages/PlantationLifecyclePage';
import { TreePassportPage } from './pages/TreePassportPage';
import { AiSmartFarmingPage } from './pages/AiSmartFarmingPage';
import { LoginPage } from './pages/LoginPage';
import { MobilePreviewWrapper } from './pages/mobile/MobilePreviewWrapper';
import { MobileInvestorDashboard } from './pages/mobile/MobileInvestorDashboard';
import { MobileFinanceDashboard } from './pages/mobile/MobileFinanceDashboard';
import { useRole, type RoleType, getDefaultPathForRole } from './context/RoleContext';

interface ProtectedRouteProps {
  allowedRoles: RoleType[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { role } = useRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to={getDefaultPathForRole(role)} replace />;
  }

  return <Layout>{children}</Layout>;
};

const RootRedirect: React.FC = () => {
  const { role } = useRole();
  return <Navigate to={getDefaultPathForRole(role)} replace />;
};

import { Capacitor } from '@capacitor/core';

const SmartRootRoute: React.FC = () => {
  const isMobileApp = Capacitor.isNativePlatform() || (typeof window !== 'undefined' && window.innerWidth <= 768);
  if (isMobileApp) {
    return <MobilePreviewWrapper isNative={true} />;
  }
  return <InvestorLandingPage />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SmartRootRoute />} />
        <Route path="/landing" element={<InvestorLandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dedicated Mobile App Routes & Simulator */}
        <Route path="/mobile" element={<MobilePreviewWrapper />} />
        <Route path="/mobile/investor" element={<MobileInvestorDashboard />} />
        <Route path="/mobile/finance" element={<MobileFinanceDashboard />} />

        <Route
          path="/dashboard/direktur"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR']}>
              <DirekturDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/manager"
          element={
            <ProtectedRoute allowedRoles={['MANAGER', 'DIREKTUR']}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/kepala-kebun"
          element={
            <ProtectedRoute allowedRoles={['KEPALA_KEBUN', 'MANAGER', 'DIREKTUR']}>
              <KepalaKebunDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/investor"
          element={
            <ProtectedRoute allowedRoles={['INVESTOR']}>
              <InvestorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'KEPALA_KEBUN', 'PETANI', 'INVESTOR']}>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weighbridge"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'KEPALA_KEBUN', 'PETANI', 'INVESTOR']}>
              <WeighbridgePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hpp-calculator"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'INVESTOR']}>
              <HppCalculatorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'KEPALA_KEBUN', 'PETANI', 'INVESTOR']}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lands"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'FINANCE', 'INVESTOR']}>
              <LandsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crops"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'PETANI']}>
              <CropsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER']}>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payroll"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'KEPALA_KEBUN', 'PETANI']}>
              <PayrollPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'KEPALA_KEBUN', 'INVESTOR']}>
              <InventoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plantation-lifecycle"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'KEPALA_KEBUN', 'PETANI', 'INVESTOR']}>
              <PlantationLifecyclePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tree-passports"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'KEPALA_KEBUN', 'PETANI', 'INVESTOR']}>
              <TreePassportPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/financials"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'INVESTOR']}>
              <FinancialsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/po-transparency"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'INVESTOR']}>
              <InvestorPOTransparencyPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-smart-farming"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'KEPALA_KEBUN', 'INVESTOR', 'FINANCE', 'PETANI']}>
              <AiSmartFarmingPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
