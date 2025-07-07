import React from 'react';

const StudentManagement = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Student Management</h2>
        <button className="btn btn-primary">
          Add New Student
        </button>
      </div>
      
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex gap-4 mb-4">
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>Select Batch</option>
              <option>HSC 25-A</option>
              <option>HSC 25-B</option>
              <option>SSC 25-A</option>
            </select>
            <input type="text" placeholder="Search students..." className="input input-bordered flex-1" />
          </div>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Batch</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-12">
                          <span>JD</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">John Doe</div>
                        <div className="text-sm opacity-50">john@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td>HSC 25-A</td>
                  <td>+880 1234567890</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <button tabIndex={0} className="btn btn-ghost btn-xs">⋮</button>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>View Details</a></li>
                        <li><a>Edit</a></li>
                        <li><a>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>002</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-12">
                          <span>JS</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Jane Smith</div>
                        <div className="text-sm opacity-50">jane@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td>HSC 25-B</td>
                  <td>+880 1234567891</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <button tabIndex={0} className="btn btn-ghost btn-xs">⋮</button>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>View Details</a></li>
                        <li><a>Edit</a></li>
                        <li><a>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>003</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-12">
                          <span>MJ</span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Mike Johnson</div>
                        <div className="text-sm opacity-50">mike@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td>SSC 25-A</td>
                  <td>+880 1234567892</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <button tabIndex={0} className="btn btn-ghost btn-xs">⋮</button>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>View Details</a></li>
                        <li><a>Edit</a></li>
                        <li><a>Delete</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;