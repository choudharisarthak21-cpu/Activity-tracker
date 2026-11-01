import React, { useState } from 'react';
import { Navbar } from '../common/Navbar';
import { Sidebar } from '../common/Sidebar';
import { ToastContainer } from '../common/Toast';
import { AuthModal } from '../auth/AuthModal';
import { TaskModal } from '../tasks/TaskModal';
import { useAuth } from '../../context/AuthContext';

export const AppLayout = ({ children, activeTab, setActiveTab }) => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        onOpenAuthModal={handleOpenAuth}
        onOpenTaskModal={() => setTaskModalOpen(true)}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex w-full">
        {/* Sidebar Navigation (Visible on Dashboard when authenticated) */}
        {isAuthenticated && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onOpenTaskModal={() => setTaskModalOpen(true)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <ToastContainer />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      {isAuthenticated && (
        <TaskModal
          isOpen={taskModalOpen}
          onClose={() => setTaskModalOpen(false)}
        />
      )}
    </div>
  );
};
