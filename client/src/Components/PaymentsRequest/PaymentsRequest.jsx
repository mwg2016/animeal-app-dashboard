
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const PaymentsRequest = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getUrl = import.meta.env.VITE_GET_REDEMPTION;
  const approveUrl = import.meta.env.VITE_PUT_APPROVE_REDEMPTION;
  const cancelUrl = import.meta.env.VITE_PUT_CANCEL_REDEMPTION;

  useEffect(() => {
    fetchRequests();
    console.log(cancelUrl)
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(getUrl);
      setRequests(response.data);
      if (response.data.length > 0) {
        setSelectedRequest(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`${approveUrl}/${id}`);
      alert('Request approved successfully');
      fetchRequests();
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Failed to approve request');
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`${cancelUrl}/${id}`);
      alert('Request cancelled successfully');
      fetchRequests();
    } catch (error) {
      console.error('Error cancelling request:', error);
      alert('Failed to cancel request');
    }
  };

  const filteredRequests = requests.filter((req) => {
    const term = searchTerm.toLowerCase();
    return (
      (req.vet_name || '').toLowerCase().includes(term) ||
      (req.vet_id || '').toString().includes(term) ||
      (req.phone_number || '').toString().includes(term)
    );
  });

  if (loading) return <p className="text-center pt-20 text-xl text-[#B72765]">Loading requests...</p>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 px-4 py-4 lg:ml-64 pt-20">
      
      {/* Left Panel - Table */}
      <div className="w-full lg:w-1/2 max-h-[90vh] overflow-y-auto pr-4">
        <h2 className="text-xl font-bold text-[#B72765] mb-4">Payment Requests</h2>

        {/* Search */}
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded bg-white px-3 py-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by Name, ID or Phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-300 rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-[#B72765] text-white">
              <tr>
                <th className="p-2 border">Vet ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Bank</th>
                <th className="p-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr
                  key={req.id}
                  className={`cursor-pointer hover:bg-gray-200 ${selectedRequest?.id === req.id ? 'bg-gray-100' : ''}`}
                  onClick={() => setSelectedRequest(req)}
                >
                  <td className="p-2 border text-center">{req.vet_id || 'N/A'}</td>
                  <td className="p-2 border text-center">{req.vet_name || 'No Name'}</td>
                  <td className="p-2 border text-center">{req.phone_number || 'No Phone'}</td>
                  <td className="p-2 border text-center">{req.bank_name || 'No Bank'}</td>
                  <td className="p-2 border text-center">{req.redemption_amount || '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel - Details */}
      <div className="w-full lg:w-1/2 bg-white shadow-md rounded p-4 mt-6 lg:mt-0">
        {selectedRequest ? (
          <>
            <h2 className="text-xl font-bold text-[#B72765] mb-4">Request Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p><strong>Vet Name:</strong> {selectedRequest.vet_name || 'No Name'}</p>
              <p><strong>Vet ID:</strong> {selectedRequest.vet_id || 'N/A'}</p>
              <p><strong>Phone:</strong> {selectedRequest.phone_number || 'No Phone'}</p>
              <p><strong>Bank Name:</strong> {selectedRequest.bank_name || 'No Bank'}</p>
              <p><strong>Account Number:</strong> {selectedRequest.account_number || 'No Account'}</p>
              <p><strong>Account Type:</strong> {selectedRequest.account_type || 'No Type'}</p>
              <p><strong>IFSC Code:</strong> {selectedRequest.ifsc_code || 'No IFSC'}</p>
              <p><strong>Amount:</strong> ₹{selectedRequest.redemption_amount || '0.00'}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>
              <p><strong>Requested On:</strong> {new Date(selectedRequest.created_at).toLocaleString()}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 text-center">
              {selectedRequest.status === 'pending' ? (
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="bg-[#B72765] hover:bg-[#a01d59] text-white font-semibold px-6 py-2 rounded-md shadow-md transition duration-300"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleCancel(selectedRequest.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition duration-300"
                  >
                    ❌ Cancel
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <button
                    disabled
                    className={`${
                      selectedRequest.status === 'approved'
                        ? 'bg-green-500'
                        : 'bg-gray-400'
                    } text-white font-semibold px-6 py-2 rounded-md shadow-inner opacity-70 cursor-not-allowed`}
                  >
                    {selectedRequest.status === 'approved' ? '✅ Approved' : '❌ Cancelled'}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Select a request to view details</p>
        )}
      </div>
    </div>
  );
};

export default PaymentsRequest;
