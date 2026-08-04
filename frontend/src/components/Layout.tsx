import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DraggableAIBubble } from './DraggableAIBubble';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-vh-100 bg-light active-light-mode w-100 overflow-x-hidden">
      {/* Corpox Sidebar (280px width) */}
      <Sidebar />

      {/* Corpox Topbar (64px height) */}
      <Topbar />

      {/* Main Content Area: Generous 108px (6.75rem) Top Padding for ZERO Overlapping */}
      <main className="px-4 px-md-5 pb-5 min-vh-100 bg-light" style={{ marginLeft: '17.5rem', paddingTop: '6.75rem' }}>
        <div className="w-100">
          {children}
        </div>
      </main>

      {/* Global AI Assistant */}
      <DraggableAIBubble />
    </div>
  );
};
