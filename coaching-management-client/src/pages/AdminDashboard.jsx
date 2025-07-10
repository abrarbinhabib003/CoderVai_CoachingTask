import React, { useState } from 'react';
import {
  HiOutlineViewGrid,
  HiOutlineClipboardList,
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineSpeakerphone,
} from 'react-icons/hi';

import DashboardOverview from '../components/DashboardOverview';
import BatchManagement from '../components/BatchManagement';
import AttendanceManagement from '../components/AttendanceManagement';
import NoticeBoard from '../components/NoticeBoard';
import StudentManagement from '../components/StudentManagement';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: HiOutlineViewGrid },
    { id: 'batches', name: 'Batches', icon: HiOutlineClipboardList },
    { id: 'students', name: 'Students', icon: HiOutlineUserGroup },
    { id: 'attendance', name: 'Attendance', icon: HiOutlineCheckCircle },
    { id: 'notices', name: 'Notices', icon: HiOutlineSpeakerphone },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'batches':
        return <BatchManagement />;
      case 'students':
        return <StudentManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'notices':
        return <NoticeBoard />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar - visible on md */}
        <div className="hidden md:block w-64 min-h-screen bg-base-300 shadow-lg">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-primary">SmartCCM Admin</h1>
            <p className="text-sm text-gray-600">Coaching Management</p>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map(({ id, name, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => setActiveSection(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === id
                        ? 'bg-primary text-primary-content'
                        : 'text-gray-600 hover:bg-base-200 hover:text-primary'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Filter  */}
        <div className="md:hidden bg-base-100 px-4 py-2 sticky top-0 z-10 shadow-sm">
          <div className="flex flex-wrap gap-2 overflow-x-auto">
            {menuItems.map(({ id, name }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`text-sm px-3 py-2 rounded-full border ${
                  activeSection === id
                    ? 'bg-primary text-white border-primary'
                    : 'text-gray-700 border-gray-300 hover:border-primary hover:text-primary'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
