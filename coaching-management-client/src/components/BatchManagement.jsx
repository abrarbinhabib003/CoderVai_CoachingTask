import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../api/config';

const BatchManagement = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [selectedBatchName, setSelectedBatchName] = useState('');

  // Fetch all batches
  const fetchBatches = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_ENDPOINTS.batches.getAll);
      setBatches(data.batches || []);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message || 'Failed to fetch batches', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  // Create Batch
  const createBatch = async (e) => {
    e.preventDefault();

    if (!selectedBatchName.trim()) {
      Swal.fire('Warning', 'Please enter a batch name', 'warning');
      return;
    }

    try {
      await axios.post(API_ENDPOINTS.batches.create, { name: selectedBatchName });
      Swal.fire('Success', 'Batch created successfully!', 'success');
      setShowCreateModal(false);
      setSelectedBatchName('');
      fetchBatches();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message || 'Failed to create batch', 'error');
    }
  };

  // Update Batch
  const updateBatch = async (e) => {
    e.preventDefault();

    if (!selectedBatchName.trim() || !selectedBatchId) {
      Swal.fire('Warning', 'Batch name is required', 'warning');
      return;
    }

    try {
      await axios.put(API_ENDPOINTS.batches.update(selectedBatchId), { name: selectedBatchName });
      Swal.fire('Success', 'Batch updated successfully!', 'success');
      setShowEditModal(false);
      setSelectedBatchName('');
      setSelectedBatchId(null);
      fetchBatches();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message || 'Failed to update batch', 'error');
    }
  };

  // Delete Batch
  const deleteBatch = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this batch?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(API_ENDPOINTS.batches.delete(id));
        Swal.fire('Deleted!', 'Batch has been deleted.', 'success');
        fetchBatches();
      } catch (err) {
        Swal.fire('Error', err.response?.data?.message || err.message || 'Failed to delete batch', 'error');
      }
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Batch Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedBatchName('');
            setShowCreateModal(true);
          }}
        >
          Add New Batch
        </button>
      </div>

      {batches.length === 0 ? (
        <div className="text-center text-gray-500">No batches found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <div key={batch.id} className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="text-lg font-semibold">{batch.name}</h3>
                <p className="text-sm text-gray-500">{batch.studentCount} Students</p>
                <p className="text-xs text-gray-400">
                  Created: {new Date(batch.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => {
                      setSelectedBatchId(batch.id);
                      setSelectedBatchName(batch.name);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-sm btn-error" onClick={() => deleteBatch(batch.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Create New Batch</h3>
            <form onSubmit={createBatch}>
              <input
                className="input input-bordered w-full my-4"
                placeholder="Batch Name"
                value={selectedBatchName}
                onChange={(e) => setSelectedBatchName(e.target.value)}
                required
              />
              <div className="modal-action">
                <button type="button" className="btn btn-ghost" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Batch</h3>
            <form onSubmit={updateBatch}>
              <input
                className="input input-bordered w-full my-4"
                placeholder="Batch Name"
                value={selectedBatchName}
                onChange={(e) => setSelectedBatchName(e.target.value)}
                required
              />
              <div className="modal-action">
                <button type="button" className="btn btn-ghost" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchManagement;
