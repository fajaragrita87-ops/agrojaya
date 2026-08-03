import React, { createContext, useContext, useState } from 'react';

export type RoleType = 'DIREKTUR' | 'INVESTOR' | 'MANAGER' | 'KEPALA_KEBUN' | 'PETANI';

export const getDefaultPathForRole = (r: RoleType): string => {
  switch (r) {
    case 'INVESTOR':
      return '/dashboard/investor';
    case 'PETANI':
      return '/payroll';
    case 'KEPALA_KEBUN':
    case 'MANAGER':
    case 'DIREKTUR':
    default:
      return '/dashboard/direktur';
  }
};

interface RoleContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
  isReadOnly: boolean;
  canApprove: boolean;
  canCreatePO: boolean;
  canApprovePO: boolean;
  canEdit: boolean;
  canManageUsers: boolean;
  canManageFinancials: boolean;
  canManageMasterData: boolean;
  canManageLands: boolean;
}

const RoleContext = createContext<RoleContextType>({
  role: 'DIREKTUR',
  setRole: () => {},
  isReadOnly: false,
  canApprove: true,
  canCreatePO: true,
  canApprovePO: true,
  canEdit: true,
  canManageUsers: true,
  canManageFinancials: true,
  canManageMasterData: true,
  canManageLands: true,
});

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<RoleType>(() => {
    const saved = localStorage.getItem('agrojaya_active_role');
    return (saved as RoleType) || 'DIREKTUR';
  });

  const setRole = (newRole: RoleType) => {
    setRoleState(newRole);
    localStorage.setItem('agrojaya_active_role', newRole);
  };

  const isReadOnly = role === 'INVESTOR';
  // DIREKTUR is the sole authority for final PO Approval & Financial Disbursement
  const canApprovePO = role === 'DIREKTUR';
  // MANAGER & KEPALA_KEBUN and DIREKTUR can propose Purchase Orders
  const canCreatePO = role === 'DIREKTUR' || role === 'MANAGER' || role === 'KEPALA_KEBUN';
  const canApprove = role === 'DIREKTUR';
  const canEdit = role !== 'INVESTOR';
  const canManageUsers = role === 'DIREKTUR' || role === 'MANAGER';
  const canManageFinancials = role === 'DIREKTUR' || role === 'MANAGER';
  const canManageMasterData = role === 'DIREKTUR' || role === 'MANAGER';
  const canManageLands = role === 'DIREKTUR' || role === 'MANAGER' || role === 'KEPALA_KEBUN';

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        isReadOnly,
        canApprove,
        canCreatePO,
        canApprovePO,
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
