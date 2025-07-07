import React from 'react';

const AttendanceManagement = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Attendance Management</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title">Mark Attendance</h3>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Batch</span>
                </label>
                <select className="select select-bordered">
                  <option disabled selected>Choose batch</option>
                  <option>HSC 25-A</option>
                  <option>HSC 25-B</option>
                  <option>SSC 25-A</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Date</span>
                </label>
                <input type="date" className="input input-bordered" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              
              <button className="btn btn-primary mt-4">Load Students</button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title">HSC 25-A Students</h3>
              <p className="text-gray-600 mb-4">Mark attendance for today</p>
              
              <div className="space-y-3">
                {['Abrar', 'Bin', 'Habib'].map((name, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                          <span className="text-xs">{name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                      </div>
                      <span className="font-medium">{name}</span>
                    </div>
                    <div className="flex gap-2">
                      <input type="radio" name={`attendance-${index}`} className="radio radio-success" value="present" />
                      <span className="text-sm">Present</span>
                      <input type="radio" name={`attendance-${index}`} className="radio radio-error ml-4" value="absent" />
                      <span className="text-sm">Absent</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="card-actions justify-end mt-6">
                <button className="btn btn-outline">Reset</button>
                <button className="btn btn-primary">Submit Attendance</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;