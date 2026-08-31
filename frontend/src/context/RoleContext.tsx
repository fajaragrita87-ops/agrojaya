import React, { createContext, useContext, useState } from 'react';

export type RoleType = 'SUPERADMIN' | 'DIREKTUR' | 'INVESTOR' | 'FINANCE' | 'MANAGER' | 'KEPALA_KEBUN' | 'PETANI';

export const getDefaultPathForRole = (r: RoleType): string => {
  switch (r) {
    case 'SUPERADMIN':
      return '/dashboard/direktur';
    case 'INVESTOR':
      return '/dashboard/investor';
    case 'FINANCE':
      return '/financials';
    case 'PETANI':
      return '/payroll';
    case 'KEPALA_KEBUN':
      return '/dashboard/kepala-kebun';
    case 'MANAGER':
      return '/dashboard/manager';
    case 'DIREKTUR':
    default:
      return '/dashboard/direktur';
  }
};

interface RoleContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
  userName: string;
  userTitle: string;
  isReadOnly: boolean;
  canApprove: boolean;
  canCreatePO: boolean;
  canVerifyFinancePO: boolean;
  canApproveDirekturPO: boolean;
  canApproveInvestorPO: boolean;
  canDisburseFinancePO: boolean;
  canEdit: boolean;
  canManageUsers: boolean;
  canManageFinancials: boolean;
  canManageMasterData: boolean;
  canManageLands: boolean;
}

export const getUserNameForRole = (r: RoleType): string => {
  switch (r) {
    case 'SUPERADMIN':
      return 'Super Admin Master';
    case 'INVESTOR':
      return 'Investor Utama';
    case 'DIREKTUR':
      return 'Direktur Utama';
    case 'FINANCE':
      return 'Ibu Ratna';
    case 'MANAGER':
      return 'Budi Santoso, S.P.';
    case 'KEPALA_KEBUN':
      return 'Ahmad Hidayat';
    case 'PETANI':
      return 'Sutrisno';
  }
};

export const getUserTitleForRole = (r: RoleType): string => {
  switch (r) {
    case 'SUPERADMIN':
      return 'Super Admin (Akses Penuh Master Gerbang)';
    case 'INVESTOR':
      return 'Investor Utama Proyek Smart Farming';
    case 'DIREKTUR':
      return 'Direktur Utama Smart Farming';
    case 'FINANCE':
      return 'Ibu Ratna (Finance & Accounting Lead)';
    case 'MANAGER':
      return 'Budi Santoso, S.P. (Manajer Operasional)';
    case 'KEPALA_KEBUN':
      return 'Ahmad Hidayat (Kepala Kebun Jonggol)';
    case 'PETANI':
      return 'Sutrisno (Teknisi Lapangan PWA)';
  }
};

const RoleContext = createContext<RoleContextType>({
  role: 'SUPERADMIN',
  setRole: () => {},
  userName: 'Super Admin Master',
  userTitle: 'Super Admin (Akses Penuh Master Gerbang)',
  isReadOnly: false,
  canApprove: true,
  canCreatePO: true,
  canVerifyFinancePO: true,
  canApproveDirekturPO: true,
  canApproveInvestorPO: true,
  canDisburseFinancePO: true,
  canEdit: true,
  canManageUsers: true,
  canManageFinancials: true,
  canManageMasterData: true,
  canManageLands: true,
});

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<RoleType>(() => {
    const saved = localStorage.getItem('agrojaya_active_role');
    return (saved as RoleType) || 'SUPERADMIN';
  });

  const setRole = (newRole: RoleType) => {
    setRoleState(newRole);
    localStorage.setItem('agrojaya_active_role', newRole);
  };

  const userName = getUserNameForRole(role);
  const userTitle = getUserTitleForRole(role);

  const isReadOnly = role === 'INVESTOR';
  // PO 3-Layer Workflow Permissions (SUPERADMIN has master pass for all layers):
  // Step 1: Manager Operasional creates PO
  const canCreatePO = role === 'SUPERADMIN' || role === 'MANAGER' || role === 'DIREKTUR' || role === 'KEPALA_KEBUN';
  // Step 2: Layer 1 - Finance verifies budget & feasibility
  const canVerifyFinancePO = role === 'SUPERADMIN' || role === 'FINANCE' || role === 'DIREKTUR';
  // Step 3: Layer 2 - Direktur authorizes corporate expenditure
  const canApproveDirekturPO = role === 'SUPERADMIN' || role === 'DIREKTUR';
  // Step 4: Layer 3 - Investor approves capital transparency
  const canApproveInvestorPO = role === 'SUPERADMIN' || role === 'INVESTOR';
  // Step 5: Finance disburses funds to vendor/manager
  const canDisburseFinancePO = role === 'SUPERADMIN' || role === 'FINANCE' || role === 'DIREKTUR';

  const canApprove = role === 'SUPERADMIN' || role === 'DIREKTUR';
  const canEdit = role === 'SUPERADMIN' || role !== 'INVESTOR';
  const canManageUsers = role === 'SUPERADMIN' || role === 'DIREKTUR' || role === 'MANAGER';
  const canManageFinancials = role === 'SUPERADMIN' || role === 'DIREKTUR' || role === 'FINANCE' || role === 'MANAGER';
  const canManageMasterData = role === 'SUPERADMIN' || role === 'DIREKTUR' || role === 'MANAGER';
  const canManageLands = role === 'SUPERADMIN' || role === 'DIREKTUR' || role === 'MANAGER' || role === 'KEPALA_KEBUN';

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        userName,
        userTitle,
        isReadOnly,
        canApprove,
        canCreatePO,
        canVerifyFinancePO,
        canApproveDirekturPO,
        canApproveInvestorPO,
        canDisburseFinancePO,
        canEdit,
        canManageUsers,
        canManageFinancials,
        canManageMasterData,
        canManageLands,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
