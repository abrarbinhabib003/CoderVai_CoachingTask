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

  const getAuthHeaders = () => ({
    headers: { 'Content-Type': 'application/json' }
  });

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.students.getAll, getAuthHeaders());
      setStudents(response.data.students);
      setError('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch students';
      setError(msg);
      Swal.fire('Error!', msg, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStudentsByBatch = useCallback(async (batchId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_ENDPOINTS.students.base}/batch?batchId=${batchId}`,
        getAuthHeaders()
      );
      setStudents(response.data.students);
      setError('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch students by batch';
      setError(msg);
      Swal.fire('Error!', msg, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBatches = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.batches.getAll, getAuthHeaders());
      setBatches(response.data.batches);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch batches';
      Swal.fire('Error!', msg, 'error');
    }
  }, []);

  const studentCounts = React.useMemo(() => {
    const counts = {};
    batches.forEach(batch => { counts[batch.id] = 0; });
    students.forEach(student => {
      if (counts[student.batchId] !== undefined) counts[student.batchId]++;
    });
    return counts;
  }, [batches, students]);

  const addStudent = async () => {
    try {
      setLoading(true);
      await axios.post(API_ENDPOINTS.students.create, formData, getAuthHeaders());
      Swal.fire('Success!', 'Student added successfully.', 'success');
      setShowModal(false);
      setFormData({ name: '', roll: '', batchId: '' });
      selectedBatch ? fetchStudentsByBatch(selectedBatch) : fetchStudents();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add student';
      setError(msg);
      Swal.fire('Error!', msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async () => {
    try {
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
      selectedBatch ? fetchStudentsByBatch(selectedBatch) : fetchStudents();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update student';
      setError(msg);
      Swal.fire('Error!', msg, 'error');
    } finally {
      setLoading(false);
    }
  };

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
      setLoading(true);
      await axios.delete(API_ENDPOINTS.students.delete(studentId), getAuthHeaders());
      Swal.fire('Deleted!', 'Student has been deleted.', 'success');
      selectedBatch ? fetchStudentsByBatch(selectedBatch) : fetchStudents();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete student';
      setError(msg);
      Swal.fire('Error!', msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingStudent ? updateStudent() : addStudent();
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setFormData({ name: '', roll: '', batchId: '' });
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      roll: student.roll,
      batchId: student.batchId.toString()
    });
    setShowModal(true);
  };

  const handleBatchFilter = (e) => {
    const batchId = e.target.value;
    setSelectedBatch(batchId);
    batchId === '' ? fetchStudents() : fetchStudentsByBatch(batchId);
  };

  useEffect(() => {
    fetchStudents();
    fetchBatches();
  }, [fetchStudents, fetchBatches]);

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Student Management</h2>
        <button className="btn btn-primary w-full sm:w-auto" onClick={openAddModal}>
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
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
          <label className="font-semibold">Filter by Batch:</label>
          <select
            className="select select-bordered w-full sm:w-64"
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
            className="btn btn-outline w-full sm:w-auto"
            onClick={() => {
              setSelectedBatch('');
              fetchStudents();
            }}
          >
            Clear Filter
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Students Table */}
      {!loading && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm sm:text-base">
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
                    <td className="flex flex-col sm:flex-row gap-2">
                      <button
                        className="btn btn-sm text-black btn-secondary"
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
          <div className="modal-box relative w-11/12 max-w-sm sm:max-w-lg">
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
