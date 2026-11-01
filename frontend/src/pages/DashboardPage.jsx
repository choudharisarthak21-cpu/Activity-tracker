import React from 'react';
import { TaskBoard } from '../components/tasks/TaskBoard';
import { CalendarView } from '../components/calendar/CalendarView';
import { ActivityOverview } from '../components/overview/ActivityOverview';

export const DashboardPage = ({ activeTab }) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {activeTab === 'dashboard' && <TaskBoard />}
      {activeTab === 'calendar' && <CalendarView />}
      {activeTab === 'analytics' && <ActivityOverview />}
    </div>
  );
};
