import React from 'react';

const BatchManagement = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Batch Management</h2>
        <button className="btn btn-primary">
         Add New Batch
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">HSC 25-A</h3>
            <p className="text-gray-600">Higher Secondary - Science</p>
            <div className="flex justify-between mt-4">
              <span className="badge badge-primary">25 Students</span>
              <span className="badge badge-secondary">Active</span>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-sm btn-outline">Edit</button>
              <button className="btn btn-sm btn-primary">View</button>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">HSC 25-B</h3>
            <p className="text-gray-600">Higher Secondary - Commerce</p>
            <div className="flex justify-between mt-4">
              <span className="badge badge-primary">30 Students</span>
              <span className="badge badge-secondary">Active</span>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-sm btn-outline">Edit</button>
              <button className="btn btn-sm btn-primary">View</button>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">SSC 25-A</h3>
            <p className="text-gray-600">Secondary School Certificate</p>
            <div className="flex justify-between mt-4">
              <span className="badge badge-primary">28 Students</span>
              <span className="badge badge-secondary">Active</span>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-sm btn-outline">Edit</button>
              <button className="btn btn-sm btn-primary">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchManagement;