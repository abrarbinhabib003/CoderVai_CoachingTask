import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../api/config';

axios.defaults.withCredentials = true;

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    batchId: ''
  });


  const getAuthHeaders = () => {
    return {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  };

  // Fetch 
  const fetchStudents = useCallback(async () => {
    try {
      console.log('Fetching all students');
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.students.getAll, getAuthHeaders());
      console.log('Students fetched successfully:', response.data.students?.length || 0);
      setStudents(response.data.students);
      setError('');
    } catch (err) {
      console.error('Failed to fetch students:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to fetch students');
      Swal.fire('Error!', err.response?.data?.message || 'Failed to fetch students', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch students 
  const fetchStudentsByBatch = useCallback(async (batchId) => {
    try {
      console.log('Fetching students for batch:', batchId);
      setLoading(true);
      const response = await axios.get(
        `${API_ENDPOINTS.students.base}/batch?batchId=${batchId}`,
        getAuthHeaders()
      );
      console.log('Students by batch fetched successfully:', response.data.students?.length || 0);
      setStudents(response.data.students);
      setError('');
    } catch (err) {
      console.error('Failed to fetch students by batch:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to fetch students by batch');
      Swal.fire('Error!', err.response?.data?.message || 'Failed to fetch students by batch', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch  batches
  const fetchBatches = useCallback(async () => {
    try {
      console.log(' Fetching all batches...');
      const response = await axios.get(API_ENDPOINTS.batches.getAll, getAuthHeaders());
      console.log('Batches fetched successfully:', response.data.batches?.length || 0);
      setBatches(response.data.batches);
    } catch (err) {
      console.error('Failed to fetch batches:', err.response?.data?.message || err.message);
      Swal.fire('Error!', err.response?.data?.message || 'Failed to fetch batches', 'error');
    }
  }, []);

  
  const studentCounts = React.useMemo(() => {
    const counts = {};
    for (const batch of batches) {
      counts[batch.id] = 0;
    }
    for (const student of students) {
      if (student.batchId && counts.hasOwnProperty(student.batchId)) {
        counts[student.batchId]++;
      }
    }
    return counts;
  }, [batches, students]);

  // Add new student
  const addStudent = async () => {
    try {
      console.log('➕ Adding new student:', formData);
      setLoading(true);
      await axios.post(API_ENDPOINTS.students.create, formData, getAuthHeaders());
      Swal.fire('Success!', 'Student added successfully.', 'success');
      setShowModal(false);
      setFormData({ name: '', roll: '', batchId: '' });
      if (selectedBatch) {
        fetchStudentsByBatch(selectedBatch);
      } else {
        fetchStudents();
      }
      setError('');
    } catch (err) {
      console.error('Failed to add student:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to add student');
      Swal.fire('Error!', err.response?.data?.message || 'Failed to add student', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Update student
  const updateStudent = async () => {
    try {
      console.log('Updating student:', editingStudent.id, formData);
      setLoading(true);
      await axios.put(
        API_ENDPOINTS.students.update(editingStudent.id),
        formData,
        getAuthHeaders()
      );
      Swal.fire('Success!', 'Student updated successfully.', 'success');
      setShowModal(false);
      setEditingStudent(null);
      setFormData({ name: '', roll: '', batchId: '' });
      if (selectedBatch) {
        fetchStudentsByBatch(selectedBatch);
      } else {
        fetchStudents();
      }
      setError('');
    } catch (err) {
      console.error('Failed to update student:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to update student');
      Swal.fire('Error!', err.response?.data?.message || 'Failed to update student', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Delete 
  const deleteStudent = async (studentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      console.log('Deleting student:', studentId);
      setLoading(true);
      await axios.delete(API_ENDPOINTS.students.delete(studentId), getAuthHeaders());
      Swal.fire('Deleted!', 'Student has been deleted.', 'success');
      if (selectedBatch) {
        fetchStudentsByBatch(selectedBatch);
      } else {
        fetchStudents();
      }
      setError('');
    } catch (err) {
      console.error('Failed to delete student:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Failed to delete student');
      Swal.fire('Error!', err.response?.data?.message || 'Failed to delete student', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle  submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent();
    } else {
      addStudent();
    }
  };

  // modal for adding
  const openAddModal = () => {
    setEditingStudent(null);
    setFormData({ name: '', roll: '', batchId: '' });
    setShowModal(true);
  };

  // modal for editing
  const openEditModal = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      roll: student.roll,
      batchId: student.batchId.toString()
    });
    setShowModal(true);
  };

  // batch filter
  const handleBatchFilter = (e) => {
    const batchId = e.target.value;
    setSelectedBatch(batchId);

    if (batchId === '') {
      fetchStudents();
    } else {
      fetchStudentsByBatch(batchId);
    }
  };

  useEffect(() => {
    console.log('StudentManagementFull component mounted, fetching initial data...');
    fetchStudents();
    fetchBatches();
  }, [fetchStudents, fetchBatches]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Student Management</h2>
        <button
          className="btn btn-primary"
          onClick={openAddModal}
        >
          Add New Student
        </button>
      </div>


      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6">
        <div className="flex gap-4 items-center">
          <label className="label">
            <span className="label-text font-semibold">Filter by Batch:</span>
          </label>
          <select
            className="select select-bordered w-64"
            value={selectedBatch}
            onChange={handleBatchFilter}
          >
            <option value="">All Batches</option>
            {batches.map(batch => (
              <option key={batch.id} value={batch.id}>
                {batch.name} ({studentCounts[batch.id] || 0} students)
              </option>
            ))}
          </select>
          <button
            className="btn btn-outline"
            onClick={() => {
              setSelectedBatch('');
              fetchStudents();
            }}
          >
            Clear Filter
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Students Table */}
      {!loading && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Batch</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <div className="text-gray-500">
                      <p className="text-lg">No students found</p>
                      <p>Add your first student to get started!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td className="capitalize">{student.name}</td>
                    <td>{student.roll}</td>
                    <td>
                      {batches.find(b => b.id === student.batchId)?.name || 'Unknown'}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm text-black btn-secondary mr-2"
                        onClick={() => openEditModal(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h3 className="text-xl font-bold mb-4">
              {editingStudent ? 'Edit Student' : 'Add New Student'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Roll Number</span>
                </label>
                <input
                  type="text"
                  value={formData.roll}
                  onChange={e => setFormData({ ...formData, roll: e.target.value })}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Batch</span>
                </label>
                <select
                  value={formData.batchId}
                  onChange={e => setFormData({ ...formData, batchId: e.target.value })}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Batch</option>
                  {batches.map(batch => (
                    <option key={batch.id} value={batch.id}>
                      {batch.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  {editingStudent ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingStudent(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
