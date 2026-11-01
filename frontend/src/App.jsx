import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider, useTasks } from './context/TaskContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { Loader2 } from 'lucide-react';

const AppContent = () => {
  const { isAuthenticated, loading, login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // Demo Login helper
  const handleDemoLogin = async () => {
    // Try login or signup demo user
    const demoEmail = 'alex.mercer@activitytracker.io';
    const demoPass = 'demo12345';
    let res = await login(demoEmail, demoPass);
    if (!res.success) {
      await signup('Alex Mercer', demoEmail, demoPass);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-3" />
        <p className="text-sm font-semibold tracking-wide">Loading Activity Tracker...</p>
      </div>
    );
  }

  return (
    <AppLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onOpenAuthModal={handleOpenAuth}
    >
      {isAuthenticated ? (
        <DashboardPage activeTab={activeTab} />
      ) : (
        <LandingPage
          onOpenAuth={handleOpenAuth}
          onDemoLogin={handleDemoLogin}
        />
      )}
    </AppLayout>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
