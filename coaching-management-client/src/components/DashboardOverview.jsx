import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../api/config';

const DashboardOverview = () => {
  const [totalBatches, setTotalBatches] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetching
        const [batchesResponse, studentsResponse] = await Promise.all([
          axios.get(API_ENDPOINTS.batches.getAll, { withCredentials: true }),
          axios.get(API_ENDPOINTS.students.getAll, { withCredentials: true }),
        ]);

        const batchesData = batchesResponse.data;
        const studentsData = studentsResponse.data;

        setTotalBatches(Array.isArray(batchesData.batches) ? batchesData.batches.length : 0);
        setTotalStudents(Array.isArray(studentsData.students) ? studentsData.students.length : 0);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <span className="loading loading-spinner loading-lg"></span>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h3 className="card-title">Total Batches</h3>
            <div className="text-3xl font-bold">{totalBatches}</div>
            <p>Active coaching batches</p>
          </div>
        </div>
        <div className="card bg-secondary text-secondary-content">
          <div className="card-body">
            <h3 className="card-title">Total Students</h3>
            <div className="text-3xl font-bold">{totalStudents}</div>
            <p>Enrolled students</p>
          </div>
        </div>
        <div className="card bg-accent text-accent-content">
          <div className="card-body">
            <h3 className="card-title">Today's Attendance</h3>
            <div className="text-3xl font-bold">0%</div>
            <p>OnProcess</p>
          </div>
        </div>
        <div className="card bg-info text-info-content">
          <div className="card-body">
            <h3 className="card-title">Active Notices</h3>
            <div className="text-3xl font-bold">0</div>
            <p>OnProcess</p>
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
