import React from 'react';
import { LiveFieldFeedHub } from '../components/LiveFieldFeedHub';
import { useRole } from '../context/RoleContext';

export const LiveFieldFeedPage: React.FC = () => {
  const { role, userName } = useRole();

  return (
    <div className="w-full space-y-6">
      <LiveFieldFeedHub
        currentUserRole={role}
        currentUserName={userName}
        className="w-full"
      />
    </div>
  );
};
