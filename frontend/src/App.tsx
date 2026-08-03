import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandsPage } from './pages/LandsPage';
import { CropsPage } from './pages/CropsPage';
import { DirekturDashboard } from './pages/DirekturDashboard';
import { InvestorDashboard } from './pages/InvestorDashboard';
import { InvestorLandingPage } from './pages/InvestorLandingPage';
import { ReportsPage } from './pages/ReportsPage';
import { UsersPage } from './pages/UsersPage';
import { PayrollPage } from './pages/PayrollPage';
import { FinancialsPage } from './pages/FinancialsPage';
import { TasksPage } from './pages/TasksPage';
import { WeighbridgePage } from './pages/WeighbridgePage';
import { HppCalculatorPage } from './pages/HppCalculatorPage';
import { InventoryPage } from './pages/InventoryPage';
import { PlantationLifecyclePage } from './pages/PlantationLifecyclePage';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvestorLandingPage />} />

        <Route
          path="/dashboard/direktur"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'KEPALA_KEBUN', 'PETANI']}>
              <DirekturDashboard />
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
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'KEPALA_KEBUN', 'PETANI', 'INVESTOR']}>
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
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'KEPALA_KEBUN']}>
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
          path="/financials"
          element={
            <ProtectedRoute allowedRoles={['DIREKTUR', 'MANAGER', 'FINANCE', 'INVESTOR']}>
              <FinancialsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
