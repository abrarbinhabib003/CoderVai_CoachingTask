import React from 'react';

const DashboardOverview = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h3 className="card-title">Total Batches</h3>
            <div className="text-3xl font-bold">12</div>
            <p>Active coaching batches</p>
          </div>
        </div>
        <div className="card bg-secondary text-secondary-content">
          <div className="card-body">
            <h3 className="card-title">Total Students</h3>
            <div className="text-3xl font-bold">245</div>
            <p>Enrolled students</p>
          </div>
        </div>
        <div className="card bg-accent text-accent-content">
          <div className="card-body">
            <h3 className="card-title">Today's Attendance</h3>
            <div className="text-3xl font-bold">89%</div>
            <p>Present students</p>
          </div>
        </div>
        <div className="card bg-info text-info-content">
          <div className="card-body">
            <h3 className="card-title">Active Notices</h3>
            <div className="text-3xl font-bold">8</div>
            <p>Published notices</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Recent Activity</h3>
        <div className="card bg-base-100 shadow-lg">
        
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
