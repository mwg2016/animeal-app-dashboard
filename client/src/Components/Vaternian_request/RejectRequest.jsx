import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RejectRequests = () => {
  const [records, setRecords] = useState([]);
  const rejectRecord = import.meta.env.VITE_REJECT_RECORDS;
  const rejectStatus = import.meta.env.VITE_REJECT_STATUS;

  const fetchRejectedRecords = async () => {
    try {
      const res = await axios.get(`${rejectRecord}`);
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching rejected records:", err);
      toast.error("Failed to fetch rejected records");
    }
  };

  useEffect(() => {
    fetchRejectedRecords();
  }, []);

  const RejectedStatus = async (id, isApproved) => {
    try {
      await axios.patch(`${rejectStatus}` + "?id=" + id, {
        approved: isApproved ? "true" : "false",
      });

      if (isApproved) {
        toast.success("Request Approved Successfully!");
      }

      fetchRejectedRecords();
    } catch (err) {
      console.error(`${isApproved ? "Approve" : "Reject"} error:`, err);
      toast.error(`Failed to ${isApproved ? "approve" : "reject"} request`);
    }
  };

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 tracking-tight">
        Rejected Requests
      </h2>

      {records.length === 0 ? (
        <div className="text-center text-gray-500 bg-white p-6 rounded shadow">
          No rejected requests.
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-5 border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {record.first_name} {record.last_name}
                  </p>
                  <p className="text-gray-600 text-sm">{record.email}</p>
                </div>

                <button
                  onClick={() => RejectedStatus(record.id, true)}
                  className="bg-[#B72765] hover:bg-[#a31e5c] transition-colors duration-300 text-white text-sm px-5 py-2 rounded-md shadow-sm hover:shadow-md"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default RejectRequests;
